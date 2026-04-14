import * as net from 'net';

export interface TcpClientInfo {
  id: string;
  address: string;
  port: number;
  connectedAt: number;
}

export interface TcpAutoReply {
  enabled: boolean;
  match: string;
  response: string;
  encoding: 'utf8' | 'hex' | 'base64';
}

export type TcpServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'clientConnected'; client: TcpClientInfo }
  | { type: 'clientDisconnected'; clientId: string }
  | { type: 'data'; clientId: string; data: number[]; timestamp: number };

export class TcpServer {
  private server: net.Server | null = null;
  private clients = new Map<string, { info: TcpClientInfo; socket: net.Socket }>();
  private autoReplies: TcpAutoReply[] = [];
  private idCounter = 0;

  constructor(private readonly onEvent: (event: TcpServerEvent) => void) {}

  start(port: number): void {
    if (this.server) { this.stop(); }

    this.server = net.createServer((socket) => {
      const id = `c${++this.idCounter}`;
      const info: TcpClientInfo = {
        id,
        address: socket.remoteAddress ?? 'unknown',
        port: socket.remotePort ?? 0,
        connectedAt: Date.now(),
      };
      this.clients.set(id, { info, socket });
      this.onEvent({ type: 'clientConnected', client: info });

      socket.on('data', (data: Buffer) => {
        this.onEvent({ type: 'data', clientId: id, data: Array.from(data), timestamp: Date.now() });

        for (const rule of this.autoReplies) {
          if (!rule.enabled) { continue; }
          const dataStr = data.toString('utf8');
          if (!rule.match || dataStr.includes(rule.match)) {
            socket.write(this.encodeResponse(rule.response, rule.encoding));
          }
        }
      });

      socket.on('close', () => {
        this.clients.delete(id);
        this.onEvent({ type: 'clientDisconnected', clientId: id });
      });

      socket.on('error', () => {
        this.clients.delete(id);
        this.onEvent({ type: 'clientDisconnected', clientId: id });
      });
    });

    this.server.once('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.server = null;
    });

    this.server.listen(port, '0.0.0.0', () => {
      this.onEvent({ type: 'started', port });
    });
  }

  stop(): void {
    for (const { socket } of this.clients.values()) {
      socket.destroy();
    }
    this.clients.clear();
    if (this.server) {
      this.server.close();
      this.server = null;
      this.onEvent({ type: 'stopped' });
    }
  }

  sendToClient(clientId: string, data: Buffer): void {
    const c = this.clients.get(clientId);
    if (c) { c.socket.write(data); }
  }

  broadcast(data: Buffer): void {
    for (const { socket } of this.clients.values()) {
      socket.write(data);
    }
  }

  setAutoReplies(rules: TcpAutoReply[]): void {
    this.autoReplies = rules;
  }

  get isRunning(): boolean {
    return this.server !== null;
  }

  private encodeResponse(response: string, encoding: 'utf8' | 'hex' | 'base64'): Buffer {
    if (encoding === 'hex') { return Buffer.from(response.replace(/\s/g, ''), 'hex'); }
    if (encoding === 'base64') { return Buffer.from(response, 'base64'); }
    return Buffer.from(response, 'utf8');
  }
}
