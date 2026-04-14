import * as dgram from 'dgram';

export interface UdpAutoReply {
  enabled: boolean;
  match: string;
  response: string;
  encoding: 'utf8' | 'hex' | 'base64';
}

export type UdpServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'packet'; data: number[]; remoteAddress: string; remotePort: number; timestamp: number };

export class UdpServer {
  private socket: dgram.Socket | null = null;
  private autoReplies: UdpAutoReply[] = [];

  constructor(private readonly onEvent: (event: UdpServerEvent) => void) {}

  start(port: number): void {
    if (this.socket) { this.stop(); }

    this.socket = dgram.createSocket('udp4');

    this.socket.on('message', (data: Buffer, rinfo: dgram.RemoteInfo) => {
      this.onEvent({
        type: 'packet',
        data: Array.from(data),
        remoteAddress: rinfo.address,
        remotePort: rinfo.port,
        timestamp: Date.now(),
      });

      for (const rule of this.autoReplies) {
        if (!rule.enabled) { continue; }
        const dataStr = data.toString('utf8');
        if (!rule.match || dataStr.includes(rule.match)) {
          const responseData = this.encodeResponse(rule.response, rule.encoding);
          this.socket!.send(responseData, rinfo.port, rinfo.address);
        }
      }
    });

    this.socket.on('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.socket = null;
    });

    this.socket.bind(port, '0.0.0.0', () => {
      this.socket!.setBroadcast(true);
      this.onEvent({ type: 'started', port });
    });
  }

  stop(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.onEvent({ type: 'stopped' });
    }
  }

  send(host: string, port: number, data: Buffer): void {
    if (this.socket) {
      this.socket.send(data, port, host);
    }
  }

  broadcast(port: number, data: Buffer): void {
    if (this.socket) {
      this.socket.send(data, port, '255.255.255.255');
    }
  }

  setAutoReplies(rules: UdpAutoReply[]): void {
    this.autoReplies = rules;
  }

  get isRunning(): boolean {
    return this.socket !== null;
  }

  private encodeResponse(response: string, encoding: 'utf8' | 'hex' | 'base64'): Buffer {
    if (encoding === 'hex') { return Buffer.from(response.replace(/\s/g, ''), 'hex'); }
    if (encoding === 'base64') { return Buffer.from(response, 'base64'); }
    return Buffer.from(response, 'utf8');
  }
}
