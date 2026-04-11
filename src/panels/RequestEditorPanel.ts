import * as vscode from 'vscode';
import { sendHttpRequest, type HttpRequestOptions } from '../protocols/http/client';

interface SendRequestPayload extends HttpRequestOptions {
  // same shape as HttpRequestOptions
}

export class RequestEditorPanel {
  private abortController: AbortController | null = null;

  private constructor(private readonly panel: vscode.WebviewPanel) {
    panel.webview.html = buildWebviewHtml();
  }

  static create(context: vscode.ExtensionContext): void {
    const panel = vscode.window.createWebviewPanel(
      'protokit.requestEditor',
      '새 요청',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );
    const editor = new RequestEditorPanel(panel);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string; payload: unknown }) => editor.handleMessage(msg),
      null,
      context.subscriptions,
    );
  }

  private handleMessage(msg: { type: string; payload: unknown }): void {
    switch (msg.type) {
      case 'sendRequest':
        this.executeSend(msg.payload as SendRequestPayload);
        break;
      case 'cancelRequest':
        this.abortController?.abort();
        break;
    }
  }

  private async executeSend(payload: SendRequestPayload): Promise<void> {
    this.abortController?.abort();
    this.abortController = new AbortController();
    try {
      const response = await sendHttpRequest(payload, this.abortController.signal);
      this.panel.webview.postMessage({ type: 'response', payload: response });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!this.abortController.signal.aborted) {
        this.panel.webview.postMessage({ type: 'requestError', payload: { message } });
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

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--vscode-font-family);
  font-size: var(--vscode-font-size);
  color: var(--vscode-editor-foreground);
  background: var(--vscode-editor-background);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-scroll {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.request-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}

.method-select {
  appearance: none;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  min-width: 80px;
  text-align: center;
  outline: none;
}
.method-select:focus {
  border-color: var(--vscode-focusBorder);
}
.method-select.GET    { color: #61affe; }
.method-select.POST   { color: #49cc90; }
.method-select.PUT    { color: #fca130; }
.method-select.DELETE { color: #f93e3e; }
.method-select.PATCH  { color: #50e3c2; }

.url-input {
  flex: 1;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 13px;
  outline: none;
}
.url-input:focus {
  border-color: var(--vscode-focusBorder);
}
.url-input::placeholder {
  color: var(--vscode-input-placeholderForeground);
}

.send-btn {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 3px;
  padding: 5px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.send-btn:hover {
  background: var(--vscode-button-hoverBackground);
}

.tab-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--vscode-panel-border);
  padding: 0 12px;
  flex-shrink: 0;
}

.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--vscode-tab-inactiveForeground, var(--vscode-foreground));
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: -1px;
  white-space: nowrap;
}
.tab-btn:hover {
  color: var(--vscode-tab-activeForeground, var(--vscode-foreground));
}
.tab-btn.active {
  color: var(--vscode-tab-activeForeground, var(--vscode-foreground));
  border-bottom-color: var(--vscode-focusBorder, #007acc);
}

.badge {
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
  border-radius: 10px;
  padding: 0 6px;
  font-size: 10px;
  line-height: 16px;
  display: none;
}
.badge.visible {
  display: inline-block;
}

.tab-content {
  display: flex;
  flex-direction: column;
  min-height: 220px;
}

.tab-pane {
  display: flex;
  flex-direction: column;
  min-height: 220px;
}
.tab-pane[hidden] { display: none; }

.kv-table-container {
  flex: 1;
  overflow: auto;
}

table.kv-table {
  width: 100%;
  border-collapse: collapse;
}
table.kv-table thead th {
  text-align: left;
  padding: 6px 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vscode-descriptionForeground);
  border-bottom: 1px solid var(--vscode-panel-border);
  position: sticky;
  top: 0;
  background: var(--vscode-editor-background);
}
table.kv-table thead th:first-child { width: 32px; }
table.kv-table thead th:last-child  { width: 36px; }
table.kv-table tbody tr:hover td {
  background: var(--vscode-list-hoverBackground);
}
table.kv-table tbody td {
  padding: 3px 4px;
  vertical-align: middle;
}
table.kv-table tbody td:first-child { text-align: center; padding: 3px 6px; }
table.kv-table tbody td:last-child  { text-align: center; }

.kv-table tbody tr.managed-row td:nth-child(2) input {
  color: var(--vscode-descriptionForeground);
}
.managed-tag {
  font-size: 10px;
  color: var(--vscode-descriptionForeground);
  background: var(--vscode-badge-background);
  border-radius: 3px;
  padding: 1px 5px;
}

.kv-input {
  width: 100%;
  background: transparent;
  color: var(--vscode-input-foreground);
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 3px 6px;
  font-size: 12px;
  outline: none;
}
.kv-input:focus {
  background: var(--vscode-input-background);
  border-color: var(--vscode-focusBorder);
}
.kv-input:disabled {
  color: var(--vscode-disabledForeground);
  cursor: default;
}
.kv-input::placeholder {
  color: var(--vscode-input-placeholderForeground);
}

.kv-checkbox {
  cursor: pointer;
  accent-color: var(--vscode-focusBorder);
}

.del-btn {
  background: none;
  border: none;
  color: var(--vscode-descriptionForeground);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 2px;
}
.del-btn:hover {
  color: var(--vscode-errorForeground);
  background: var(--vscode-inputValidation-errorBackground);
}
.del-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.tab-bar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.tab-action-btn {
  display: none;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--vscode-icon-foreground);
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 3px;
  white-space: nowrap;
}
.tab-action-btn.visible {
  display: flex;
}
.tab-action-btn:hover {
  background: var(--vscode-toolbar-hoverBackground);
  color: var(--vscode-editor-foreground);
}
.tab-action-btn .plus {
  font-size: 16px;
  line-height: 1;
  font-weight: 300;
}

/* Body tab */
.body-type-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  flex-wrap: wrap;
}
.body-type-label {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 4px;
}
.body-type-bar label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  cursor: pointer;
  color: var(--vscode-editor-foreground);
}
.body-type-bar input[type="radio"] {
  cursor: pointer;
  accent-color: var(--vscode-focusBorder);
}

