import * as http from 'http';
import * as https from 'https';

export type SseClientStatus = 'connecting' | 'connected' | 'disconnected';

export type SseClientEvent =
  | { type: 'status'; status: SseClientStatus; reason?: string }
  | { type: 'event'; eventType: string; data: string; id: string; timestamp: number };

export interface SseClientOptions {
  url: string;
  headers?: Record<string, string>;
}

export class SseClient {
  private req: http.ClientRequest | null = null;
  private lastEventId = '';
  private retryMs = 3000;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private options: SseClientOptions | null = null;
  private shouldReconnect = false;

  constructor(private readonly onEvent: (event: SseClientEvent) => void) {}

  connect(options: SseClientOptions): void {
    this.disconnect();
    this.options = options;
    this.shouldReconnect = true;
    this.doConnect(options);
  }

  private doConnect(options: SseClientOptions): void {
    this.onEvent({ type: 'status', status: 'connecting' });

    let url: URL;
    try {
      url = new URL(options.url);
    } catch {
      this.onEvent({ type: 'status', status: 'disconnected', reason: '잘못된 URL' });
      return;
    }

    const isHttps = url.protocol === 'https:';
    const transport = isHttps ? https : http;

    const reqHeaders: Record<string, string> = {
      'Accept': 'text/event-stream',
      'Cache-Control': 'no-cache',
      ...(options.headers ?? {}),
    };
    if (this.lastEventId) {
      reqHeaders['Last-Event-ID'] = this.lastEventId;
    }

    const reqOptions: http.RequestOptions = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: reqHeaders,
    };

    try {
      this.req = transport.request(reqOptions, (res) => {
        if (res.statusCode !== 200) {
          this.onEvent({ type: 'status', status: 'disconnected', reason: `HTTP ${res.statusCode}` });
          this.scheduleReconnect();
          return;
        }

        this.onEvent({ type: 'status', status: 'connected' });

        let buffer = '';
        res.setEncoding('utf-8');

        res.on('data', (chunk: string) => {
          buffer += chunk;
          const blocks = buffer.split('\n\n');
          buffer = blocks.pop() ?? '';
          for (const block of blocks) {
            this.parseBlock(block);
          }
        });

        res.on('end', () => {
          this.req = null;
          this.onEvent({ type: 'status', status: 'disconnected', reason: '서버가 연결을 닫았습니다' });
          this.scheduleReconnect();
        });

        res.on('error', () => {
          this.req = null;
          this.onEvent({ type: 'status', status: 'disconnected', reason: '스트림 오류' });
          this.scheduleReconnect();
        });
      });

      this.req.on('error', () => {
        this.req = null;
        this.onEvent({ type: 'status', status: 'disconnected', reason: '연결 오류' });
        this.scheduleReconnect();
      });

      this.req.end();
    } catch {
      this.onEvent({ type: 'status', status: 'disconnected', reason: '연결 실패' });
    }
  }

  private parseBlock(block: string): void {
    const lines = block.split('\n');
    let eventType = 'message';
    let data = '';
    let id = '';

    for (const line of lines) {
      if (line.startsWith(':')) {
        // 주석 무시
      } else if (line.startsWith('event:')) {
        eventType = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        data += (data ? '\n' : '') + line.slice(5).trim();
      } else if (line.startsWith('id:')) {
        id = line.slice(3).trim();
      } else if (line.startsWith('retry:')) {
        const ms = parseInt(line.slice(6).trim(), 10);
        if (!isNaN(ms)) { this.retryMs = ms; }
      }
    }

    if (data) {
      if (id) { this.lastEventId = id; }
      this.onEvent({ type: 'event', eventType, data, id, timestamp: Date.now() });
    }
  }

  private scheduleReconnect(): void {
    if (!this.shouldReconnect || !this.options) { return; }
    this.reconnectTimer = setTimeout(() => {
      if (this.shouldReconnect && this.options) {
        this.doConnect(this.options);
      }
    }, this.retryMs);
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.req) {
      this.req.destroy();
      this.req = null;
    }
    this.lastEventId = '';
  }

  get lastId(): string {
    return this.lastEventId;
  }
}
