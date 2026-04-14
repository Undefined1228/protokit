import { io, Socket } from 'socket.io-client';

export type SioClientStatus = 'connecting' | 'connected' | 'disconnected';

export type SioClientEvent =
  | { type: 'status'; status: SioClientStatus; reason?: string }
  | { type: 'event'; eventName: string; data: unknown; timestamp: number };

export interface SioClientOptions {
  url: string;
  namespace: string;
  transport: 'websocket' | 'polling';
  auth: Record<string, unknown>;
  listeners: string[];
}

export class SioClient {
  private socket: Socket | null = null;
  private listeners: string[] = [];

  constructor(private readonly onEvent: (event: SioClientEvent) => void) {}

  connect(options: SioClientOptions): void {
    this.disconnect();
    this.listeners = options.listeners;
    this.onEvent({ type: 'status', status: 'connecting' });

    const url = options.namespace
      ? options.url.replace(/\/$/, '') + '/' + options.namespace.replace(/^\//, '')
      : options.url;

    try {
      this.socket = io(url, {
        transports: [options.transport],
        auth: options.auth,
        autoConnect: false,
        reconnection: false,
      });
    } catch {
      this.onEvent({ type: 'status', status: 'disconnected', reason: '잘못된 URL' });
      return;
    }

    this.socket.on('connect', () => {
      this.onEvent({ type: 'status', status: 'connected' });
    });

    this.socket.on('disconnect', (reason) => {
      this.onEvent({ type: 'status', status: 'disconnected', reason });
      this.socket = null;
    });

    this.socket.on('connect_error', (err) => {
      this.onEvent({ type: 'status', status: 'disconnected', reason: err.message });
      this.socket = null;
    });

    for (const eventName of this.listeners) {
      this.socket.on(eventName, (data: unknown) => {
        this.onEvent({ type: 'event', eventName, data, timestamp: Date.now() });
      });
    }

    this.socket.connect();
  }

  emit(eventName: string, payload: unknown): boolean {
    if (this.socket?.connected) {
      this.socket.emit(eventName, payload);
      return true;
    }
    return false;
  }

  joinRoom(room: string): void {
    if (this.socket?.connected) {
      this.socket.emit('join', room);
    }
  }

  leaveRoom(room: string): void {
    if (this.socket?.connected) {
      this.socket.emit('leave', room);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  get status(): SioClientStatus {
    if (!this.socket) {return 'disconnected';}
    if (this.socket.connected) {return 'connected';}
    return 'connecting';
  }
}