.body-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.body-editor[hidden] { display: none; }

.body-none-hint {
  padding: 20px 12px;
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}

.body-json-editor {
  flex: 1;
  width: 100%;
  background: var(--vscode-editor-background);
  color: var(--vscode-editor-foreground);
  border: none;
  resize: none;
  padding: 12px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: var(--vscode-editor-font-size, 13px);
  outline: none;
  line-height: 1.5;
}
.body-json-editor::placeholder {
  color: var(--vscode-input-placeholderForeground);
}

/* Auth tab */
.auth-form {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.auth-field {
  display: flex;
  align-items: center;
  gap: 10px;
}
.auth-field label {
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
  min-width: 60px;
}
.auth-select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  min-width: 160px;
}
.auth-select:focus {
  border-color: var(--vscode-focusBorder);
}
.auth-token-input {
  flex: 1;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 4px 10px;
  font-size: 12px;
  font-family: var(--vscode-editor-font-family, monospace);
  outline: none;
  max-width: 480px;
}
.auth-token-input:focus {
  border-color: var(--vscode-focusBorder);
}
.auth-token-input::placeholder {
  color: var(--vscode-input-placeholderForeground);
}
.auth-hint {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  padding-left: 70px;
}

.auth-none-hint {
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}

/* ── Settings bar ──────────────────────────────────────────── */
.settings-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  background: var(--vscode-sideBar-background, var(--vscode-editor-background));
  flex-shrink: 0;
  flex-wrap: wrap;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  cursor: default;
  white-space: nowrap;
}

