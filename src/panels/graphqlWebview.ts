import { AUTOCOMPLETE_CSS, AUTOCOMPLETE_JS } from './autocomplete';
import { SEARCH_CSS, SEARCH_JS } from './search';

export const CSS = `
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

.tab-bar {
  display: flex;
  border-bottom: 1px solid var(--vscode-panel-border);
  padding: 0 12px;
  flex-shrink: 0;
}
.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--vscode-tab-inactiveForeground, var(--vscode-foreground));
  padding: 8px 14px;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  opacity: 0.7;
}
.tab-btn.active {
  border-bottom-color: var(--vscode-focusBorder);
  color: var(--vscode-tab-activeForeground, var(--vscode-foreground));
  opacity: 1;
}
.tab-panel { display: none; flex: 1; overflow: hidden; flex-direction: column; }
.tab-panel.active { display: flex; }

input[type=text], input[type=number], textarea, select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  font-family: var(--vscode-editor-font-family, monospace);
  outline: none;
}
input:focus, textarea:focus, select:focus { border-color: var(--vscode-focusBorder); }
input::placeholder, textarea::placeholder { color: var(--vscode-input-placeholderForeground); }
textarea { resize: vertical; }

.btn {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 3px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
}
.btn:hover { background: var(--vscode-button-hoverBackground); }
.btn.secondary {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
}
.btn.secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
.btn.danger { background: #c72e2e; color: #fff; }
.btn.danger:hover { background: #a82020; }

.row { display: flex; gap: 6px; align-items: center; }
.flex1 { flex: 1; min-width: 0; }
.section { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; flex-shrink: 0; }
.section-label { font-size: 11px; font-weight: 600; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.5px; }
.divider { border: none; border-top: 1px solid var(--vscode-panel-border); margin: 0; }

/* 상단 URL바 */
.url-bar {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.op-select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 5px 6px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  font-weight: 600;
}
.op-select option[value=query]    { color: #61affe; }
.op-select option[value=mutation] { color: #49cc90; }
.op-select option[value=subscription] { color: #f93e3e; }

/* 쿼리 / 변수 편집기 영역 */
.editor-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.editor-split {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.editor-pane {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: var(--vscode-sideBar-background, var(--vscode-editor-background));
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.8;
}
.editor-pane textarea {
  flex: 1;
  width: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid var(--vscode-panel-border);
  resize: none;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.5;
}

/* 응답 뷰어 */
.response-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}
.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: var(--vscode-sideBar-background, var(--vscode-editor-background));
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
}
.response-body {
  flex: 1;
  overflow: auto;
  padding: 8px 10px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre;
}
.response-body.error { color: #f48771; }

/* 서브스크립션 스트림 */
.stream-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 10px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}
.stream-item {
  padding: 4px 6px;
  border-radius: 3px;
  margin-bottom: 4px;
  border-left: 3px solid var(--vscode-focusBorder);
  background: var(--vscode-list-hoverBackground);
}
.stream-item .ts { font-size: 10px; opacity: 0.6; margin-bottom: 2px; }

/* 상태 뱃지 */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
}
.status-badge.active { background: #155724; color: #d4edda; }
.status-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.status-badge.active .dot { background: #4caf50; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* Headers 테이블 */
.header-table { display: flex; flex-direction: column; gap: 4px; }
.header-row { display: flex; gap: 4px; }
.header-row input { flex: 1; }
.header-row .btn { padding: 4px 8px; font-size: 11px; }

/* Introspection 결과 */
.schema-tree {
  flex: 1;
  overflow: auto;
  padding: 8px 10px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}
.schema-type { margin-bottom: 8px; }
.schema-type-name { font-weight: 700; color: var(--vscode-symbolIcon-classForeground, #4ec9b0); }
.schema-field { padding-left: 12px; opacity: 0.85; }

/* 서버 패널 */
.server-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.server-split {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.server-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid var(--vscode-panel-border);
}
.server-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Resolver 테이블 */
.resolver-row { display: flex; gap: 4px; margin-bottom: 4px; }
.resolver-row input { flex: 1; }
.resolver-row .btn { padding: 4px 8px; }

/* 요청 로그 */
.req-log {
  flex: 1;
  overflow-y: auto;
  padding: 6px 10px;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 11px;
}
.req-item {
  padding: 3px 6px;
  border-radius: 2px;
  margin-bottom: 3px;
  border-left: 2px solid var(--vscode-focusBorder);
  background: var(--vscode-list-hoverBackground);
}
.req-item .ts { font-size: 10px; opacity: 0.5; }
.req-item .qtext { opacity: 0.9; white-space: pre-wrap; word-break: break-all; }
${AUTOCOMPLETE_CSS}${SEARCH_CSS}`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- ── 클라이언트 탭 ── -->
<div class="tab-panel active" id="tab-client">
  <div class="url-bar">
    <select class="op-select" id="opType">
      <option value="query">Query</option>
      <option value="mutation">Mutation</option>
      <option value="subscription">Subscription</option>
    </select>
    <input type="text" class="flex1" id="endpoint" placeholder="http://localhost:4000/graphql" />
    <button class="btn" id="btnSend">전송</button>
    <button class="btn secondary" id="btnIntrospect" title="스키마 자동 조회">Introspect</button>
    <button class="btn secondary" id="btnStopSub" style="display:none">구독 중지</button>
    <span class="status-badge" id="subBadge" style="display:none">
      <span class="dot"></span> 구독 중
    </span>
  </div>

  <!-- 탭: 쿼리·변수·헤더·스키마 -->
  <div style="display:flex;border-bottom:1px solid var(--vscode-panel-border);padding:0 12px;flex-shrink:0">
    <button class="tab-btn active" data-subtab="query" style="font-size:11px;padding:5px 10px">Query</button>
    <button class="tab-btn" data-subtab="headers" style="font-size:11px;padding:5px 10px">Headers</button>
    <button class="tab-btn" data-subtab="schema" style="font-size:11px;padding:5px 10px">Schema</button>
  </div>

  <!-- Query + Variables 편집기 -->
  <div class="tab-panel active editor-area" id="subtab-query">
    <div class="editor-pane" style="flex:2;min-height:80px">
      <div class="editor-header">Query / Mutation / Subscription</div>
      <textarea id="queryEditor" placeholder="query { __typename }" style="flex:1;width:100%;border-radius:0;border:none;border-bottom:1px solid var(--vscode-panel-border);resize:none;padding:8px 10px;font-size:12px;line-height:1.5;"></textarea>
    </div>
    <div class="editor-pane" style="flex:1;min-height:60px">
      <div class="editor-header">Variables (JSON)</div>
      <textarea id="variablesEditor" placeholder="{}" style="flex:1;width:100%;border-radius:0;border:none;border-bottom:1px solid var(--vscode-panel-border);resize:none;padding:8px 10px;font-size:12px;line-height:1.5;"></textarea>
    </div>
    <!-- 응답 또는 스트림 -->
    <div class="response-area" style="flex:2;min-height:80px">
      <div class="response-header">
        <span id="responseLabel">응답</span>
        <button class="btn secondary" id="btnClearResponse" style="padding:2px 8px;font-size:11px">지우기</button>
      </div>
      <div class="response-body" id="responseBody">—</div>
      <div class="stream-list" id="streamList" style="display:none"></div>
    </div>
  </div>

  <!-- Headers 탭 -->
  <div class="tab-panel" id="subtab-headers" style="overflow:auto">
    <div class="section">
      <div class="section-label">요청 헤더</div>
      <div class="header-table" id="headersTable"></div>
      <button class="btn secondary" id="btnAddHeader" style="align-self:flex-start;font-size:11px;padding:4px 10px">+ 헤더 추가</button>
    </div>
  </div>

  <!-- Schema 탭 -->
  <div class="tab-panel" id="subtab-schema" style="overflow:hidden;flex-direction:column">
    <div class="response-header" style="flex-shrink:0">
      <span>Schema Introspection 결과</span>
      <span id="introspectStatus" style="font-size:11px;opacity:0.7">Introspect 버튼으로 조회</span>
    </div>
    <div class="schema-tree" id="schemaTree">—</div>
  </div>
