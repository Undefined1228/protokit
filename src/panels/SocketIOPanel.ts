import * as vscode from 'vscode';
import { SioClient } from '../protocols/socketio/client';
import { SioServer } from '../protocols/socketio/server';
import type { SioEventHandler } from '../protocols/socketio/server';
import type { ProtoKitStore } from '../storage/store';
import { CSS, HTML, JS } from './socketioWebview';

export class SocketIOPanel {
  private client: SioClient;
  private server: SioServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new SioClient((event) => {
      if (event.type === 'status') {
        panel.webview.postMessage({ type: 'sio:status', payload: event });
      } else {
        panel.webview.postMessage({ type: 'sio:event', payload: event });
      }
    });

    this.server = new SioServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'sio:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'sio:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'sio:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'clientConnected':
          panel.webview.postMessage({ type: 'sio:clientConnected', payload: { client: event.client } });
          break;
        case 'clientDisconnected':
          panel.webview.postMessage({ type: 'sio:clientDisconnected', payload: { clientId: event.clientId } });
          break;
        case 'event':
          panel.webview.postMessage({ type: 'sio:serverEvent', payload: event });
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
      'protokit.socketio',
      'Socket.IO',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    panel.webview.html = buildWebviewHtml();
    const instance = new SocketIOPanel(panel, store, context);
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
      case 'sio:connect': {
        const p = msg.payload as {
          url: string;
          namespace: string;
          transport: 'websocket' | 'polling';
          auth: Record<string, unknown>;
          listeners: string[];
        };
        this.client.connect(p);
        break;
      }
      case 'sio:disconnect':
        this.client.disconnect();
        break;

      case 'sio:emit': {
        const p = msg.payload as { eventName: string; data: unknown };
        this.client.emit(p.eventName, p.data);
        break;
      }

      case 'sio:joinRoom': {
        const p = msg.payload as { room: string };
        this.client.joinRoom(p.room);
        break;
      }
      case 'sio:leaveRoom': {
        const p = msg.payload as { room: string };
        this.client.leaveRoom(p.room);
        break;
      }

      case 'sio:startServer': {
        const p = msg.payload as { port: number; namespaces: string[] };
        this.server.start(p.port, p.namespaces);
        break;
      }
      case 'sio:stopServer':
        this.server.stop();
        break;

      case 'sio:serverEmitToClient': {
        const p = msg.payload as { clientId: string; eventName: string; data: unknown };
        this.server.emitToClient(p.clientId, p.eventName, p.data);
        break;
      }
      case 'sio:serverEmitToRoom': {
        const p = msg.payload as { namespace: string; room: string; eventName: string; data: unknown };
        this.server.emitToRoom(p.namespace, p.room, p.eventName, p.data);
        break;
      }
      case 'sio:serverBroadcast': {
        const p = msg.payload as { namespace: string; eventName: string; data: unknown };
        this.server.broadcast(p.namespace, p.eventName, p.data);
        break;
      }
      case 'sio:setHandlers': {
        const p = msg.payload as { handlers: SioEventHandler[] };
        this.server.setHandlers(p.handlers);
        break;
      }

      case 'sio:saveLog': {
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
      `socketio-log-${Date.now()}.txt`,
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