.setting-number {
  width: 48px;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 2px;
  padding: 1px 4px;
  font-size: 11px;
  text-align: center;
  outline: none;
}
.setting-number:focus { border-color: var(--vscode-focusBorder); }

.setting-text {
  width: 160px;
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 2px;
  padding: 1px 6px;
  font-size: 11px;
  font-family: var(--vscode-editor-font-family, monospace);
  outline: none;
}
.setting-text:focus { border-color: var(--vscode-focusBorder); }
.setting-text::placeholder { color: var(--vscode-input-placeholderForeground); }

.setting-checkbox {
  cursor: pointer;
  user-select: none;
}
.setting-checkbox input { cursor: pointer; accent-color: var(--vscode-focusBorder); }

.setting-sep {
  width: 1px;
  height: 12px;
  background: var(--vscode-panel-border);
}

/* ── Cancel button ─────────────────────────────────────────── */
.cancel-btn {
  background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
  color: var(--vscode-errorForeground, #f48771);
  border: 1px solid var(--vscode-inputValidation-errorBorder, #be1100);
  border-radius: 3px;
  padding: 5px 14px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}
.cancel-btn:hover { opacity: 0.9; }

/* ── Main scroll area ──────────────────────────────────────── */
.main-scroll {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

/* ── Response area ─────────────────────────────────────────── */
.response-area {
  border-top: 2px solid var(--vscode-panel-border);
  display: flex;
  flex-direction: column;
  min-height: 220px;
}

.response-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  background: var(--vscode-editor-background);
}

.response-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vscode-descriptionForeground);
  font-weight: 600;
}

