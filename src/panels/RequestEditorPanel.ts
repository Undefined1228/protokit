import * as vscode from 'vscode';
import { sendHttpRequest, type HttpRequestOptions } from '../protocols/http/client';
import type { ProtoKitStore, SavedRequest, Assertion } from '../storage/store';
import { CSS, HTML, JS } from './requestEditorWebview';
import { registerPanel } from './searchRegistry';

interface KVRow {
  enabled: boolean;
  key: string;
  value: string;
}

interface SendRequestPayload extends HttpRequestOptions {
  rawUrl?: string;
  params?: KVRow[];
  rawHeaders?: KVRow[];
  bodyType?: string;
  rawBody?: string;
  bodyFormData?: KVRow[];
  bodyUrlEncoded?: KVRow[];
  authType?: string;
  authToken?: string;
  authBasicUsername?: string;
  authBasicPassword?: string;
  authApiKeyKey?: string;
  authApiKeyValue?: string;
  authApiKeyIn?: string;
}

interface SaveRequestPayload {
  method: string;
  url: string;
  params: KVRow[];
  headers: KVRow[];
  bodyType: string;
  body: string;
  bodyFormData: KVRow[];
  bodyUrlEncoded: KVRow[];
  authType: string;
  authToken: string;
  authBasicUsername: string;
  authBasicPassword: string;
  authApiKeyKey: string;
  authApiKeyValue: string;
  authApiKeyIn: string;
  timeout?: number;
  sslIgnore?: boolean;
  assertions?: Assertion[];
}

