import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

export interface SioClientInfo {
  id: string;
  namespace: string;
  connectedAt: number;
  rooms: string[];
}

export type SioServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'clientConnected'; client: SioClientInfo }
  | { type: 'clientDisconnected'; clientId: string }
  | { type: 'event'; clientId: string; namespace: string; eventName: string; data: unknown; timestamp: number };

export interface SioEventHandler {
  enabled: boolean;
  eventName: string;
  match: string;
  responseEvent: string;
  response: string;
}

export class SioServer {
  private httpServer: ReturnType<typeof createServer> | null = null;
  private io: Server | null = null;
  private clients = new Map<string, SioClientInfo>();
  private handlers: SioEventHandler[] = [];
  private namespaces: string[] = ['/'];

  constructor(private readonly onEvent: (event: SioServerEvent) => void) {}

  start(port: number, namespaces: string[]): void {
    if (this.httpServer) {this.stop();}

    this.namespaces = namespaces.length ? namespaces : ['/'];

    this.httpServer = createServer();
    this.io = new Server(this.httpServer, {
      cors: { origin: '*' },
    });

    for (const ns of this.namespaces) {
      const nsp = this.io.of(ns);
      nsp.on('connection', (socket: Socket) => {
        const info: SioClientInfo = {
          id: socket.id,
          namespace: ns,
          connectedAt: Date.now(),
          rooms: [],
        };
        this.clients.set(socket.id, info);
        this.onEvent({ type: 'clientConnected', client: info });

        socket.onAny((eventName: string, data: unknown) => {
          const clientInfo = this.clients.get(socket.id);
          if (clientInfo) {
            if (eventName === 'join' && typeof data === 'string') {
              socket.join(data);
              clientInfo.rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
            } else if (eventName === 'leave' && typeof data === 'string') {
              socket.leave(data);
              clientInfo.rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
            }
          }

          this.onEvent({ type: 'event', clientId: socket.id, namespace: ns, eventName, data, timestamp: Date.now() });

          const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
          for (const h of this.handlers) {
            if (!h.enabled || h.eventName !== eventName || !h.responseEvent) {continue;}
            if (!h.match) {
              socket.emit(h.responseEvent, this.parsePayload(h.response));
            } else {
              try {
                if (new RegExp(h.match).test(dataStr)) {
                  socket.emit(h.responseEvent, this.parsePayload(h.response));
                }
              } catch {}
            }
          }
        });

        socket.on('disconnect', () => {
          this.clients.delete(socket.id);
          this.onEvent({ type: 'clientDisconnected', clientId: socket.id });
        });
      });
    }

    this.httpServer.once('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.httpServer = null;
      this.io = null;
    });

    this.httpServer.listen(port, () => {
      this.onEvent({ type: 'started', port });
    });
  }

  stop(): void {
    if (this.io) {
      this.io.close();
      this.io = null;
    }
    if (this.httpServer) {
      this.httpServer.close();
      this.httpServer = null;
      this.clients.clear();
      this.onEvent({ type: 'stopped' });
    }
  }

  emitToClient(clientId: string, eventName: string, data: unknown): void {
    if (!this.io) {return;}
    for (const ns of this.namespaces) {
      const socket = this.io.of(ns).sockets.get(clientId);
      if (socket) {
        socket.emit(eventName, data);
        return;
      }
    }
  }

  emitToRoom(namespace: string, room: string, eventName: string, data: unknown): void {
    if (!this.io) {return;}
    this.io.of(namespace).to(room).emit(eventName, data);
  }

  broadcast(namespace: string, eventName: string, data: unknown): void {
    if (!this.io) {return;}
    this.io.of(namespace).emit(eventName, data);
  }

  setHandlers(handlers: SioEventHandler[]): void {
    this.handlers = handlers;
  }

  getClients(): SioClientInfo[] {
    return Array.from(this.clients.values());
  }

  get isRunning(): boolean {
    return this.httpServer !== null;
  }

  private parsePayload(raw: string): unknown {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
}