.res-status {
  font-size: 13px;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 3px;
}
.res-status.s2xx { color: #49cc90; background: rgba(73,204,144,.12); }
.res-status.s3xx { color: #61affe; background: rgba(97,175,254,.12); }
.res-status.s4xx { color: #fca130; background: rgba(252,161,48,.12); }
.res-status.s5xx { color: #f93e3e; background: rgba(249,62,62,.12); }
.res-status.serr { color: var(--vscode-errorForeground); }

.res-meta-item {
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
}
.res-meta-item span {
  color: var(--vscode-editor-foreground);
  font-weight: 500;
}

.redirect-chain {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-wrap: wrap;
  flex-shrink: 0;
}
.redirect-chain-label { font-weight: 600; }
.redirect-hop {
  display: flex;
  align-items: center;
  gap: 4px;
}
.redirect-hop .hop-status {
  color: #61affe;
  font-weight: 600;
}
.redirect-hop .hop-arrow { color: var(--vscode-descriptionForeground); }
.redirect-hop .hop-url {
  color: var(--vscode-textLink-foreground);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.response-body-pre {
  flex: 1;
  margin: 0;
  padding: 12px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: var(--vscode-editor-font-size, 13px);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vscode-editor-foreground);
  overflow: auto;
}
`;

const HTML = `
<div class="request-bar">
  <select class="method-select GET" id="method-select">
    <option>GET</option>
    <option>POST</option>
    <option>PUT</option>
    <option>DELETE</option>
    <option>PATCH</option>
  </select>
  <input type="text" class="url-input" id="url-input" placeholder="https://example.com/api/..." />
  <button class="send-btn" id="send-btn">전송</button>
  <button class="cancel-btn" id="cancel-btn" hidden>취소</button>
</div>

<div class="settings-bar">
  <label class="setting-item">
    Timeout
    <input type="number" class="setting-number" id="timeout-input" value="30" min="1" max="300">
    초
  </label>
  <div class="setting-sep"></div>
  <label class="setting-item setting-checkbox">
    <input type="checkbox" id="ssl-ignore">
    SSL 검증 무시
  </label>
  <div class="setting-sep"></div>
  <label class="setting-item">
    Proxy HTTP
    <input type="text" class="setting-text" id="proxy-http" placeholder="http://host:port">
  </label>
  <label class="setting-item">
    HTTPS
    <input type="text" class="setting-text" id="proxy-https" placeholder="http://host:port">
  </label>
</div>

<div class="main-scroll">
<div class="tab-bar">
  <button class="tab-btn active" data-tab="params">
    Params <span class="badge" id="badge-params"></span>
  </button>
  <button class="tab-btn" data-tab="headers">
    Headers <span class="badge" id="badge-headers"></span>
  </button>
  <button class="tab-btn" data-tab="body">
    Body <span class="badge" id="badge-body"></span>
  </button>
  <button class="tab-btn" data-tab="auth">
    Auth <span class="badge" id="badge-auth"></span>
  </button>
  <div class="tab-bar-actions">
    <button class="tab-action-btn visible" id="add-param"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-header"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-body-field"><span class="plus">+</span> 추가</button>
  </div>
</div>

<div class="tab-content">
  <!-- Params -->
  <div class="tab-pane" id="tab-params">
    <div class="kv-table-container">
      <table class="kv-table">
        <thead>
          <tr><th></th><th>Key</th><th>Value</th><th></th></tr>
        </thead>
        <tbody id="params-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Headers -->
  <div class="tab-pane" id="tab-headers" hidden>
    <div class="kv-table-container">
      <table class="kv-table">
        <thead>
          <tr><th></th><th>Key</th><th>Value</th><th></th></tr>
        </thead>
        <tbody id="headers-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Body -->
  <div class="tab-pane" id="tab-body" hidden>
    <div class="body-type-bar">
      <span class="body-type-label">타입</span>
      <label><input type="radio" name="body-type" value="none" checked> None</label>
      <label><input type="radio" name="body-type" value="json"> raw (JSON)</label>
      <label><input type="radio" name="body-type" value="form-data"> form-data</label>
      <label><input type="radio" name="body-type" value="urlencoded"> x-www-form-urlencoded</label>
    </div>

    <div class="body-editor" id="body-none">
      <p class="body-none-hint">이 요청에는 Body가 없습니다.</p>
    </div>

    <div class="body-editor" id="body-json" hidden>
      <textarea class="body-json-editor" id="body-json-textarea" placeholder='{\n  "key": "value"\n}'></textarea>
    </div>

    <div class="body-editor" id="body-form-data" hidden>
      <div class="kv-table-container">
        <table class="kv-table">
          <thead>
            <tr><th></th><th>Key</th><th>Value</th><th></th></tr>
          </thead>
          <tbody id="formdata-tbody"></tbody>
        </table>
      </div>
    </div>

    <div class="body-editor" id="body-urlencoded" hidden>
      <div class="kv-table-container">
        <table class="kv-table">
          <thead>
            <tr><th></th><th>Key</th><th>Value</th><th></th></tr>
          </thead>
          <tbody id="urlencoded-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Auth -->
  <div class="tab-pane" id="tab-auth" hidden>
    <div class="auth-form">
      <div class="auth-field">
        <label for="auth-type-select">유형</label>
        <select class="auth-select" id="auth-type-select">
          <option value="none">없음</option>
          <option value="bearer">Bearer Token</option>
        </select>
      </div>
      <div id="auth-bearer-section" hidden>
        <div class="auth-field">
          <label for="auth-token-input">Token</label>
          <input type="text" class="auth-token-input" id="auth-token-input" placeholder="토큰을 입력하세요..." />
        </div>
        <p class="auth-hint">Authorization: Bearer &lt;token&gt; 헤더가 자동으로 추가됩니다.</p>
      </div>
      <p class="auth-none-hint" id="auth-none-hint">인증 없음. 유형을 선택하세요.</p>
    </div>
  </div>
</div>

<div class="response-area" id="response-area" hidden>
  <div class="response-header">
    <span class="response-title">응답</span>
    <span class="res-status" id="res-status"></span>
    <span class="res-meta-item" id="res-time"></span>
    <span class="res-meta-item" id="res-size"></span>
  </div>
  <div class="redirect-chain" id="redirect-chain" hidden></div>
  <pre class="response-body-pre" id="response-body-pre"></pre>
</div>
</div>
`;

const JS = `
const vscode = acquireVsCodeApi();

const settings = {
  timeout: 30,
  sslIgnore: false,
  proxyHttp: '',
  proxyHttps: '',
};

document.getElementById('timeout-input').addEventListener('input', e => {
  settings.timeout = parseInt(e.target.value) || 30;
});
document.getElementById('ssl-ignore').addEventListener('change', e => {
  settings.sslIgnore = e.target.checked;
});
document.getElementById('proxy-http').addEventListener('input', e => {
  settings.proxyHttp = e.target.value.trim();
});
document.getElementById('proxy-https').addEventListener('input', e => {
  settings.proxyHttps = e.target.value.trim();
});

const state = {
  method: 'GET',
  url: '',
  params: [],
  headers: [],
  body: {
    type: 'none',
    json: '',
    formData: [],
    urlEncoded: [],
  },
  auth: {
    type: 'none',
    token: '',
  },
  _nextId: 1,
};

function nextId() {
  return state._nextId++;
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Tab switching ─────────────────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.hidden = pane.id !== 'tab-' + tab;
  });

  document.getElementById('add-param').classList.toggle('visible', tab === 'params');
  document.getElementById('add-header').classList.toggle('visible', tab === 'headers');
  const bodyType = state.body.type;
  document.getElementById('add-body-field').classList.toggle(
    'visible',
    tab === 'body' && (bodyType === 'form-data' || bodyType === 'urlencoded')
  );
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* ── Method select ─────────────────────────────────────────── */
const methodSelect = document.getElementById('method-select');
methodSelect.addEventListener('change', () => {
  state.method = methodSelect.value;
  methodSelect.className = 'method-select ' + state.method;
});

/* ── URL input ─────────────────────────────────────────────── */
document.getElementById('url-input').addEventListener('input', e => {
  state.url = e.target.value;
});

/* ── Send button (placeholder) ─────────────────────────────── */
document.getElementById('send-btn').addEventListener('click', () => {
  // Phase 1 요청 전송 - 다음 단계에서 구현
});

/* ── Badge 업데이트 ────────────────────────────────────────── */
function updateBadges() {
  const activeParams = state.params.filter(p => p.enabled && (p.key || p.value));
  const userHeaders = state.headers.filter(h => !h.managed && h.enabled && (h.key || h.value));
  const managedHeaders = state.headers.filter(h => h.managed && h.enabled);

  setBadge('params', activeParams.length);
  setBadge('headers', userHeaders.length + managedHeaders.length);
  setBadge('body', state.body.type !== 'none' ? 1 : 0);
  setBadge('auth', state.auth.type !== 'none' ? 1 : 0);
}

function setBadge(tab, count) {
  const el = document.getElementById('badge-' + tab);
  if (count > 0) {
    el.textContent = count;
    el.classList.add('visible');
  } else {
    el.classList.remove('visible');
  }
}

/* ── Key-Value 테이블 렌더링 ────────────────────────────────── */
function renderKVTable(tbodyId, items, onUpdate, onDelete) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = '';

  items.forEach(item => {
    const tr = document.createElement('tr');
    if (item.managed) tr.classList.add('managed-row');

    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'kv-checkbox';
    checkbox.checked = item.enabled;
    checkbox.addEventListener('change', () => {
      item.enabled = checkbox.checked;
      onUpdate();
    });
    tdCheck.appendChild(checkbox);

    const tdKey = document.createElement('td');
    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.className = 'kv-input';
    keyInput.placeholder = 'Key';
    keyInput.value = item.key;
    keyInput.disabled = !!item.managed;
    keyInput.addEventListener('input', () => {
      item.key = keyInput.value;
      onUpdate();
    });
    tdKey.appendChild(keyInput);

    const tdVal = document.createElement('td');
    const valInput = document.createElement('input');
    valInput.type = 'text';
    valInput.className = 'kv-input';
    valInput.placeholder = 'Value';
    valInput.value = item.value;
    valInput.addEventListener('input', () => {
      item.value = valInput.value;
      onUpdate();
    });
    tdVal.appendChild(valInput);

    const tdDel = document.createElement('td');
    if (item.managed) {
      const tag = document.createElement('span');
      tag.className = 'managed-tag';
      tag.textContent = '자동';
      tdDel.appendChild(tag);
    } else {
      const delBtn = document.createElement('button');
      delBtn.className = 'del-btn';
      delBtn.textContent = '×';
      delBtn.title = '삭제';
      delBtn.addEventListener('click', () => {
        const idx = items.indexOf(item);
        if (idx >= 0) items.splice(idx, 1);
        onDelete();
      });
      tdDel.appendChild(delBtn);
    }

    tr.append(tdCheck, tdKey, tdVal, tdDel);
    tbody.appendChild(tr);
  });
}

/* ── Params ────────────────────────────────────────────────── */
function renderParams() {
  renderKVTable('params-tbody', state.params, () => {
    renderParams();
    updateBadges();
  }, () => {
    renderParams();
    updateBadges();
  });
  updateBadges();
}

document.getElementById('add-param').addEventListener('click', () => {
  state.params.push({ id: nextId(), enabled: true, key: '', value: '', managed: null });
  renderParams();
});

/* ── Headers ───────────────────────────────────────────────── */
function renderHeaders() {
  renderKVTable('headers-tbody', state.headers, () => {
    renderHeaders();
    updateBadges();
  }, () => {
    renderHeaders();
    updateBadges();
  });
  updateBadges();
}

document.getElementById('add-header').addEventListener('click', () => {
  state.headers.push({ id: nextId(), enabled: true, key: '', value: '', managed: null });
  renderHeaders();
});

/* ── Content-Type 자동 관리 ─────────────────────────────────── */
const CONTENT_TYPE_MAP = {
  'json': 'application/json',
  'form-data': 'multipart/form-data',
  'urlencoded': 'application/x-www-form-urlencoded',
};

function updateContentTypeHeader(bodyType) {
  const idx = state.headers.findIndex(h => h.managed === 'content-type');

  if (bodyType === 'none') {
    if (idx >= 0) state.headers.splice(idx, 1);
  } else {
    const ctValue = CONTENT_TYPE_MAP[bodyType];
    if (idx >= 0) {
      state.headers[idx].value = ctValue;
    } else {
      state.headers.unshift({
        id: nextId(),
        enabled: true,
        key: 'Content-Type',
        value: ctValue,
        managed: 'content-type',
      });
    }
  }

  renderHeaders();
}

/* ── Authorization 자동 관리 ────────────────────────────────── */
function updateAuthorizationHeader(authType, token) {
  const idx = state.headers.findIndex(h => h.managed === 'authorization');

  if (authType === 'none' || !token.trim()) {
    if (idx >= 0) state.headers.splice(idx, 1);
  } else {
    const value = 'Bearer ' + token.trim();
    if (idx >= 0) {
      state.headers[idx].value = value;
    } else {
      const contentTypeIdx = state.headers.findIndex(h => h.managed === 'content-type');
      const insertAt = contentTypeIdx >= 0 ? contentTypeIdx + 1 : 0;
      state.headers.splice(insertAt, 0, {
        id: nextId(),
        enabled: true,
        key: 'Authorization',
        value,
        managed: 'authorization',
      });
    }
  }

  renderHeaders();
  updateBadges();
}

/* ── Body ──────────────────────────────────────────────────── */
function renderFormData() {
  renderKVTable('formdata-tbody', state.body.formData, () => {
    renderFormData();
    updateBadges();
  }, () => {
    renderFormData();
    updateBadges();
  });
}

function renderUrlEncoded() {
  renderKVTable('urlencoded-tbody', state.body.urlEncoded, () => {
    renderUrlEncoded();
    updateBadges();
  }, () => {
    renderUrlEncoded();
    updateBadges();
  });
}

function switchBodyEditor(type) {
  document.getElementById('body-none').hidden       = type !== 'none';
  document.getElementById('body-json').hidden       = type !== 'json';
  document.getElementById('body-form-data').hidden  = type !== 'form-data';
  document.getElementById('body-urlencoded').hidden = type !== 'urlencoded';

  document.getElementById('add-body-field').classList.toggle(
    'visible',
    type === 'form-data' || type === 'urlencoded'
  );
}

document.querySelectorAll('input[name="body-type"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (!radio.checked) return;
    state.body.type = radio.value;
    switchBodyEditor(radio.value);
    updateContentTypeHeader(radio.value);
    updateBadges();
  });
});