</div>

<!-- ── 서버 탭 ── -->
<div class="tab-panel" id="tab-server">
  <div class="server-layout">
    <!-- 서버 컨트롤 -->
    <div class="section" style="border-bottom:1px solid var(--vscode-panel-border)">
      <div class="row">
        <span class="section-label">GraphQL 서버</span>
        <span style="flex:1"></span>
        <span class="status-badge" id="svrBadge">중지됨</span>
      </div>
      <div class="row">
        <span style="font-size:12px">포트</span>
        <input type="number" id="svrPort" value="4000" style="width:80px" />
        <button class="btn" id="btnStartServer">시작</button>
        <button class="btn danger" id="btnStopServer" style="display:none">중지</button>
        <button class="btn secondary" id="btnPlayground" style="display:none" title="Playground HTML 복사">Playground</button>
      </div>
      <div id="svrError" style="font-size:11px;color:#f48771;display:none"></div>
    </div>

    <div class="server-split">
      <!-- 왼쪽: Schema + Resolvers -->
      <div class="server-left">
        <div class="editor-header">Schema (SDL)</div>
        <textarea id="schemaEditor" placeholder="type Query {
  hello: String
}

type Subscription {
  time: String
}" style="flex:1;min-height:0;width:100%;border-radius:0;border:none;border-bottom:1px solid var(--vscode-panel-border);resize:none;padding:8px 10px;font-size:12px;line-height:1.5;font-family:var(--vscode-editor-font-family,monospace)"></textarea>

        <div class="editor-header" style="margin-top:0">Resolvers</div>
        <div style="overflow:auto;padding:8px 10px;flex-shrink:0;max-height:180px">
          <div id="resolverTable"></div>
          <button class="btn secondary" id="btnAddResolver" style="font-size:11px;padding:4px 10px;margin-top:4px">+ Resolver 추가</button>
        </div>

        <div class="editor-header" style="margin-top:0">Subscription 이벤트 발행</div>
        <div class="section" style="flex-shrink:0">
          <div class="row">
            <input type="text" id="pubField" placeholder="필드명 (예: time)" style="flex:1" />
            <input type="text" id="pubPayload" placeholder='페이로드 (예: "hello")' style="flex:1" />
            <button class="btn secondary" id="btnPublish">발행</button>
          </div>
        </div>
      </div>

      <!-- 오른쪽: 요청 로그 -->
      <div class="server-right">
        <div class="response-header">
          <span>요청 로그</span>
          <button class="btn secondary" id="btnClearLog" style="padding:2px 8px;font-size:11px">지우기</button>
        </div>
        <div class="req-log" id="reqLog"></div>
      </div>
    </div>
  </div>
