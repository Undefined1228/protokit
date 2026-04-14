import * as vscode from 'vscode';
import type { ProtoKitStore } from '../storage/store';
import { CSS, HTML, JS } from './environmentWebview';

export class EnvironmentPanel {
  private static readonly panels = new Map<string, EnvironmentPanel>();

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly collId: string,
  ) {
    panel.webview.html = buildWebviewHtml();
    panel.onDidDispose(() => {
      EnvironmentPanel.panels.delete(collId);
    });
  }

  static create(
    context: vscode.ExtensionContext,
    store: ProtoKitStore,
    collId: string,
  ): void {
    const existing = EnvironmentPanel.panels.get(collId);
    if (existing) {
      existing.panel.reveal();
      return;
    }

    const col = store.getCollections().find(c => c.id === collId);
    if (!col) {return;}

    const panel = vscode.window.createWebviewPanel(
      'protokit.environments',
      `환경 관리 — ${col.name}`,
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );

    const ep = new EnvironmentPanel(panel, store, collId);
    EnvironmentPanel.panels.set(collId, ep);

    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => ep.handleMessage(msg),
      null,
      context.subscriptions,
    );
  }

  private sendUpdate(): void {
    const col = this.store.getCollections().find(c => c.id === this.collId);
    if (!col) {return;}
    this.panel.webview.postMessage({
      type: 'update',
      payload: {
        environments: col.environments,
        activeEnvironmentId: col.activeEnvironmentId,
      },
    });
  }

  private handleMessage(msg: { type: string; payload: unknown }): void {
    switch (msg.type) {
      case 'ready':
        this.sendUpdate();
        break;
      case 'createEnv':
        this.handleCreateEnv();
        break;
      case 'renameEnv':
        this.handleRenameEnv((msg.payload as { envId: string }).envId);
        break;
      case 'deleteEnv':
        this.handleDeleteEnv((msg.payload as { envId: string }).envId);
        break;
      case 'activateEnv':
        this.store.switchEnvironment(this.collId, (msg.payload as { envId: string }).envId);
        this.sendUpdate();
        break;
      case 'updateVars': {
        const { envId, vars } = msg.payload as { envId: string; vars: Record<string, string> };
        this.store.updateEnvironmentVariables(this.collId, envId, vars);
        break;
      }
    }
  }

  private async handleCreateEnv(): Promise<void> {
    const name = await vscode.window.showInputBox({
      prompt: '새 환경 이름 (예: dev, staging, prod)',
    });
    if (!name?.trim()) {return;}
    this.store.createEnvironment(this.collId, name.trim());
    this.sendUpdate();
  }

  private async handleRenameEnv(envId: string): Promise<void> {
    const col = this.store.getCollections().find(c => c.id === this.collId);
    const env = col?.environments.find(e => e.id === envId);
    if (!env) {return;}
    const name = await vscode.window.showInputBox({ prompt: '환경 이름 변경', value: env.name });
    if (!name?.trim() || name.trim() === env.name) {return;}
    this.store.renameEnvironment(this.collId, envId, name.trim());
    this.sendUpdate();
  }

  private async handleDeleteEnv(envId: string): Promise<void> {
    const col = this.store.getCollections().find(c => c.id === this.collId);
    const env = col?.environments.find(e => e.id === envId);
    if (!env) {return;}
    const confirmed = await vscode.window.showWarningMessage(
      `"${env.name}" 환경을 삭제하시겠습니까?`,
      { modal: true },
      '삭제',
    );
    if (confirmed !== '삭제') {return;}
    this.store.deleteEnvironment(this.collId, envId);
    this.sendUpdate();
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