export class RequestEditorPanel {
  private abortController: AbortController | null = null;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly context: vscode.ExtensionContext,
    private readonly initialRequest?: SavedRequest,
    private readonly initialCollId?: string,
  ) {
    panel.webview.html = buildWebviewHtml();
  }

  static create(
    context: vscode.ExtensionContext,
    store: ProtoKitStore,
    initialRequest?: SavedRequest,
    collId?: string,
  ): void {
    const title = initialRequest ? initialRequest.name : '새 요청';
    const panel = vscode.window.createWebviewPanel(
      'protokit.requestEditor',
      title,
      vscode.ViewColumn.Active,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    registerPanel(panel);
    const editor = new RequestEditorPanel(panel, store, context, initialRequest, collId);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => editor.handleMessage(msg),
      null,
      context.subscriptions,
    );
    store.onDidChange(() => editor.pushEnvVars(), context.subscriptions);
  }

  private getEnvVars(): Record<string, string> {
    if (this.initialCollId) {
      return this.store.getActiveEnvironmentVariables(this.initialCollId);
    }
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
      case 'sendRequest':
        this.executeSend(msg.payload as SendRequestPayload);
        break;
      case 'cancelRequest':
        this.abortController?.abort();
        break;
      case 'saveBody':
        this.saveBodyToFile(msg.payload as { body: string; mimeType: string });
        break;
      case 'saveRequest':
        this.handleSaveRequest(msg.payload as SaveRequestPayload);
        break;
      case 'ready':
        if (this.initialRequest) {
          this.panel.webview.postMessage({ type: 'loadRequest', payload: this.initialRequest });
        }
        this.pushEnvVars();
        break;
    }
  }

  private async handleSaveRequest(payload: SaveRequestPayload): Promise<void> {
    if (this.initialRequest && this.initialCollId) {
      const choice = await vscode.window.showQuickPick(
        [
          { label: '현재 요청 업데이트', value: 'update' },
          { label: '새 요청으로 저장', value: 'new' },
        ],
        { placeHolder: '저장 방식 선택' },
      );
      if (!choice) {return;}

      if (choice.value === 'update') {
        this.store.updateRequest(
          this.initialCollId,
          this.initialRequest.id,
          { name: this.initialRequest.name, ...payload },
        );
        vscode.window.showInformationMessage(`"${this.initialRequest.name}" 요청이 업데이트되었습니다.`);
        return;
      }
    }

    await this.saveAsNew(payload);
  }

  private async saveAsNew(payload: SaveRequestPayload): Promise<void> {
    let collections = this.store.getCollections();

    if (!collections.length) {
      const choice = await vscode.window.showWarningMessage(
        '컬렉션이 없습니다.',
        '새 컬렉션 만들기',
      );
      if (choice) {
        const name = await vscode.window.showInputBox({ prompt: '새 컬렉션 이름' });
        if (!name?.trim()) {return;}
        this.store.createCollection(name.trim());
        collections = this.store.getCollections();
      } else {
        return;
      }
    }

    const colPick = await vscode.window.showQuickPick(
      collections.map(c => ({ label: c.name, id: c.id })),
      { placeHolder: '저장할 컬렉션 선택' },
    );
    if (!colPick) {return;}

    const defaultName = payload.method + '  ' + (payload.url || '새 요청');
    const name = await vscode.window.showInputBox({ prompt: '요청 이름', value: defaultName });
    if (!name?.trim()) {return;}

    this.store.saveRequest(colPick.id, { name: name.trim(), ...payload });
    vscode.window.showInformationMessage(`"${name.trim()}" 요청이 저장되었습니다.`);
  }

  private async saveBodyToFile(payload: { body: string; mimeType: string }): Promise<void> {
    const ext = (payload.mimeType ?? '').includes('json') ? 'json' : 'txt';
    const defaultUri = vscode.Uri.joinPath(
      vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file('/'),
      `response.${ext}`,
    );
    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: { 'JSON': ['json'], 'Text': ['txt'], 'All Files': ['*'] },
    });
    if (!uri) {return;}
    await vscode.workspace.fs.writeFile(uri, Buffer.from(payload.body, 'utf-8'));
  }

  private substituteVars(str: string, vars: Record<string, string>): string {
    return str.replace(/\{\{([^}]+)\}\}/g, (_, name: string) => {
      const key = name.trim();
      return key in vars ? vars[key] : `{{${name}}}`;
    });
  }

  private applyAuth(
    headers: Record<string, string>,
    queryParams: Record<string, string>,
    payload: SendRequestPayload,
    sub: (s: string) => string,
  ): void {
    const authType = payload.authType ?? 'none';
    if (authType === 'basic') {
      const username = sub(payload.authBasicUsername ?? '');
      const password = sub(payload.authBasicPassword ?? '');
      const encoded = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${encoded}`;
    } else if (authType === 'apikey') {
      const key = sub(payload.authApiKeyKey ?? '');
      const value = sub(payload.authApiKeyValue ?? '');
      if (key) {
        if (payload.authApiKeyIn === 'query') {
          queryParams[key] = value;
        } else {
          headers[key] = value;
        }
      }
    }
  }

  private async executeSend(payload: SendRequestPayload): Promise<void> {
    this.abortController?.abort();
    this.abortController = new AbortController();

    const envVars = this.getEnvVars();
    const sub = (s: string) => this.substituteVars(s, envVars);

    const substitutedHeaders: Record<string, string> = Object.fromEntries(
      Object.entries(payload.headers).map(([k, v]) => [sub(k), sub(v)]),
    );
    const extraQueryParams: Record<string, string> = {};
    this.applyAuth(substitutedHeaders, extraQueryParams, payload, sub);

    let substitutedUrl = sub(payload.url);
    if (Object.keys(extraQueryParams).length > 0) {
      const urlObj = new URL(substitutedUrl.startsWith('http') ? substitutedUrl : 'http://placeholder' + substitutedUrl);
      for (const [k, v] of Object.entries(extraQueryParams)) {
        urlObj.searchParams.set(k, v);
      }
      substitutedUrl = substitutedUrl.startsWith('http')
        ? urlObj.toString()
        : urlObj.pathname + urlObj.search;
    }

    const substitutedPayload: HttpRequestOptions = {
      ...payload,
      url: substitutedUrl,
      headers: substitutedHeaders,
      body: payload.body ? sub(payload.body) : payload.body,
    };

    const historyBase = {
      method: payload.method,
      url: payload.rawUrl ?? payload.url,
      params: payload.params ?? [],
      headers: payload.rawHeaders ?? [],
      bodyType: payload.bodyType ?? 'none',
      body: payload.rawBody ?? '',
      bodyFormData: payload.bodyFormData ?? [],
      bodyUrlEncoded: payload.bodyUrlEncoded ?? [],
      authType: payload.authType ?? 'none',
      authToken: payload.authToken ?? '',
      authBasicUsername: payload.authBasicUsername ?? '',
      authBasicPassword: payload.authBasicPassword ?? '',
      authApiKeyKey: payload.authApiKeyKey ?? '',
      authApiKeyValue: payload.authApiKeyValue ?? '',
      authApiKeyIn: payload.authApiKeyIn ?? 'header',
    };

    try {
      const response = await sendHttpRequest(substitutedPayload, this.abortController.signal);
      this.panel.webview.postMessage({ type: 'response', payload: response });
      this.store.addHistory({ ...historyBase, status: response.status, duration: response.duration });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!this.abortController.signal.aborted) {
        this.panel.webview.postMessage({ type: 'requestError', payload: { message } });
        this.store.addHistory(historyBase);
      }
    }
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

