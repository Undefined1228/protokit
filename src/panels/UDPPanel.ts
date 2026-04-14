import * as vscode from 'vscode';
import { UdpClient } from '../protocols/udp/client';
import { UdpServer } from '../protocols/udp/server';
import type { UdpAutoReply } from '../protocols/udp/server';
import { CSS, HTML, JS } from './udpWebview';

export class UDPPanel {
  private client: UdpClient;
  private server: UdpServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new UdpClient((event) => {
      if (event.type === 'status') {
        panel.webview.postMessage({ type: 'udp:clientStatus', payload: event });
      } else {
        panel.webview.postMessage({ type: 'udp:packet', payload: event });
      }
    });

    this.server = new UdpServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'udp:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'udp:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'udp:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'packet':
          panel.webview.postMessage({ type: 'udp:serverPacket', payload: event });
          break;
      }
    });

    panel.onDidDispose(() => {
      this.client.stop();
      this.server.stop();
    });
  }

  static create(context: vscode.ExtensionContext): void {
    const panel = vscode.window.createWebviewPanel(
      'protokit.udp',
      'UDP',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    panel.webview.html = buildWebviewHtml();
    const instance = new UDPPanel(panel, context);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => instance.handleMessage(msg),
      null,
      context.subscriptions,
    );
  }

  private handleMessage(msg: { type: string; payload: unknown }): void {
    switch (msg.type) {
      case 'udp:startClient':
        this.client.start();
        break;
      case 'udp:stopClient':
        this.client.stop();
        break;

      case 'udp:send': {
        const p = msg.payload as { host: string; port: number; data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.client.send(p.host, p.port, buf); }
        break;
      }

      case 'udp:startServer': {
        const p = msg.payload as { port: number };
        this.server.start(p.port);
        break;
      }
      case 'udp:stopServer':
        this.server.stop();
        break;

      case 'udp:serverSend': {
        const p = msg.payload as { host: string; port: number; data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.server.send(p.host, p.port, buf); }
        break;
      }
      case 'udp:serverBroadcast': {
        const p = msg.payload as { port: number; data: string; encoding: 'utf8' | 'hex' | 'base64' };
        const buf = decodeInput(p.data, p.encoding);
        if (buf) { this.server.broadcast(p.port, buf); }
        break;
      }
      case 'udp:setAutoReplies': {
        const p = msg.payload as { rules: UdpAutoReply[] };
        this.server.setAutoReplies(p.rules);
        break;
      }

      case 'udp:saveLog': {
        const p = msg.payload as { text: string };
        this.saveLog(p.text);
        break;
      }
    }
  }

  private async saveLog(text: string): Promise<void> {
    const defaultUri = vscode.Uri.joinPath(
      vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file('/'),
      `udp-log-${Date.now()}.txt`,
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