document.getElementById('body-json-textarea').addEventListener('input', e => {
  state.body.json = e.target.value;
});

document.getElementById('add-body-field').addEventListener('click', () => {
  if (state.body.type === 'form-data') {
    state.body.formData.push({ id: nextId(), enabled: true, key: '', value: '', managed: null });
    renderFormData();
  } else if (state.body.type === 'urlencoded') {
    state.body.urlEncoded.push({ id: nextId(), enabled: true, key: '', value: '', managed: null });
    renderUrlEncoded();
  }
});

/* ── Auth ──────────────────────────────────────────────────── */
const authTypeSelect = document.getElementById('auth-type-select');
const authBearerSection = document.getElementById('auth-bearer-section');
const authNoneHint = document.getElementById('auth-none-hint');
const authTokenInput = document.getElementById('auth-token-input');

authTypeSelect.addEventListener('change', () => {
  const type = authTypeSelect.value;
  state.auth.type = type;
  authBearerSection.hidden = type !== 'bearer';
  authNoneHint.hidden = type !== 'none';
  updateAuthorizationHeader(type, state.auth.token);
  updateBadges();
});

authTokenInput.addEventListener('input', () => {
  state.auth.token = authTokenInput.value;
  updateAuthorizationHeader(state.auth.type, state.auth.token);
});

