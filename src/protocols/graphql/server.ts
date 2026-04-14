import * as http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { buildSchema, graphql, GraphQLSchema, parse, validate, execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/use/ws';

export interface GqlResolverDef {
  field: string;
  returnValue: string;
}

export type GqlServerEvent =
  | { type: 'started'; port: number }
  | { type: 'stopped' }
  | { type: 'error'; message: string }
  | { type: 'request'; query: string; variables: unknown; timestamp: number };

export class GqlServer {
  private httpServer: http.Server | null = null;
  private wss: WebSocketServer | null = null;
  private schema: GraphQLSchema | null = null;
  private resolverDefs: GqlResolverDef[] = [];

  constructor(private readonly onEvent: (event: GqlServerEvent) => void) {}

  start(port: number, sdl: string, resolvers: GqlResolverDef[]): void {
    if (this.httpServer) {this.stop();}
    this.resolverDefs = resolvers;

    try {
      this.schema = buildSchema(sdl);
    } catch (err) {
      this.onEvent({ type: 'error', message: `Schema 오류: ${String(err)}` });
      return;
    }

    const rootValue = this.buildRootValue(resolvers);

    this.httpServer = http.createServer((req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405);
        res.end();
        return;
      }
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', async () => {
        try {
          const { query, variables } = JSON.parse(body);
          this.onEvent({ type: 'request', query, variables, timestamp: Date.now() });
          const result = await graphql({
            schema: this.schema!,
            source: query,
            rootValue,
            variableValues: variables,
          });
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify(result));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ errors: [{ message: String(err) }] }));
        }
      });
    });

    this.wss = new WebSocketServer({ server: this.httpServer });

    useServer(
      {
        schema: this.schema,
        roots: { subscription: rootValue as Record<string, Record<string, unknown>> },
        execute,
        subscribe,
      },
      this.wss,
    );

    this.httpServer.on('error', (err: NodeJS.ErrnoException) => {
      const msg = err.code === 'EADDRINUSE' ? `포트 ${port}이(가) 이미 사용 중입니다.` : String(err);
      this.onEvent({ type: 'error', message: msg });
      this.httpServer = null;
      this.wss = null;
    });

    this.httpServer.listen(port, () => {
      this.onEvent({ type: 'started', port });
    });
  }

  stop(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    if (this.httpServer) {
      this.httpServer.close();
      this.httpServer = null;
      this.onEvent({ type: 'stopped' });
    }
    this.schema = null;
  }

  publishEvent(field: string, payload: string): void {
    if (!this.wss) {return;}
    const message = JSON.stringify({
      type: 'next',
      payload: { data: { [field]: payload } },
    });
    for (const client of this.wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  getPlaygroundHtml(port: number): string {
    return `<!DOCTYPE html>
<html>
<head><title>GraphQL Playground — port ${port}</title>
<style>body{margin:0;padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;}
textarea{width:100%;background:#2d2d2d;color:#d4d4d4;border:1px solid #555;padding:8px;font-family:monospace;font-size:13px;}
button{background:#0e639c;color:#fff;border:none;padding:6px 16px;cursor:pointer;border-radius:3px;margin:4px 0;}
pre{background:#2d2d2d;padding:12px;overflow:auto;border:1px solid #555;min-height:80px;}
label{font-size:12px;color:#aaa;}</style>
</head>
<body>
<h3 style="margin:0 0 12px">GraphQL Playground — http://localhost:${port}</h3>
<label>Query</label>
<textarea id="q" rows="8">{ __typename }</textarea><br>
<label>Variables (JSON)</label>
<textarea id="v" rows="3">{}</textarea><br>
<button onclick="run()">실행</button>
<pre id="out"></pre>
<script>
async function run(){
  const q=document.getElementById('q').value;
  const v=document.getElementById('v').value;
  try{
    const r=await fetch('http://localhost:${port}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:q,variables:JSON.parse(v||'{}')})});
    document.getElementById('out').textContent=JSON.stringify(await r.json(),null,2);
  }catch(e){document.getElementById('out').textContent=String(e);}
}
</script>
</body></html>`;
  }

  private buildRootValue(resolvers: GqlResolverDef[]): Record<string, unknown> {
    const root: Record<string, unknown> = {};
    for (const r of resolvers) {
      const field = r.field;
      const raw = r.returnValue;
      root[field] = () => {
        try { return JSON.parse(raw); } catch { return raw; }
      };
    }
    return root;
  }

  validateSchema(sdl: string): string | null {
    try {
      buildSchema(sdl);
      return null;
    } catch (err) {
      return String(err);
    }
  }

  get isRunning(): boolean {
    return this.httpServer !== null;
  }
}
