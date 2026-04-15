import * as vscode from 'vscode';
import { TcpClient } from '../protocols/tcp/client';
import { TcpServer } from '../protocols/tcp/server';
import type { TcpAutoReply } from '../protocols/tcp/server';
import { CSS, HTML, JS } from './tcpWebview';
import { registerPanel } from './searchRegistry';

export class TCPPanel {
  private client: TcpClient;
  private server: TcpServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new TcpClient((event) => {
      if (event.type === 'status') {
        panel.webview.postMessage({ type: 'tcp:status', payload: event });
      } else {
        panel.webview.postMessage({ type: 'tcp:data', payload: event });
      }
    });

    this.server = new TcpServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'tcp:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'tcp:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'tcp:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'clientConnected':
          panel.webview.postMessage({ type: 'tcp:clientConnected', payload: { client: event.client } });
          break;
        case 'clientDisconnected':
          panel.webview.postMessage({ type: 'tcp:clientDisconnected', payload: { clientId: event.clientId } });
          break;
        case 'data':
          panel.webview.postMessage({ type: 'tcp:serverData', payload: event });
          break;
      }
    });

    panel.onDidDispose(() => {
      this.client.disconnect();
      this.server.stop();
    });
  }

  static create(context: vscode.ExtensionContext): void {
    const panel = vscode.window.createWebviewPanel(
      'protokit.tcp',
      'TCP',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    registerPanel(panel);
    panel.webview.html = buildWebviewHtml();
    const instance = new TCPPanel(panel, context);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => instance.handleMessage(msg),
      null,
      context.subscriptions,
    );
  }

  private handleMessage(msg: { type: string; payload: unknown }): void {
    switch (msg.type) {
      case 'tcp:connect': {
        const p = msg.payload as { host: string; port: number };
        this.client.connect(p.host, p.port);
        break;
      }
      case 'tcp:disconnect':
        this.client.disconnect();
        break;

      case 'tcp:send': {
        const p = msg.payload as { data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.client.send(buf); }
        break;
      }

      case 'tcp:startServer': {
        const p = msg.payload as { port: number };
        this.server.start(p.port);
        break;
      }
      case 'tcp:stopServer':
        this.server.stop();
        break;

      case 'tcp:serverSendToClient': {
        const p = msg.payload as { clientId: string; data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.server.sendToClient(p.clientId, buf); }
        break;
      }
      case 'tcp:serverBroadcast': {
        const p = msg.payload as { data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.server.broadcast(buf); }
        break;
      }
      case 'tcp:setAutoReplies': {
        const p = msg.payload as { rules: TcpAutoReply[] };
        this.server.setAutoReplies(p.rules);
        break;
      }

      case 'tcp:saveLog': {
        const p = msg.payload as { text: string };
        this.saveLog(p.text, 'tcp');
        break;
      }
    }
  }

  private async saveLog(text: string, prefix: string): Promise<void> {
    const defaultUri = vscode.Uri.joinPath(
      vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file('/'),
      `${prefix}-log-${Date.now()}.txt`,
    );
    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: { 'Text': ['txt'], 'All Files': ['*'] },
    });
    if (!uri) { return; }
    await vscode.workspace.fs.writeFile(uri, Buffer.from(text, 'utf-8'));
  }
}

function decodeInput(data: string, encoding: 'utf8' | 'hex' | 'base64'): Buffer | null {
  try {
    if (encoding === 'hex') { return Buffer.from(data.replace(/\s/g, ''), 'hex'); }
    if (encoding === 'base64') { return Buffer.from(data, 'base64'); }
    return Buffer.from(data, 'utf8');
  } catch {
    return null;
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
