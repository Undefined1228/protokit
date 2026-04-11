import * as http from 'http';
import * as https from 'https';
import * as tls from 'tls';
import * as net from 'net';
import { URL } from 'url';

export interface HttpRequestOptions {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  sslIgnore: boolean;
  proxyHttp?: string;
  proxyHttps?: string;
}

export interface RedirectEntry {
  status: number;
  location: string;
}

export interface HttpResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
  size: number;
  redirectChain: RedirectEntry[];
}

const STATUS_TEXT: Record<number, string> = {
  100: 'Continue', 101: 'Switching Protocols',
  200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content', 206: 'Partial Content',
  301: 'Moved Permanently', 302: 'Found', 303: 'See Other',
  304: 'Not Modified', 307: 'Temporary Redirect', 308: 'Permanent Redirect',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict',
  410: 'Gone', 422: 'Unprocessable Entity', 429: 'Too Many Requests',
  500: 'Internal Server Error', 502: 'Bad Gateway',
  503: 'Service Unavailable', 504: 'Gateway Timeout',
};

const MAX_REDIRECTS = 20;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export function sendHttpRequest(
  options: HttpRequestOptions,
  signal: AbortSignal,
): Promise<HttpResponse> {
  return doRequest(options, signal, Date.now(), [], 0);
}

async function doRequest(
  options: HttpRequestOptions,
  signal: AbortSignal,
  startTime: number,
  redirectChain: RedirectEntry[],
  depth: number,
): Promise<HttpResponse> {
  if (depth > MAX_REDIRECTS) {
    throw new Error(`최대 리다이렉트 횟수(${MAX_REDIRECTS})를 초과했습니다.`);
  }
  if (signal.aborted) {
    throw new Error('요청이 취소되었습니다.');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(options.url);
  } catch {
    throw new Error(`잘못된 URL: ${options.url}`);
  }

  const isHttps = parsedUrl.protocol === 'https:';
  const proxyUrl = isHttps ? options.proxyHttps : options.proxyHttp;
  const reqOptions = buildNodeOptions(parsedUrl, options, proxyUrl);
  const transport = isHttps && !proxyUrl ? https : http;

  return new Promise<HttpResponse>((resolve, reject) => {
    let settled = false;
    const done = (fn: () => void) => {
      if (settled) return;
      settled = true;
      fn();
    };

    let req: http.ClientRequest;
    try {
      req = transport.request(reqOptions, (res) => {
        const status = res.statusCode ?? 0;

        if (REDIRECT_STATUSES.has(status) && res.headers.location) {
          const location = res.headers.location;
          redirectChain.push({ status, location });
          res.resume();

          let nextUrl: string;
          try {
            nextUrl = new URL(location, options.url).toString();
          } catch {
            done(() => reject(new Error(`잘못된 리다이렉트 URL: ${location}`)));
            return;
          }

          const nextMethod = status === 303 ? 'GET' : options.method;
          const nextBody = status === 303 ? undefined : options.body;

          doRequest(
            { ...options, url: nextUrl, method: nextMethod, body: nextBody },
            signal,
            startTime,
            redirectChain,
            depth + 1,
          ).then(
            (r) => done(() => resolve(r)),
            (e) => done(() => reject(e)),
          );
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          const headers: Record<string, string> = {};
          for (const [k, v] of Object.entries(res.headers)) {
            if (v !== undefined) {
              headers[k.toLowerCase()] = Array.isArray(v) ? v.join(', ') : v;
            }
          }
          done(() => resolve({
            status,
            statusText: STATUS_TEXT[status] ?? '',
            headers,
            body: buf.toString('utf-8'),
            duration: Date.now() - startTime,
            size: buf.length,
            redirectChain: [...redirectChain],
          }));
        });
        res.on('error', (e) => done(() => reject(e)));
      });
    } catch (err) {
      reject(err);
      return;
    }

    req.on('error', (e) => done(() => reject(e)));
    req.setTimeout(options.timeout * 1000, () => {
      req.destroy(new Error(`요청 시간 초과 (${options.timeout}초)`));
    });

    signal.addEventListener('abort', () => {
      req.destroy(new Error('요청이 취소되었습니다.'));
      done(() => reject(new Error('요청이 취소되었습니다.')));
    }, { once: true });

    if (options.body) {
      req.write(options.body, 'utf-8');
    }
    req.end();
  });
}

function buildNodeOptions(
  parsedUrl: URL,
  options: HttpRequestOptions,
  proxyUrl?: string,
): http.RequestOptions {
  const isHttps = parsedUrl.protocol === 'https:';
  const targetHost = parsedUrl.hostname;
  const targetPort = parseInt(parsedUrl.port) || (isHttps ? 443 : 80);
  const path = parsedUrl.pathname + parsedUrl.search;

  if (proxyUrl) {
    let proxy: URL;
    try {
      proxy = new URL(proxyUrl);
    } catch {
      throw new Error(`잘못된 프록시 URL: ${proxyUrl}`);
    }
    const proxyHost = proxy.hostname;
    const proxyPort = parseInt(proxy.port) || 80;

    if (isHttps) {
      return {
        host: targetHost,
        port: targetPort,
        method: options.method,
        path,
        headers: options.headers,
        agent: createHttpsProxyAgent(proxyHost, proxyPort, targetHost, targetPort, options.sslIgnore),
      } as https.RequestOptions;
    }

    return {
      host: proxyHost,
      port: proxyPort,
      method: options.method,
      path: options.url,
      headers: { ...options.headers, Host: targetHost },
    };
  }

  const reqOptions: https.RequestOptions = {
    host: targetHost,
    port: targetPort,
    method: options.method,
    path,
    headers: options.headers,
  };
  if (isHttps) {
    reqOptions.rejectUnauthorized = !options.sslIgnore;
  }
  return reqOptions;
}

function createHttpsProxyAgent(
  proxyHost: string,
  proxyPort: number,
  targetHost: string,
  targetPort: number,
  sslIgnore: boolean,
): https.Agent {
  const agent = new https.Agent({ rejectUnauthorized: !sslIgnore });

  (agent as unknown as Record<string, unknown>)['createConnection'] = function (
    _options: http.RequestOptions,
    callback: (err: Error | null, socket?: net.Socket) => void,
  ): net.Socket {
    const socket = net.connect(proxyPort, proxyHost);

    socket.on('connect', () => {
      socket.write(
        `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\n` +
        `Host: ${targetHost}:${targetPort}\r\n\r\n`,
      );

      let buf = '';
      const onData = (chunk: Buffer) => {
        buf += chunk.toString('ascii');
        if (!buf.includes('\r\n\r\n')) return;
        socket.removeListener('data', onData);

        if (!buf.startsWith('HTTP/1.1 200') && !buf.startsWith('HTTP/1.0 200')) {
          callback(new Error(`Proxy CONNECT 실패: ${buf.split('\r\n')[0]}`));
          return;
        }

        const tlsSocket = tls.connect({
          socket,
          servername: targetHost,
          rejectUnauthorized: !sslIgnore,
        });
        tlsSocket.on('secureConnect', () => callback(null, tlsSocket as unknown as net.Socket));
        tlsSocket.on('error', (e: Error) => callback(e));
      };
      socket.on('data', onData);
    });

    socket.on('error', (e: Error) => callback(e));
    return socket;
  };

  return agent;
}
