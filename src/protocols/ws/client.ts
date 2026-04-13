import WebSocket from 'ws';

export type WsClientStatus = 'connecting' | 'connected' | 'disconnected';

export type WsClientEvent =
  | { type: 'status'; status: WsClientStatus; code?: number; reason?: string }
  | { type: 'message'; direction: 'received'; data: string; timestamp: number };

export interface WsClientOptions {
  url: string;
  headers?: Record<string, string>;
}

export class WsClient {
  private ws: WebSocket | null = null;

  constructor(private readonly onEvent: (event: WsClientEvent) => void) {}

  connect(options: WsClientOptions): void {
    this.disconnect();
    this.onEvent({ type: 'status', status: 'connecting' });

    try {
      this.ws = new WebSocket(options.url, { headers: options.headers ?? {} });
    } catch {
      this.onEvent({ type: 'status', status: 'disconnected', reason: '잘못된 URL' });
      return;
    }

    this.ws.on('open', () => {
      this.onEvent({ type: 'status', status: 'connected' });
    });

    this.ws.on('message', (data) => {
      this.onEvent({
        type: 'message',
        direction: 'received',
        data: data.toString(),
        timestamp: Date.now(),
      });
    });

    this.ws.on('close', (code, reason) => {
      this.onEvent({ type: 'status', status: 'disconnected', code, reason: reason.toString() });
      this.ws = null;
    });

    this.ws.on('error', () => {
      // close 이벤트가 뒤따름
    });
  }

  send(data: string): boolean {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
      return true;
    }
    return false;
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  get status(): WsClientStatus {
    if (!this.ws) return 'disconnected';
    if (this.ws.readyState === WebSocket.OPEN) return 'connected';
    if (this.ws.readyState === WebSocket.CONNECTING) return 'connecting';
    return 'disconnected';
  }
}