/* ── 초기화 ────────────────────────────────────────────────── */
renderParams();
renderHeaders();
renderFormData();
renderUrlEncoded();
updateBadges();

/* ── 요청 전송 ─────────────────────────────────────────────── */
function buildUrl() {
  const base = state.url.trim();
  if (!base) return '';
  const enabled = state.params.filter(p => p.enabled && p.key.trim());
  if (!enabled.length) return base;
  const qs = enabled.map(p =>
    encodeURIComponent(p.key.trim()) + '=' + encodeURIComponent(p.value)
  ).join('&');
  return base + (base.includes('?') ? '&' : '?') + qs;
}

function collectHeaders() {
  const result = {};
  state.headers.forEach(h => {
    if (h.enabled && h.key.trim()) {
      result[h.key.trim()] = h.value;
    }
  });
  return result;
}

function collectBody() {
  switch (state.body.type) {
    case 'json':
      return { body: state.body.json.trim() || undefined, contentType: null };

    case 'urlencoded': {
      const items = state.body.urlEncoded.filter(f => f.enabled && f.key.trim());
      const body = items.map(f =>
        encodeURIComponent(f.key.trim()) + '=' + encodeURIComponent(f.value)
      ).join('&');
      return { body: body || undefined, contentType: null };
    }

    case 'form-data': {
      const items = state.body.formData.filter(f => f.enabled && f.key.trim());
      const boundary = '----ProtoKitBoundary' + Date.now().toString(16);
      const body = items.map(f =>
        '--' + boundary + '\\r\\n' +
        'Content-Disposition: form-data; name="' + f.key.trim() + '"\\r\\n\\r\\n' +
        f.value + '\\r\\n'
      ).join('') + '--' + boundary + '--\\r\\n';
      const contentType = 'multipart/form-data; boundary=' + boundary;
      return { body: items.length ? body : undefined, contentType };
    }

    default:
      return { body: undefined, contentType: null };
  }
}

