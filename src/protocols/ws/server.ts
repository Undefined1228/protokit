import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';

export interface WsServerClientInfo {
  id: string;
  remoteAddress: string;
  connectedAt: number;
}

export type WsServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'clientConnected'; client: WsServerClientInfo }
  | { type: 'clientDisconnected'; clientId: string }
  | { type: 'message'; clientId: string; data: string; timestamp: number };

export interface EventHandler {
  enabled: boolean;
  trigger: 'connect' | 'message' | 'disconnect';
  match: string;
  response: string;
}

let idCounter = 0;

export class WsServer {
  private wss: WebSocketServer | null = null;
  private clients = new Map<string, WebSocket>();
  private clientInfo = new Map<string, WsServerClientInfo>();
  private handlers: EventHandler[] = [];

  constructor(private readonly onEvent: (event: WsServerEvent) => void) {}

  start(port: number): void {
    if (this.wss) this.stop();

    try {
      this.wss = new WebSocketServer({ port });
    } catch (err) {
      this.onEvent({ type: 'error', message: String(err) });
      return;
    }

    this.wss.on('listening', () => {
      this.onEvent({ type: 'started', port });
    });

    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const id = `client_${++idCounter}`;
      const info: WsServerClientInfo = {
        id,
        remoteAddress: req.socket.remoteAddress ?? 'unknown',
        connectedAt: Date.now(),
      };
      this.clients.set(id, ws);
      this.clientInfo.set(id, info);
      this.onEvent({ type: 'clientConnected', client: info });

      for (const h of this.handlers) {
        if (h.enabled && h.trigger === 'connect' && h.response) {
          ws.send(h.response);
        }
      }

      ws.on('message', (data) => {
        const msg = data.toString();
        this.onEvent({ type: 'message', clientId: id, data: msg, timestamp: Date.now() });

        for (const h of this.handlers) {
          if (!h.enabled || h.trigger !== 'message' || !h.response) continue;
          if (!h.match) {
            ws.send(h.response);
          } else {
            try {
              if (new RegExp(h.match).test(msg)) ws.send(h.response);
            } catch {}
          }
        }
      });

      ws.on('close', () => {
        this.clients.delete(id);
        this.clientInfo.delete(id);
        this.onEvent({ type: 'clientDisconnected', clientId: id });

        for (const h of this.handlers) {
          if (h.enabled && h.trigger === 'disconnect' && h.response) {
            for (const client of this.clients.values()) {
              if (client.readyState === WebSocket.OPEN) client.send(h.response);
            }
          }
        }
      });

      ws.on('error', () => {});
    });

    this.wss.on('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.wss = null;
    });
  }

  stop(): void {
    if (this.wss) {
      for (const ws of this.clients.values()) ws.terminate();
      this.clients.clear();
      this.clientInfo.clear();
      this.wss.close();
      this.wss = null;
      this.onEvent({ type: 'stopped' });
    }
  }

  send(clientId: string, data: string): void {
    const ws = this.clients.get(clientId);
    if (ws?.readyState === WebSocket.OPEN) ws.send(data);
  }

  broadcast(data: string): void {
    for (const ws of this.clients.values()) {
      if (ws.readyState === WebSocket.OPEN) ws.send(data);
    }
  }

  setHandlers(handlers: EventHandler[]): void {
    this.handlers = handlers;
  }

  getClients(): WsServerClientInfo[] {
    return Array.from(this.clientInfo.values());
  }

  get isRunning(): boolean {
    return this.wss !== null;
  }
}
