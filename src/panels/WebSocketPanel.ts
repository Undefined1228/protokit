import * as vscode from 'vscode';
import { WsClient } from '../protocols/ws/client';
import { WsServer } from '../protocols/ws/server';
import type { EventHandler } from '../protocols/ws/server';
import type { ProtoKitStore } from '../storage/store';
import { registerPanel } from './searchRegistry';
import { CSS, HTML, JS } from './webSocketWebview';

export class WebSocketPanel {
  private client: WsClient;
  private server: WsServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new WsClient((event) => {
      if (event.type === 'status') {
        panel.webview.postMessage({ type: 'ws:status', payload: event });
      } else {
        panel.webview.postMessage({ type: 'ws:message', payload: event });
      }
    });

    this.server = new WsServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'ws:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'ws:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'ws:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'clientConnected':
          panel.webview.postMessage({ type: 'ws:clientConnected', payload: { client: event.client } });
          break;
        case 'clientDisconnected':
          panel.webview.postMessage({ type: 'ws:clientDisconnected', payload: { clientId: event.clientId } });
          break;
        case 'message':
          panel.webview.postMessage({ type: 'ws:serverMessage', payload: { clientId: event.clientId, data: event.data, timestamp: event.timestamp } });
          break;
      }
    });

    panel.onDidDispose(() => {
      this.client.disconnect();
      this.server.stop();
    });
  }

  static create(context: vscode.ExtensionContext, store: ProtoKitStore): void {
    const panel = vscode.window.createWebviewPanel(
      'protokit.websocket',
      'WebSocket',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    registerPanel(panel);
    panel.webview.html = buildWebviewHtml();
    const instance = new WebSocketPanel(panel, store, context);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => instance.handleMessage(msg),
      null,
      context.subscriptions,
    );
    store.onDidChange(() => instance.pushEnvVars(), context.subscriptions);
  }

  private getEnvVars(): Record<string, string> {
    for (const col of this.store.getCollections()) {
      if (col.activeEnvironmentId) {
        return this.store.getActiveEnvironmentVariables(col.id);
      }
    }
    return {};
  }

  private pushEnvVars(): void {
    this.panel.webview.postMessage({ type: 'setEnvVars', payload: this.getEnvVars() });
  }

  private handleMessage(msg: { type: string; payload: unknown }): void {
    switch (msg.type) {
      case 'ws:connect': {
        const p = msg.payload as { url: string; headers: Record<string, string> };
        this.client.connect({ url: p.url, headers: p.headers });
        break;
      }
      case 'ws:disconnect':
        this.client.disconnect();
        break;

      case 'ws:send': {
        const p = msg.payload as { data: string };
        this.client.send(p.data);
        break;
      }

      case 'ws:startServer': {
        const p = msg.payload as { port: number };
        this.server.start(p.port);
        break;
      }
      case 'ws:stopServer':
        this.server.stop();
        break;

      case 'ws:serverSend': {
        const p = msg.payload as { clientId: string; data: string };
        this.server.send(p.clientId, p.data);
        break;
      }
      case 'ws:serverBroadcast': {
        const p = msg.payload as { data: string };
        this.server.broadcast(p.data);
        break;
      }
      case 'ws:setHandlers': {
        const p = msg.payload as { handlers: EventHandler[] };
        this.server.setHandlers(p.handlers);
        break;
      }

      case 'ws:saveLog': {
        const p = msg.payload as { text: string };
        this.saveLog(p.text);
        break;
      }

      case 'ready':
        this.pushEnvVars();
        break;
    }
  }

  private async saveLog(text: string): Promise<void> {
    const defaultUri = vscode.Uri.joinPath(
      vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file('/'),
      `ws-log-${Date.now()}.txt`,
    );
    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: { 'Text': ['txt'], 'All Files': ['*'] },
    });
    if (!uri) {return;}
    await vscode.workspace.fs.writeFile(uri, Buffer.from(text, 'utf-8'));
  }
}

function buildWebviewHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
<style>${CSS}</style>
</head>
<body>
${HTML}
<script>${JS}</script>
</body>
</html>`;
}
