import * as net from 'net';

export type TcpStatus = 'connecting' | 'connected' | 'disconnected';

export type TcpClientEvent =
  | { type: 'status'; status: TcpStatus; reason?: string }
  | { type: 'data'; data: number[]; timestamp: number };

export class TcpClient {
  private socket: net.Socket | null = null;
  private _status: TcpStatus = 'disconnected';

  constructor(private readonly onEvent: (event: TcpClientEvent) => void) {}

  connect(host: string, port: number): void {
    this.disconnect();
    this._status = 'connecting';
    this.onEvent({ type: 'status', status: 'connecting' });

    this.socket = new net.Socket();

    this.socket.connect(port, host, () => {
      this._status = 'connected';
      this.onEvent({ type: 'status', status: 'connected' });
    });

    this.socket.on('data', (data: Buffer) => {
      this.onEvent({ type: 'data', data: Array.from(data), timestamp: Date.now() });
    });

    this.socket.on('close', () => {
      this._status = 'disconnected';
      this.onEvent({ type: 'status', status: 'disconnected' });
      this.socket = null;
    });

    this.socket.on('error', (err) => {
      this._status = 'disconnected';
      this.onEvent({ type: 'status', status: 'disconnected', reason: err.message });
    });
  }

  send(data: Buffer): boolean {
    if (!this.socket || this._status !== 'connected') { return false; }
    this.socket.write(data);
    return true;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
    this._status = 'disconnected';
  }

  get status(): TcpStatus {
    return this._status;
  }
}
