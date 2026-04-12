import * as vscode from 'vscode';
import { sendHttpRequest } from '../protocols/http/client';
import type { ProtoKitStore, SavedRequest, Assertion } from '../storage/store';

interface AssertionResult {
  pass: boolean;
  actual: string;
  description: string;
}

interface RequestRunResult {
  index: number;
  name: string;
  method: string;
  url: string;
  status?: number;
  statusText?: string;
  duration?: number;
  size?: number;
  error?: string;
  assertionResults: AssertionResult[];
}

function getPath(obj: unknown, path: string): unknown {
  if (obj === null || obj === undefined || !path) return undefined;
  return path.split('.').reduce((o: unknown, k) => {
    if (o && typeof o === 'object' && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

function compareNum(actual: number, op: string, expected: number): boolean {
  switch (op) {
    case '===': return actual === expected;
    case '!==': return actual !== expected;
    case '<':   return actual < expected;
    case '<=':  return actual <= expected;
    case '>':   return actual > expected;
    case '>=':  return actual >= expected;
    default:    return false;
  }
}

function compareStr(actual: string, op: string, expected: string): boolean {
  switch (op) {
    case '===': return actual === expected;
    case '!==': return actual !== expected;
    default:    return false;
  }
}

function evaluateAssertions(
  assertions: Assertion[],
  res: { status: number; duration: number; body: string },
): AssertionResult[] {
  let parsedBody: unknown = null;
  try { parsedBody = JSON.parse(res.body); } catch { /* ignore */ }

  return assertions.filter(a => a.enabled).map(a => {
    let pass = false;
    let actual = '';
    let description = '';

    if (a.type === 'status') {
      const expected = Number(a.value);
      actual = String(res.status);
      pass = compareNum(res.status, a.operator, expected);
      description = 'Status ' + a.operator + ' ' + a.value;
    } else if (a.type === 'body_exists') {
      const val = getPath(parsedBody, a.target);
      actual = val === undefined ? 'undefined' : JSON.stringify(val);
      pass = val !== undefined && val !== null;
      description = 'body.' + a.target + ' exists';
    } else if (a.type === 'body_eq') {
      const val = getPath(parsedBody, a.target);
      actual = val === undefined ? 'undefined' : String(val);
      pass = compareStr(val !== undefined ? String(val) : '', a.operator, a.value);
      description = 'body.' + a.target + ' ' + a.operator + ' "' + a.value + '"';
    } else if (a.type === 'duration') {
      const expected = Number(a.value);
      actual = String(res.duration) + 'ms';
      pass = compareNum(res.duration, a.operator, expected);
      description = '응답 시간 ' + a.operator + ' ' + a.value + 'ms';
    }

    return { pass, actual, description };
  });
}

export class CollectionRunnerPanel {
  private abortController: AbortController | null = null;

  private constructor(
    private readonly panel: vscode.WebviewPanel,
    private readonly store: ProtoKitStore,
    private readonly projectId: string,
    private readonly collId: string,
  ) {
    panel.webview.html = buildRunnerHtml();
  }

  static create(
    context: vscode.ExtensionContext,
    store: ProtoKitStore,
    projectId: string,
    collId: string,
  ): void {
    const project = store.getProjects().find(p => p.id === projectId);
    const collection = project?.collections.find(c => c.id === collId);
    if (!collection) {
      vscode.window.showWarningMessage('컬렉션을 찾을 수 없습니다.');
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'protokit.collectionRunner',
      'Runner: ' + collection.name,
      vscode.ViewColumn.Active,
      { enableScripts: true },
    );

    const runner = new CollectionRunnerPanel(panel, store, projectId, collId);
    panel.webview.onDidReceiveMessage(
      (msg: { type: string }) => runner.handleMessage(msg),
      null,
      context.subscriptions,
    );
  }

  private handleMessage(msg: { type: string }): void {
    switch (msg.type) {
      case 'ready':
        this.sendCollectionInfo();
        break;
      case 'startRun':
        this.runCollection();
        break;
      case 'cancelRun':
        this.abortController?.abort();
        break;
      case 'exportResults':
        this.exportResults((msg as unknown as { type: string; payload: RequestRunResult[] }).payload);
        break;
    }
  }

  private sendCollectionInfo(): void {
    const project = this.store.getProjects().find(p => p.id === this.projectId);
    const collection = project?.collections.find(c => c.id === this.collId);
    if (!collection) return;

    this.panel.webview.postMessage({
      type: 'collectionInfo',
      payload: {
        name: collection.name,
        requests: collection.requests.map((r, i) => ({
          index: i,
          name: r.name,
          method: r.method,
          url: r.url,
          assertionCount: (r.assertions ?? []).filter(a => a.enabled).length,
        })),
      },
    });
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
    req: SavedRequest,
    sub: (s: string) => string,
  ): void {
    const authType = req.authType ?? 'none';
    if (authType === 'bearer') {
      const token = sub(req.authToken ?? '');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    } else if (authType === 'basic') {
      const username = sub(req.authBasicUsername ?? '');
      const password = sub(req.authBasicPassword ?? '');
      headers['Authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    } else if (authType === 'apikey') {
      const key = sub(req.authApiKeyKey ?? '');
      const value = sub(req.authApiKeyValue ?? '');
      if (key) {
        if (req.authApiKeyIn === 'query') queryParams[key] = value;
        else headers[key] = value;
      }
    }
  }

  private async runCollection(): Promise<void> {
    const project = this.store.getProjects().find(p => p.id === this.projectId);
    const collection = project?.collections.find(c => c.id === this.collId);
    if (!collection || !collection.requests.length) return;

    const envVars = this.store.getActiveEnvironmentVariables();
    const sub = (s: string) => this.substituteVars(s, envVars);

    this.abortController = new AbortController();
    const results: RequestRunResult[] = [];

    for (let i = 0; i < collection.requests.length; i++) {
      if (this.abortController.signal.aborted) break;

      const req = collection.requests[i];
      this.panel.webview.postMessage({ type: 'requestStart', payload: { index: i } });

      const headers: Record<string, string> = {};
      for (const h of req.headers ?? []) {
        if (h.enabled && h.key.trim()) headers[sub(h.key.trim())] = sub(h.value);
      }
      if (req.bodyType === 'json') headers['Content-Type'] = 'application/json';
      else if (req.bodyType === 'urlencoded') headers['Content-Type'] = 'application/x-www-form-urlencoded';

      const queryParams: Record<string, string> = {};
      this.applyAuth(headers, queryParams, req, sub);

      for (const p of (req.params ?? []).filter(p => p.enabled && p.key.trim())) {
        queryParams[sub(p.key.trim())] = sub(p.value);
      }

      let url = sub(req.url);
      if (Object.keys(queryParams).length > 0) {
        try {
          const urlObj = new URL(url.startsWith('http') ? url : 'http://placeholder' + url);
          for (const [k, v] of Object.entries(queryParams)) urlObj.searchParams.set(k, v);
          url = url.startsWith('http') ? urlObj.toString() : urlObj.pathname + urlObj.search;
        } catch { /* ignore */ }
      }

      let body: string | undefined;
      if (req.bodyType === 'json') {
        body = req.body ? sub(req.body) : undefined;
      } else if (req.bodyType === 'urlencoded') {
        const items = (req.bodyUrlEncoded ?? []).filter(f => f.enabled && f.key.trim());
        body = items.map(f => encodeURIComponent(sub(f.key.trim())) + '=' + encodeURIComponent(sub(f.value))).join('&') || undefined;
      } else if (req.bodyType === 'form-data') {
        const items = (req.bodyFormData ?? []).filter(f => f.enabled && f.key.trim());
        if (items.length) {
          const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
          headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
          body = items.map(f =>
            `--${boundary}\r\nContent-Disposition: form-data; name="${sub(f.key.trim())}"\r\n\r\n${sub(f.value)}`
          ).join('\r\n') + `\r\n--${boundary}--`;
        }
      }

      try {
        const response = await sendHttpRequest(
          { method: req.method, url, headers, body, timeout: req.timeout ?? 30, sslIgnore: req.sslIgnore ?? false },
          this.abortController.signal,
        );

        const assertionResults = evaluateAssertions(
          req.assertions ?? [],
          { status: response.status, duration: response.duration, body: response.body ?? '' },
        );

        const result: RequestRunResult = {
          index: i,
          name: req.name,
          method: req.method,
          url: req.url,
          status: response.status,
          statusText: response.statusText,
          duration: response.duration,
          size: response.size,
          assertionResults,
        };
        results.push(result);
        this.panel.webview.postMessage({ type: 'requestDone', payload: result });
      } catch (err) {
        if (this.abortController.signal.aborted) break;
        const result: RequestRunResult = {
          index: i,
          name: req.name,
          method: req.method,
          url: req.url,
          error: err instanceof Error ? err.message : String(err),
          assertionResults: [],
        };
        results.push(result);
        this.panel.webview.postMessage({ type: 'requestDone', payload: result });
      }
    }

    this.panel.webview.postMessage({ type: 'runComplete', payload: { results } });
  }

  private async exportResults(results: RequestRunResult[]): Promise<void> {
    const defaultUri = vscode.Uri.joinPath(
      vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file('/'),
      'runner-results.json',
    );
    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: { 'JSON': ['json'] },
    });
    if (!uri) return;

    const project = this.store.getProjects().find(p => p.id === this.projectId);
    const collection = project?.collections.find(c => c.id === this.collId);

    const exportData = {
      collectionName: collection?.name ?? '',
      runAt: new Date().toISOString(),
      results: results.map(r => ({
        name: r.name,
        method: r.method,
        url: r.url,
        status: r.status,
        statusText: r.statusText,
        duration: r.duration,
        size: r.size,
        error: r.error,
        assertions: r.assertionResults,
        passed: r.assertionResults.every(a => a.pass),
      })),
    };

    await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(exportData, null, 2), 'utf-8'));
    vscode.window.showInformationMessage('실행 결과가 저장되었습니다.');
  }
}

function buildRunnerHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
<style>${RUNNER_CSS}</style>
</head>
<body>
${RUNNER_HTML}
<script>${RUNNER_JS}</script>
</body>
</html>`;
}

const RUNNER_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--vscode-font-family);
  font-size: var(--vscode-font-size);
  color: var(--vscode-editor-foreground);
  background: var(--vscode-editor-background);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.runner-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.runner-title {
  font-size: 14px;
  font-weight: 600;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.runner-btn {
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
.runner-btn:hover { background: var(--vscode-button-hoverBackground); }
.runner-btn:disabled { opacity: 0.5; cursor: default; }

.runner-cancel-btn {
  background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
  color: var(--vscode-errorForeground, #f48771);
  border: 1px solid var(--vscode-inputValidation-errorBorder, #be1100);
  border-radius: 3px;
  padding: 5px 14px;
  font-size: 13px;
  cursor: pointer;
}
.runner-cancel-btn:hover { opacity: 0.9; }

.runner-export-btn {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
  border: none;
  border-radius: 3px;
  padding: 5px 14px;
  font-size: 13px;
  cursor: pointer;
}
.runner-export-btn:hover { background: var(--vscode-button-secondaryHoverBackground); }
.runner-export-btn:disabled { opacity: 0.4; cursor: default; }

.runner-summary {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  min-height: 34px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--vscode-descriptionForeground);
}
.summary-pass { color: #49cc90; font-weight: 600; }
.summary-fail { color: #f93e3e; font-weight: 600; }

.runner-table-wrap {
  flex: 1;
  overflow: auto;
}

table.runner-table {
  width: 100%;
  border-collapse: collapse;
}
table.runner-table thead th {
  text-align: left;
  padding: 7px 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vscode-descriptionForeground);
  border-bottom: 1px solid var(--vscode-panel-border);
  position: sticky;
  top: 0;
  background: var(--vscode-editor-background);
  white-space: nowrap;
}
table.runner-table tbody tr {
  border-bottom: 1px solid var(--vscode-panel-border);
}
table.runner-table tbody tr.row-fail {
  background: rgba(249,62,62,.06);
}
table.runner-table tbody tr.row-running {
  background: rgba(97,175,254,.06);
}
table.runner-table tbody td {
  padding: 8px 12px;
  font-size: 12px;
  vertical-align: middle;
}
.col-num { width: 40px; color: var(--vscode-descriptionForeground); font-size: 11px; }
.col-name { font-weight: 500; }
.col-method { width: 72px; }
.col-url {
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
}
.col-status { width: 90px; }
.col-time { width: 80px; color: var(--vscode-descriptionForeground); font-size: 11px; }
.col-assertions { width: 100px; font-size: 11px; }
.col-result { width: 80px; }

.method-badge {
  font-size: 11px;
  font-weight: 700;
}
.method-badge.GET    { color: #61affe; }
.method-badge.POST   { color: #49cc90; }
.method-badge.PUT    { color: #fca130; }
.method-badge.DELETE { color: #f93e3e; }
.method-badge.PATCH  { color: #50e3c2; }

.status-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 3px;
}
.status-badge.s2xx { color: #49cc90; background: rgba(73,204,144,.12); }
.status-badge.s3xx { color: #61affe; background: rgba(97,175,254,.12); }
.status-badge.s4xx { color: #fca130; background: rgba(252,161,48,.12); }
.status-badge.s5xx { color: #f93e3e; background: rgba(249,62,62,.12); }

.result-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 3px;
}
.result-badge.pass { color: #49cc90; background: rgba(73,204,144,.12); }
.result-badge.fail { color: #f93e3e; background: rgba(249,62,62,.12); }
.result-badge.error { color: var(--vscode-errorForeground); }
.result-badge.running { color: #61affe; }
.result-badge.pending { color: var(--vscode-descriptionForeground); }

.assert-chip {
  font-size: 11px;
}
.assert-chip.pass { color: #49cc90; }
.assert-chip.fail { color: #f93e3e; }
.assert-chip.none { color: var(--vscode-descriptionForeground); }

.empty-state {
  padding: 32px 16px;
  text-align: center;
  color: var(--vscode-descriptionForeground);
  font-size: 13px;
}
`;

const RUNNER_HTML = `
<div class="runner-header">
  <span class="runner-title" id="runner-title">Collection Runner</span>
  <button class="runner-btn" id="run-btn">실행</button>
  <button class="runner-cancel-btn" id="cancel-btn" hidden>중단</button>
  <button class="runner-export-btn" id="export-btn" disabled>결과 내보내기</button>
</div>
<div class="runner-summary" id="runner-summary">
  요청을 실행하면 결과가 여기에 표시됩니다.
</div>
<div class="runner-table-wrap">
  <table class="runner-table">
    <thead>
      <tr>
        <th class="col-num">#</th>
        <th class="col-name">이름</th>
        <th class="col-method">Method</th>
        <th class="col-url">URL</th>
        <th class="col-status">Status</th>
        <th class="col-time">시간</th>
        <th class="col-assertions">Assertions</th>
        <th class="col-result">결과</th>
      </tr>
    </thead>
    <tbody id="runner-tbody"></tbody>
  </table>
  <div class="empty-state" id="empty-state">컬렉션이 비어 있습니다.</div>
</div>
`;

const RUNNER_JS = `
const vscode = acquireVsCodeApi();
let collectionRequests = [];
let runResults = [];
let isRunning = false;

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusClass(code) {
  if (!code) return '';
  if (code >= 500) return 's5xx';
  if (code >= 400) return 's4xx';
  if (code >= 300) return 's3xx';
  if (code >= 200) return 's2xx';
  return '';
}

function renderTable() {
  const tbody = document.getElementById('runner-tbody');
  const empty = document.getElementById('empty-state');

  if (!collectionRequests.length) {
    tbody.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  tbody.innerHTML = '';
  collectionRequests.forEach(function(req, i) {
    const result = runResults.find(function(r) { return r.index === i; });
    const tr = document.createElement('tr');

    if (result) {
      if (result.error) {
        tr.className = 'row-fail';
      } else if (result.assertionResults && result.assertionResults.some(function(a) { return !a.pass; })) {
        tr.className = 'row-fail';
      }
    }

    const tdNum = document.createElement('td');
    tdNum.className = 'col-num';
    tdNum.textContent = String(i + 1);

    const tdName = document.createElement('td');
    tdName.className = 'col-name';
    tdName.textContent = req.name;
    tdName.title = req.name;

    const tdMethod = document.createElement('td');
    tdMethod.className = 'col-method';
    const methodSpan = document.createElement('span');
    methodSpan.className = 'method-badge ' + req.method;
    methodSpan.textContent = req.method;
    tdMethod.appendChild(methodSpan);

    const tdUrl = document.createElement('td');
    tdUrl.className = 'col-url';
    tdUrl.textContent = req.url;
    tdUrl.title = req.url;

    const tdStatus = document.createElement('td');
    tdStatus.className = 'col-status';
    if (result && result.status) {
      const span = document.createElement('span');
      span.className = 'status-badge ' + statusClass(result.status);
      span.textContent = result.status + ' ' + (result.statusText || '');
      tdStatus.appendChild(span);
    } else if (result && result.error) {
      tdStatus.textContent = '—';
    }

    const tdTime = document.createElement('td');
    tdTime.className = 'col-time';
    if (result && result.duration !== undefined) {
      tdTime.textContent = result.duration + ' ms';
    }

    const tdAssert = document.createElement('td');
    tdAssert.className = 'col-assertions';
    if (result && result.assertionResults && result.assertionResults.length) {
      var passed = result.assertionResults.filter(function(a) { return a.pass; }).length;
      var total = result.assertionResults.length;
      var span = document.createElement('span');
      span.className = 'assert-chip ' + (passed === total ? 'pass' : 'fail');
      span.textContent = passed + '/' + total + ' 통과';
      tdAssert.appendChild(span);
    } else if (req.assertionCount) {
      var span2 = document.createElement('span');
      span2.className = 'assert-chip none';
      span2.textContent = req.assertionCount + '개';
      tdAssert.appendChild(span2);
    } else {
      tdAssert.textContent = '—';
    }

    const tdResult = document.createElement('td');
    tdResult.className = 'col-result';
    var resultBadge = document.createElement('span');
    if (!result) {
      resultBadge.className = 'result-badge pending';
      resultBadge.textContent = '대기';
    } else if (result._running) {
      resultBadge.className = 'result-badge running';
      resultBadge.textContent = '실행 중...';
    } else if (result.error) {
      resultBadge.className = 'result-badge error';
      resultBadge.textContent = '오류';
      resultBadge.title = result.error;
    } else {
      var allPassed = !result.assertionResults || result.assertionResults.every(function(a) { return a.pass; });
      resultBadge.className = 'result-badge ' + (allPassed ? 'pass' : 'fail');
      resultBadge.textContent = allPassed ? '통과' : '실패';
    }
    tdResult.appendChild(resultBadge);

    tr.append(tdNum, tdName, tdMethod, tdUrl, tdStatus, tdTime, tdAssert, tdResult);
    tbody.appendChild(tr);
  });
}

function updateSummary() {
  const el = document.getElementById('runner-summary');
  if (!runResults.length) {
    el.innerHTML = '요청을 실행하면 결과가 여기에 표시됩니다.';
    return;
  }

  const done = runResults.filter(function(r) { return !r._running; });
  const total = collectionRequests.length;
  const errors = done.filter(function(r) { return r.error; }).length;
  const assertFailed = done.filter(function(r) {
    return !r.error && r.assertionResults && r.assertionResults.some(function(a) { return !a.pass; });
  }).length;
  const passed = done.length - errors - assertFailed;

  var html = done.length + '/' + total + ' 완료';
  if (passed > 0) html += '  <span class="summary-pass">✓ ' + passed + ' 통과</span>';
  if (assertFailed > 0) html += '  <span class="summary-fail">✗ ' + assertFailed + ' 검증 실패</span>';
  if (errors > 0) html += '  <span class="summary-fail">⚠ ' + errors + ' 오류</span>';
  el.innerHTML = html;
}

document.getElementById('run-btn').addEventListener('click', function() {
  if (isRunning) return;
  runResults = [];
  isRunning = true;
  document.getElementById('run-btn').disabled = true;
  document.getElementById('cancel-btn').hidden = false;
  document.getElementById('export-btn').disabled = true;
  renderTable();
  vscode.postMessage({ type: 'startRun' });
});

document.getElementById('cancel-btn').addEventListener('click', function() {
  vscode.postMessage({ type: 'cancelRun' });
});

document.getElementById('export-btn').addEventListener('click', function() {
  vscode.postMessage({ type: 'exportResults', payload: runResults.filter(function(r) { return !r._running; }) });
});

window.addEventListener('message', function(event) {
  const msg = event.data;
  if (msg.type === 'collectionInfo') {
    collectionRequests = msg.payload.requests;
    document.getElementById('runner-title').textContent = 'Runner: ' + msg.payload.name;
    renderTable();
  } else if (msg.type === 'requestStart') {
    const existing = runResults.find(function(r) { return r.index === msg.payload.index; });
    if (!existing) {
      runResults.push({ index: msg.payload.index, _running: true, assertionResults: [] });
    } else {
      existing._running = true;
    }
    renderTable();
    updateSummary();
  } else if (msg.type === 'requestDone') {
    const idx = runResults.findIndex(function(r) { return r.index === msg.payload.index; });
    if (idx >= 0) runResults[idx] = msg.payload;
    else runResults.push(msg.payload);
    renderTable();
    updateSummary();
  } else if (msg.type === 'runComplete') {
    isRunning = false;
    document.getElementById('run-btn').disabled = false;
    document.getElementById('cancel-btn').hidden = true;
    document.getElementById('export-btn').disabled = false;
    updateSummary();
  }
});

vscode.postMessage({ type: 'ready' });
`;