</div>
`;

export const JS = `
${AUTOCOMPLETE_JS}
${SEARCH_JS}
const vscode = acquireVsCodeApi();

/* ── 탭 전환 ── */
document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel[id^="tab-"]').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});
document.querySelectorAll('.tab-btn[data-subtab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn[data-subtab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel[id^="subtab-"]').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('subtab-' + btn.dataset.subtab).classList.add('active');
  });
});

/* ── 헤더 관리 ── */
let headers = [];
function renderHeaders() {
  const table = document.getElementById('headersTable');
  table.innerHTML = '';
  headers.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'header-row';
    row.innerHTML = \`<input type="text" placeholder="Key" value="\${esc(h.key)}" data-i="\${i}" data-role="key">
      <input type="text" placeholder="Value" value="\${esc(h.value)}" data-i="\${i}" data-role="val">
      <button class="btn secondary" data-i="\${i}" data-role="del" style="padding:4px 8px;font-size:11px">✕</button>\`;
    table.appendChild(row);
  });
}
document.getElementById('headersTable').addEventListener('input', e => {
  const t = e.target;
  const i = +t.dataset.i;
  if (t.dataset.role === 'key') headers[i].key = t.value;
  else if (t.dataset.role === 'val') headers[i].value = t.value;
});
document.getElementById('headersTable').addEventListener('click', e => {
  if (e.target.dataset.role === 'del') {
    headers.splice(+e.target.dataset.i, 1);
    renderHeaders();
  }
});
document.getElementById('btnAddHeader').addEventListener('click', () => {
  headers.push({ key: '', value: '' });
  renderHeaders();
});

function getHeadersObj() {
  const obj = {};
  for (const h of headers) if (h.key.trim()) obj[h.key.trim()] = h.value;
  return obj;
}

/* ── 클라이언트 전송 ── */
let subscriptionActive = false;
document.getElementById('btnSend').addEventListener('click', () => {
  const url = document.getElementById('endpoint').value.trim();
  const query = document.getElementById('queryEditor').value;
  const op = document.getElementById('opType').value;
  let variables = {};
  try { variables = JSON.parse(document.getElementById('variablesEditor').value || '{}'); } catch {}

  if (op === 'subscription') {
    showStream(true);
    vscode.postMessage({ type: 'gql:execute', payload: { url, query, variables, headers: getHeadersObj(), operationType: op } });
  } else {
    showStream(false);
    document.getElementById('responseBody').textContent = '요청 중...';
    document.getElementById('responseBody').className = 'response-body';
    vscode.postMessage({ type: 'gql:execute', payload: { url, query, variables, headers: getHeadersObj(), operationType: op } });
  }
});

document.getElementById('btnStopSub').addEventListener('click', () => {
  vscode.postMessage({ type: 'gql:stopSubscription' });
});

document.getElementById('btnClearResponse').addEventListener('click', () => {
  document.getElementById('responseBody').textContent = '—';
  document.getElementById('streamList').innerHTML = '';
});

document.getElementById('btnIntrospect').addEventListener('click', () => {
  const url = document.getElementById('endpoint').value.trim();
  document.getElementById('introspectStatus').textContent = '조회 중...';
  vscode.postMessage({ type: 'gql:introspect', payload: { url, headers: getHeadersObj() } });
  // 스키마 탭으로 전환
  document.querySelectorAll('.tab-btn[data-subtab]').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel[id^="subtab-"]').forEach(p => p.classList.remove('active'));
  document.querySelector('.tab-btn[data-subtab=schema]').classList.add('active');
  document.getElementById('subtab-schema').classList.add('active');
});

function showStream(on) {
  document.getElementById('responseBody').style.display = on ? 'none' : '';
  document.getElementById('streamList').style.display = on ? '' : 'none';
  document.getElementById('btnStopSub').style.display = on ? '' : 'none';
  document.getElementById('subBadge').style.display = on ? '' : 'none';
  document.getElementById('responseLabel').textContent = on ? '스트림' : '응답';
}

/* ── 서버 ── */
let resolvers = [{ field: 'hello', returnValue: '"Hello, World!"' }];
renderResolvers();

function renderResolvers() {
  const t = document.getElementById('resolverTable');
  t.innerHTML = '';
  resolvers.forEach((r, i) => {
    const row = document.createElement('div');
    row.className = 'resolver-row';
    row.innerHTML = \`<input type="text" placeholder="field" value="\${esc(r.field)}" data-i="\${i}" data-role="field">
      <input type="text" placeholder='반환값 (JSON or 문자열)' value="\${esc(r.returnValue)}" data-i="\${i}" data-role="val">
      <button class="btn secondary" data-i="\${i}" data-role="del" style="padding:4px 8px">✕</button>\`;
    t.appendChild(row);
  });
}

document.getElementById('resolverTable').addEventListener('input', e => {
  const t = e.target;
  const i = +t.dataset.i;
  if (t.dataset.role === 'field') resolvers[i].field = t.value;
  else if (t.dataset.role === 'val') resolvers[i].returnValue = t.value;
});
document.getElementById('resolverTable').addEventListener('click', e => {
  if (e.target.dataset.role === 'del') {
    resolvers.splice(+e.target.dataset.i, 1);
    renderResolvers();
  }
});
document.getElementById('btnAddResolver').addEventListener('click', () => {
  resolvers.push({ field: '', returnValue: '' });
  renderResolvers();
});

document.getElementById('btnStartServer').addEventListener('click', () => {
  const port = +document.getElementById('svrPort').value;
  const sdl = document.getElementById('schemaEditor').value.trim() || \`type Query { hello: String }\`;
  document.getElementById('svrError').style.display = 'none';
  vscode.postMessage({ type: 'gql:startServer', payload: { port, sdl, resolvers } });
});
document.getElementById('btnStopServer').addEventListener('click', () => {
  vscode.postMessage({ type: 'gql:stopServer' });
});
document.getElementById('btnPlayground').addEventListener('click', () => {
  const port = +document.getElementById('svrPort').value;
  vscode.postMessage({ type: 'gql:openPlayground', payload: { port } });
});
document.getElementById('btnPublish').addEventListener('click', () => {
  const field = document.getElementById('pubField').value.trim();
  const payload = document.getElementById('pubPayload').value.trim();
  if (!field) return;
  vscode.postMessage({ type: 'gql:publishEvent', payload: { field, payload } });
});
document.getElementById('btnClearLog').addEventListener('click', () => {
  document.getElementById('reqLog').innerHTML = '';
});

window.__ac.init(['endpoint']);
window.__search.setTargets(['responseBody', 'streamList', 'reqLog']);
vscode.postMessage({ type: 'ready' });

/* ── 메시지 수신 ── */
window.addEventListener('message', e => {
  const { type, payload } = e.data;

  if (type === 'setEnvVars') {
    window.__ac.setVars(payload);
  }

  if (type === 'gql:data') {
    if (subscriptionActive) {
      const item = document.createElement('div');
      item.className = 'stream-item';
      item.innerHTML = \`<div class="ts">\${new Date(payload.timestamp).toLocaleTimeString()}</div><div>\${esc(JSON.stringify(payload.data, null, 2))}</div>\`;
      document.getElementById('streamList').prepend(item);
    } else {
      const body = document.getElementById('responseBody');
      body.textContent = JSON.stringify(payload.data, null, 2);
      body.className = 'response-body';
    }
  }

  if (type === 'gql:error') {
    const body = document.getElementById('responseBody');
    body.textContent = payload.message;
    body.className = 'response-body error';
  }

  if (type === 'gql:subscriptionStatus') {
    subscriptionActive = payload.active;
    const badge = document.getElementById('subBadge');
    badge.className = 'status-badge' + (payload.active ? ' active' : '');
    if (!payload.active) {
      document.getElementById('btnStopSub').style.display = 'none';
      badge.style.display = 'none';
    }
  }

  if (type === 'gql:introspectResult') {
    const tree = document.getElementById('schemaTree');
    document.getElementById('introspectStatus').textContent = payload.error ? '오류' : '완료';
    if (payload.error) {
      tree.textContent = payload.error;
      return;
    }
    const schema = payload.data?.__schema;
    if (!schema) { tree.textContent = JSON.stringify(payload.data, null, 2); return; }
    renderSchemaTree(schema, tree);
  }

  if (type === 'gql:serverStatus') {
    const running = payload.running;
    document.getElementById('svrBadge').textContent = running ? '실행 중' : '중지됨';
    document.getElementById('svrBadge').className = 'status-badge' + (running ? ' active' : '');
    document.getElementById('btnStartServer').style.display = running ? 'none' : '';
    document.getElementById('btnStopServer').style.display = running ? '' : 'none';
    document.getElementById('btnPlayground').style.display = running ? '' : 'none';
    if (payload.error) {
      document.getElementById('svrError').textContent = payload.error;
      document.getElementById('svrError').style.display = '';
    }
    // 클라이언트 엔드포인트 자동 채우기
    if (running && payload.port) {
      const ep = document.getElementById('endpoint');
      if (!ep.value) ep.value = 'http://localhost:' + payload.port + '/graphql';
    }
  }

  if (type === 'gql:serverRequest') {
    const log = document.getElementById('reqLog');
    const item = document.createElement('div');
    item.className = 'req-item';
    const q = (payload.query || '').trim().slice(0, 120);
    item.innerHTML = \`<div class="ts">\${new Date(payload.timestamp).toLocaleTimeString()}</div><div class="qtext">\${esc(q)}</div>\`;
    log.prepend(item);
  }
});

/* ── 유틸 ── */
function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderSchemaTree(schema, container) {
  const qtName = schema.queryType?.name;
  const mtName = schema.mutationType?.name;
  const stName = schema.subscriptionType?.name;
  const rootNames = new Set([qtName, mtName, stName].filter(Boolean));

  container.innerHTML = '';
  for (const t of (schema.types || [])) {
    if (t.name.startsWith('__')) continue;
    const div = document.createElement('div');
    div.className = 'schema-type';
    let label = t.name;
    if (t.name === qtName) label += ' (Query)';
    if (t.name === mtName) label += ' (Mutation)';
    if (t.name === stName) label += ' (Subscription)';
    div.innerHTML = '<div class="schema-type-name">' + esc(label) + ' <span style="opacity:0.5;font-weight:400">' + esc(t.kind) + '</span></div>';
    if (t.fields) {
      for (const f of t.fields) {
        const fd = document.createElement('div');
        fd.className = 'schema-field';
        const typeName = f.type.name || (f.type.ofType?.name ? f.type.ofType.name + (f.type.kind === 'NON_NULL' ? '!' : '') : f.type.kind);
        fd.textContent = f.name + ': ' + typeName;
        div.appendChild(fd);
      }
    }
    container.appendChild(div);
  }
}
`;