function setSending(sending) {
  const sendBtn = document.getElementById('send-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  sendBtn.disabled = sending;
  sendBtn.textContent = sending ? '전송 중...' : '전송';
  cancelBtn.hidden = !sending;
}

function sendRequest() {
  const url = buildUrl();
  if (!url) {
    document.getElementById('url-input').focus();
    return;
  }

  const { body, contentType } = collectBody();
  const headers = collectHeaders();
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  setSending(true);

  vscode.postMessage({
    type: 'sendRequest',
    payload: {
      method: state.method,
      url,
      headers,
      body,
      timeout: settings.timeout,
      sslIgnore: settings.sslIgnore,
      proxyHttp: settings.proxyHttp || undefined,
      proxyHttps: settings.proxyHttps || undefined,
    },
  });
}

function cancelRequest() {
  vscode.postMessage({ type: 'cancelRequest' });
  setSending(false);
}

document.getElementById('send-btn').addEventListener('click', sendRequest);
document.getElementById('cancel-btn').addEventListener('click', cancelRequest);

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    sendRequest();
  }
});

/* ── 응답 처리 ─────────────────────────────────────────────── */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function statusClass(code) {
  if (code >= 500) return 's5xx';
  if (code >= 400) return 's4xx';
  if (code >= 300) return 's3xx';
  if (code >= 200) return 's2xx';
  return '';
}

