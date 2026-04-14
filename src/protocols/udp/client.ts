import * as dgram from 'dgram';

export type UdpClientEvent =
  | { type: 'status'; status: 'started' | 'stopped'; localPort?: number; error?: string }
  | { type: 'packet'; data: number[]; remoteAddress: string; remotePort: number; timestamp: number };

export class UdpClient {
  private socket: dgram.Socket | null = null;

  constructor(private readonly onEvent: (event: UdpClientEvent) => void) {}

  start(localPort = 0): void {
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
    });

    this.socket.on('error', (err) => {
      this.onEvent({ type: 'status', status: 'stopped', error: err.message });
      this.socket = null;
    });

    this.socket.bind(localPort, () => {
      const addr = this.socket!.address() as { address: string; family: string; port: number };
      this.onEvent({ type: 'status', status: 'started', localPort: addr.port });
    });
  }

  send(host: string, port: number, data: Buffer): void {
    if (this.socket) {
      this.socket.send(data, port, host);
    }
  }

  stop(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.onEvent({ type: 'status', status: 'stopped' });
    }
  }

  get isRunning(): boolean {
    return this.socket !== null;
  }
}
