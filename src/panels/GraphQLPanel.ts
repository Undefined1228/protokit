import * as vscode from 'vscode';
import { GqlClient } from '../protocols/graphql/client';
import { GqlServer } from '../protocols/graphql/server';
import type { ProtoKitStore } from '../storage/store';
import { CSS, HTML, JS } from './graphqlWebview';
import { registerPanel } from './searchRegistry';

export class GraphQLPanel {
  private client: GqlClient;
  private server: GqlServer;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly context: vscode.ExtensionContext,
  ) {
    this.client = new GqlClient((event) => {
      switch (event.type) {
        case 'data':
          panel.webview.postMessage({ type: 'gql:data', payload: event });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'gql:error', payload: event });
          break;
        case 'complete':
          panel.webview.postMessage({ type: 'gql:complete', payload: event });
          break;
        case 'subscriptionStatus':
          panel.webview.postMessage({ type: 'gql:subscriptionStatus', payload: event });
          break;
      }
    });

    this.server = new GqlServer((event) => {
      switch (event.type) {
        case 'started':
          panel.webview.postMessage({ type: 'gql:serverStatus', payload: { running: true, port: event.port } });
          break;
        case 'stopped':
          panel.webview.postMessage({ type: 'gql:serverStatus', payload: { running: false } });
          break;
        case 'error':
          panel.webview.postMessage({ type: 'gql:serverStatus', payload: { running: false, error: event.message } });
          break;
        case 'request':
          panel.webview.postMessage({ type: 'gql:serverRequest', payload: event });
          break;
      }
    });

    panel.onDidDispose(() => {
      this.client.dispose();
      this.server.stop();
    });
  }

  static create(context: vscode.ExtensionContext, store: ProtoKitStore): void {
    const panel = vscode.window.createWebviewPanel(
      'protokit.graphql',
      'GraphQL',
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    registerPanel(panel);
    panel.webview.html = buildWebviewHtml();
    const instance = new GraphQLPanel(panel, store, context);
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

  private async handleMessage(msg: { type: string; payload: unknown }): Promise<void> {
    switch (msg.type) {
      case 'gql:execute': {
        const p = msg.payload as {
          url: string;
          query: string;
          variables: Record<string, unknown>;
          headers: Record<string, string>;
          operationType: 'query' | 'mutation' | 'subscription';
        };
        await this.client.execute({
          url: p.url,
          query: p.query,
          variables: p.variables,
          headers: p.headers,
          operationType: p.operationType,
        });
        break;
      }

      case 'gql:stopSubscription':
        this.client.stopSubscription();
        break;

      case 'gql:introspect': {
        const p = msg.payload as { url: string; headers: Record<string, string> };
        try {
          const result = await this.client.introspect(p.url, p.headers);
          this.panel.webview.postMessage({ type: 'gql:introspectResult', payload: { data: result } });
        } catch (err) {
          this.panel.webview.postMessage({ type: 'gql:introspectResult', payload: { error: String(err) } });
        }
        break;
      }

      case 'gql:startServer': {
        const p = msg.payload as {
          port: number;
          sdl: string;
          resolvers: { field: string; returnValue: string }[];
        };
        this.server.start(p.port, p.sdl, p.resolvers);
        break;
      }

      case 'gql:stopServer':
        this.server.stop();
        break;

      case 'gql:publishEvent': {
        const p = msg.payload as { field: string; payload: string };
        this.server.publishEvent(p.field, p.payload);
        break;
      }

      case 'ready':
        this.pushEnvVars();
        break;

      case 'gql:openPlayground': {
        const p = msg.payload as { port: number };
        const html = this.server.getPlaygroundHtml(p.port);
        const playground = vscode.window.createWebviewPanel(
          'protokit.gqlPlayground',
          `GraphQL Playground :${p.port}`,
          vscode.ViewColumn.Beside,
          { enableScripts: true },
        );
        playground.webview.html = html;
        break;
      }
    }
  }
}

function buildWebviewHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src http: ws:;">
<style>${CSS}</style>
</head>
<body>
${HTML}
<script>${JS}</script>
</body>
</html>`;
}
