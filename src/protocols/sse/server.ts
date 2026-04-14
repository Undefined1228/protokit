import * as http from 'http';
import type { ServerResponse } from 'http';

export interface SseServerClientInfo {
  id: string;
  remoteAddress: string;
  connectedAt: number;
}

export type SseServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'clientConnected'; client: SseServerClientInfo }
  | { type: 'clientDisconnected'; clientId: string };

let idCounter = 0;

export class SseServer {
  private server: http.Server | null = null;
  private clients = new Map<string, ServerResponse>();
  private clientInfo = new Map<string, SseServerClientInfo>();
  private scheduleTimer: NodeJS.Timeout | null = null;

  constructor(private readonly onEvent: (event: SseServerEvent) => void) {}

  start(port: number): void {
    if (this.server) { this.stop(); }

    this.server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      if (req.method !== 'GET') {
        res.writeHead(405);
        res.end();
        return;
      }

      const id = `client_${++idCounter}`;
      const info: SseServerClientInfo = {
        id,
        remoteAddress: req.socket.remoteAddress ?? 'unknown',
        connectedAt: Date.now(),
      };

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
      res.write(':\n\n');

      this.clients.set(id, res);
      this.clientInfo.set(id, info);
      this.onEvent({ type: 'clientConnected', client: info });

      req.on('close', () => {
        this.clients.delete(id);
        this.clientInfo.delete(id);
        this.onEvent({ type: 'clientDisconnected', clientId: id });
      });
    });

    this.server.on('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.server = null;
    });

    this.server.listen(port, () => {
      this.onEvent({ type: 'started', port });
    });
  }

  stop(): void {
    this.stopSchedule();
    if (this.server) {
      for (const res of this.clients.values()) { res.end(); }
      this.clients.clear();
      this.clientInfo.clear();
      this.server.close();
      this.server = null;
      this.onEvent({ type: 'stopped' });
    }
  }

  broadcast(eventType: string, data: string, id: string): void {
    for (const res of this.clients.values()) {
      this.writeEvent(res, eventType, data, id);
    }
  }

  private writeEvent(res: ServerResponse, eventType: string, data: string, id: string): void {
    let msg = '';
    if (id) { msg += `id: ${id}\n`; }
    if (eventType && eventType !== 'message') { msg += `event: ${eventType}\n`; }
    msg += `data: ${data}\n\n`;
    try { res.write(msg); } catch {}
  }

  startSchedule(intervalMs: number, eventType: string, data: string): void {
    this.stopSchedule();
    this.scheduleTimer = setInterval(() => {
      const id = String(Date.now());
      this.broadcast(eventType, data, id);
    }, intervalMs);
  }

  stopSchedule(): void {
    if (this.scheduleTimer) {
      clearInterval(this.scheduleTimer);
      this.scheduleTimer = null;
    }
  }

  getClients(): SseServerClientInfo[] {
    return Array.from(this.clientInfo.values());
  }

  get isRunning(): boolean {
    return this.server !== null;
  }
}