function showResponse(res) {
  setSending(false);

  const area = document.getElementById('response-area');
  area.hidden = false;

  const statusEl = document.getElementById('res-status');
  statusEl.textContent = res.status + ' ' + res.statusText;
  statusEl.className = 'res-status ' + statusClass(res.status);

  const timeEl = document.getElementById('res-time');
  timeEl.innerHTML = '<span>' + res.duration + ' ms</span>';

  const sizeEl = document.getElementById('res-size');
  sizeEl.innerHTML = '<span>' + formatSize(res.size) + '</span>';

  const chainEl = document.getElementById('redirect-chain');
  if (res.redirectChain && res.redirectChain.length) {
    chainEl.hidden = false;
    chainEl.innerHTML =
      '<span class="redirect-chain-label">리다이렉트</span>' +
      res.redirectChain.map((r, i) =>
        '<span class="redirect-hop">' +
        (i > 0 ? '<span class="hop-arrow">→</span>' : '') +
        '<span class="hop-status">' + r.status + '</span>' +
        '<span class="hop-arrow">→</span>' +
        '<span class="hop-url" title="' + escHtml(r.location) + '">' + escHtml(r.location) + '</span>' +
        '</span>'
      ).join('');
  } else {
    chainEl.hidden = true;
  }

  const bodyEl = document.getElementById('response-body-pre');
  let bodyText = res.body;
  const ct = (res.headers && res.headers['content-type']) || '';
  if (ct.includes('application/json') || (bodyText.trimStart().startsWith('{') || bodyText.trimStart().startsWith('['))) {
    try { bodyText = JSON.stringify(JSON.parse(bodyText), null, 2); } catch { /* keep */ }
  }
  bodyEl.textContent = bodyText;
}

function showError(message) {
  setSending(false);

  const area = document.getElementById('response-area');
  area.hidden = false;

  const statusEl = document.getElementById('res-status');
  statusEl.textContent = '오류';
  statusEl.className = 'res-status serr';

  document.getElementById('res-time').innerHTML = '';
  document.getElementById('res-size').innerHTML = '';
  document.getElementById('redirect-chain').hidden = true;
  document.getElementById('response-body-pre').textContent = message;
}

window.addEventListener('message', event => {
  const msg = event.data;
  if (msg.type === 'response') {
    showResponse(msg.payload);
  } else if (msg.type === 'requestError') {
    showError(msg.payload.message);
  }
});
`;
