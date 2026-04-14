import * as vscode from 'vscode';
import { SseClient } from '../protocols/sse/client';
import { SseServer } from '../protocols/sse/server';
import type { ProtoKitStore } from '../storage/store';
import { CSS, HTML, JS } from './sseWebview';

export class SSEPanel {
  private client: SseClient;
  private server: SseServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new SseClient((event) => {
      if (event.type === 'status') {
        panel.webview.postMessage({ type: 'sse:status', payload: event });
      } else {
        panel.webview.postMessage({ type: 'sse:event', payload: event });
      }
    });

    this.server = new SseServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'sse:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'sse:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'sse:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'clientConnected':
          panel.webview.postMessage({ type: 'sse:clientConnected', payload: { client: event.client } });
          break;
        case 'clientDisconnected':
          panel.webview.postMessage({ type: 'sse:clientDisconnected', payload: { clientId: event.clientId } });
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
      'protokit.sse',
      'SSE',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    panel.webview.html = buildWebviewHtml();
    const instance = new SSEPanel(panel, store, context);
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
      case 'sse:connect': {
        const p = msg.payload as { url: string; headers: Record<string, string> };
        this.client.connect({ url: p.url, headers: p.headers });
        break;
      }
      case 'sse:disconnect':
        this.client.disconnect();
        break;

      case 'sse:startServer': {
        const p = msg.payload as { port: number };
        this.server.start(p.port);
        break;
      }
      case 'sse:stopServer':
        this.server.stop();
        break;

      case 'sse:broadcast': {
        const p = msg.payload as { eventType: string; data: string; id: string };
        this.server.broadcast(p.eventType, p.data, p.id);
        break;
      }

      case 'sse:startSchedule': {
        const p = msg.payload as { intervalMs: number; eventType: string; data: string };
        this.server.startSchedule(p.intervalMs, p.eventType, p.data);
        break;
      }
      case 'sse:stopSchedule':
        this.server.stopSchedule();
        break;

      case 'sse:saveLog': {
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
      `sse-log-${Date.now()}.txt`,
    );
    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: { 'Text': ['txt'], 'All Files': ['*'] },
    });
    if (!uri) { return; }
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
