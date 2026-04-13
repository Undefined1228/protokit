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

/* ── 상태 뱃지 ── */
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
.status-badge.connecting { background: #856404; color: #fff3cd; }
.status-badge.connected   { background: #155724; color: #d4edda; }
.status-badge.disconnected { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
.status-badge .dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: currentColor;
}
.status-badge.connecting .dot { animation: pulse 1s infinite; }
.status-badge.connected .dot { background: #4caf50; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ── 공통 입력 ── */
input[type=text], input[type=number], textarea, select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  font-family: inherit;
  outline: none;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--vscode-focusBorder);
}
input::placeholder, textarea::placeholder {
  color: var(--vscode-input-placeholderForeground);
}

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
.btn.danger {
  background: #c0392b;
  color: #fff;
}
.btn.danger:hover { background: #a93226; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

/* ── 클라이언트 패널 ── */
.url-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.url-bar input { flex: 1; }

.section {
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  cursor: pointer;
  user-select: none;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}
.section-header:hover { opacity: 1; }
.section-header .chevron { font-size: 10px; transition: transform 0.15s; }
.section-header.open .chevron { transform: rotate(90deg); }
.section-body { padding: 8px 12px; }

/* ── KV rows ── */
.kv-table { width: 100%; border-collapse: collapse; }
.kv-table td { padding: 2px 4px; vertical-align: middle; }
.kv-table td:first-child { width: 20px; }
.kv-table td:last-child { width: 28px; }
.kv-table input { width: 100%; }
.kv-checkbox { width: 14px; height: 14px; cursor: pointer; accent-color: var(--vscode-focusBorder); }
.kv-del {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-errorForeground); font-size: 13px; padding: 0 3px;
  opacity: 0.6;
}
.kv-del:hover { opacity: 1; }
.kv-add-btn {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-textLink-foreground); font-size: 11px;
  padding: 4px 0 0; display: flex; align-items: center; gap: 3px;
}
.kv-add-btn:hover { text-decoration: underline; }

/* ── 메시지 스트림 ── */
.stream-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.filter-btn {
  background: none;
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  opacity: 0.7;
}
.filter-btn.active {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  opacity: 1;
  border-color: transparent;
}
.stream-spacer { flex: 1; }

.stream-log {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}

.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  opacity: 0.95;
}
.msg-row:hover { background: var(--vscode-list-hoverBackground); }
.msg-row.sent .msg-dir { color: #61affe; }
.msg-row.received .msg-dir { color: #49cc90; }
.msg-row.system .msg-dir { color: var(--vscode-descriptionForeground); }

.msg-dir { font-size: 13px; flex-shrink: 0; width: 16px; text-align: center; }
.msg-time { color: var(--vscode-descriptionForeground); font-size: 10px; flex-shrink: 0; align-self: center; }
.msg-body { flex: 1; white-space: pre-wrap; word-break: break-all; min-width: 0; }
.msg-label {
  font-size: 10px;
  color: var(--vscode-descriptionForeground);
  flex-shrink: 0;
  align-self: center;
}

.empty-stream {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}

/* ── 메시지 입력 ── */
.compose-area {
  border-top: 1px solid var(--vscode-panel-border);
  padding: 8px 12px;
  flex-shrink: 0;
}
.compose-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.compose-toolbar label { font-size: 11px; opacity: 0.7; }
.compose-toolbar select { padding: 3px 6px; }
.compose-spacer { flex: 1; }
.compose-input {
  width: 100%;
  height: 64px;
  resize: none;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}
.compose-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
}

/* ── 서버 패널 ── */
.server-top {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.server-top label { font-size: 11px; opacity: 0.7; }
.server-top input[type=number] { width: 80px; }

.server-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.client-list-panel {
  width: 200px;
  border-right: 1px solid var(--vscode-panel-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.client-list-header {
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.client-list { flex: 1; overflow-y: auto; }
.client-item {
  padding: 6px 10px;
  cursor: pointer;
  font-size: 11px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.client-item:hover { background: var(--vscode-list-hoverBackground); }
.client-item.selected { background: var(--vscode-list-activeSelectionBackground); color: var(--vscode-list-activeSelectionForeground); }
.client-addr { font-weight: 600; }
.client-time { opacity: 0.6; font-size: 10px; margin-top: 2px; }
.no-clients { padding: 10px; font-size: 11px; color: var(--vscode-descriptionForeground); text-align: center; }

.server-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── 이벤트 핸들러 ── */
.handlers-section { border-bottom: 1px solid var(--vscode-panel-border); flex-shrink: 0; }
.handler-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 12px;
  font-size: 11px;
}
.handler-row select { padding: 2px 4px; font-size: 11px; }
.handler-row input { flex: 1; }
.handler-match { width: 110px !important; flex: none !important; }
.handler-del {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-errorForeground); font-size: 12px; padding: 0 2px; opacity: 0.6;
}
.handler-del:hover { opacity: 1; }
`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- ════════ 클라이언트 탭 ════════ -->
<div class="tab-panel active" id="tab-client">
  <div class="url-bar">
    <input type="text" id="ws-url" placeholder="ws://localhost:8080" style="flex:1;" />
    <span class="status-badge disconnected" id="client-status-badge">
      <span class="dot"></span>
      <span id="client-status-text">미연결</span>
    </span>
    <button class="btn" id="btn-connect">연결</button>
    <button class="btn danger" id="btn-disconnect" disabled>연결 끊기</button>
  </div>

  <div class="section" id="section-headers">
    <div class="section-header" id="section-headers-toggle">
      <span>연결 헤더</span>
      <span class="chevron">▶</span>
    </div>
    <div class="section-body" id="section-headers-body" style="display:none;">
      <table class="kv-table" id="header-table"></table>
      <button class="kv-add-btn" id="header-add-btn">＋ 헤더 추가</button>
    </div>
  </div>

  <div class="stream-toolbar">
    <span style="font-size:11px;opacity:0.7;">필터:</span>
    <button class="filter-btn active" data-filter="all">전체</button>
    <button class="filter-btn" data-filter="sent">송신</button>
    <button class="filter-btn" data-filter="received">수신</button>
    <span class="stream-spacer"></span>
    <button class="btn secondary" id="btn-clear-log" style="padding:3px 10px;font-size:11px;">지우기</button>
    <button class="btn secondary" id="btn-save-log" style="padding:3px 10px;font-size:11px;">로그 저장</button>
  </div>

  <div class="stream-log" id="client-stream">
    <div class="empty-stream">연결하면 메시지가 여기에 표시됩니다.</div>
  </div>

  <div class="compose-area">
    <div class="compose-toolbar">
      <label>형식:</label>
      <select id="msg-format">
        <option value="text">Text</option>
        <option value="json">JSON</option>
      </select>
      <span class="compose-spacer"></span>
    </div>
    <textarea class="compose-input" id="msg-input" placeholder="전송할 메시지를 입력하세요..."></textarea>
    <div class="compose-footer">
      <button class="btn" id="btn-send" disabled>전송</button>
    </div>
  </div>
</div>

<!-- ════════ 서버 탭 ════════ -->
<div class="tab-panel" id="tab-server">
  <div class="server-top">
    <label>포트:</label>
    <input type="number" id="srv-port" value="8080" min="1" max="65535" />
    <span class="status-badge disconnected" id="server-status-badge">
      <span class="dot"></span>
      <span id="server-status-text">중지됨</span>
    </span>
    <button class="btn" id="btn-srv-start">시작</button>
    <button class="btn danger" id="btn-srv-stop" disabled>중지</button>
  </div>

  <div class="server-body">
    <div class="client-list-panel">
      <div class="client-list-header">연결된 클라이언트</div>
      <div class="client-list" id="client-list">
        <div class="no-clients">클라이언트 없음</div>
      </div>
    </div>

    <div class="server-right">
      <div class="handlers-section">
        <div class="section-header" id="handlers-toggle">
          <span>이벤트 핸들러</span>
          <span class="chevron">▶</span>
        </div>
        <div id="handlers-body" style="display:none; padding: 6px 0;">
          <div id="handler-list"></div>
          <div style="padding: 4px 12px;">
            <button class="kv-add-btn" id="handler-add-btn">＋ 핸들러 추가</button>
          </div>
        </div>
      </div>

      <div class="stream-toolbar">
        <span style="font-size:11px;opacity:0.7;">필터:</span>
        <button class="filter-btn active" data-filter="all" data-scope="server">전체</button>
        <button class="filter-btn" data-filter="received" data-scope="server">수신</button>
        <button class="filter-btn" data-filter="system" data-scope="server">시스템</button>
        <span class="stream-spacer"></span>
        <button class="btn secondary" id="btn-srv-clear" style="padding:3px 10px;font-size:11px;">지우기</button>
        <button class="btn secondary" id="btn-srv-save" style="padding:3px 10px;font-size:11px;">로그 저장</button>
      </div>

      <div class="stream-log" id="server-stream">
        <div class="empty-stream">서버를 시작하면 로그가 여기에 표시됩니다.</div>
      </div>

      <div class="compose-area">
        <div class="compose-toolbar">
          <label>형식:</label>
          <select id="srv-msg-format">
            <option value="text">Text</option>
            <option value="json">JSON</option>
          </select>
          <span class="compose-spacer"></span>
          <span id="srv-target-label" style="font-size:11px;opacity:0.7;"></span>
        </div>
        <textarea class="compose-input" id="srv-msg-input" placeholder="전송할 메시지를 입력하세요..."></textarea>
        <div class="compose-footer">
          <button class="btn secondary" id="btn-send-selected" disabled>선택 클라이언트 전송</button>
          <button class="btn" id="btn-broadcast" disabled>전체 전송 (Broadcast)</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export const JS = `
const vscode = acquireVsCodeApi();

// ── 탭 전환 ──────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── 섹션 접기 ────────────────────────────────────────────
function setupCollapse(toggleId, bodyId) {
  const toggle = document.getElementById(toggleId);
  const body = document.getElementById(bodyId);
  if (!toggle || !body) return;
  toggle.addEventListener('click', () => {
    const open = body.style.display !== 'none';
    body.style.display = open ? 'none' : 'block';
    toggle.classList.toggle('open', !open);
  });
}
setupCollapse('section-headers-toggle', 'section-headers-body');
setupCollapse('handlers-toggle', 'handlers-body');

// ── KV 테이블 (헤더) ─────────────────────────────────────
let headers = [];

function renderHeaders() {
  const tbl = document.getElementById('header-table');
  tbl.innerHTML = '';
  headers.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td><input type="checkbox" class="kv-checkbox" \${row.enabled ? 'checked' : ''} data-i="\${i}" data-field="enabled"></td>
      <td><input type="text" value="\${esc(row.key)}" placeholder="키" data-i="\${i}" data-field="key"></td>
      <td><input type="text" value="\${esc(row.value)}" placeholder="값" data-i="\${i}" data-field="value"></td>
      <td><button class="kv-del" data-i="\${i}">✕</button></td>
    \`;
    tbl.appendChild(tr);
  });
}

document.getElementById('header-table').addEventListener('change', e => {
  const el = e.target;
  if (!el.dataset.i) return;
  const i = +el.dataset.i;
  if (el.dataset.field === 'enabled') headers[i].enabled = el.checked;
  else headers[i][el.dataset.field] = el.value;
});
document.getElementById('header-table').addEventListener('input', e => {
  const el = e.target;
  if (!el.dataset.i || el.type === 'checkbox') return;
  headers[+el.dataset.i][el.dataset.field] = el.value;
});
document.getElementById('header-table').addEventListener('click', e => {
  if (e.target.classList.contains('kv-del')) {
    headers.splice(+e.target.dataset.i, 1);
    renderHeaders();
  }
});
document.getElementById('header-add-btn').addEventListener('click', () => {
  headers.push({ enabled: true, key: '', value: '' });
  renderHeaders();
});
renderHeaders();

// ── 클라이언트 상태 ───────────────────────────────────────
let clientConnected = false;
let clientFilter = 'all';
const clientLog = [];

function setClientStatus(status, text) {
  const badge = document.getElementById('client-status-badge');
  const textEl = document.getElementById('client-status-text');
  badge.className = 'status-badge ' + status;
  textEl.textContent = text;
  clientConnected = status === 'connected';
  document.getElementById('btn-connect').disabled = status !== 'disconnected';
  document.getElementById('btn-disconnect').disabled = status === 'disconnected';
  document.getElementById('btn-send').disabled = !clientConnected;
}

// ── 클라이언트 연결 ───────────────────────────────────────
document.getElementById('btn-connect').addEventListener('click', () => {
  const url = document.getElementById('ws-url').value.trim();
  if (!url) return;
  const hdrs = {};
  headers.filter(h => h.enabled && h.key).forEach(h => { hdrs[h.key] = h.value; });
  vscode.postMessage({ type: 'ws:connect', payload: { url, headers: hdrs } });
});

document.getElementById('btn-disconnect').addEventListener('click', () => {
  vscode.postMessage({ type: 'ws:disconnect' });
});

// ── 메시지 전송 ───────────────────────────────────────────
document.getElementById('btn-send').addEventListener('click', sendClientMessage);
document.getElementById('msg-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) sendClientMessage();
});

function sendClientMessage() {
  if (!clientConnected) return;
  const input = document.getElementById('msg-input');
  const format = document.getElementById('msg-format').value;
  let data = input.value;
  if (format === 'json') {
    try { data = JSON.stringify(JSON.parse(data)); } catch { appendClientMsg('system', '⚠ JSON 파싱 오류'); return; }
  }
  if (!data.trim()) return;
  vscode.postMessage({ type: 'ws:send', payload: { data } });
  appendClientMsg('sent', data, Date.now());
  input.value = '';
}

// ── 스트림 뷰어 ───────────────────────────────────────────
function formatTime(ts) {
  const d = new Date(ts);
  return d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0');
}

function appendClientMsg(direction, data, timestamp) {
  clientLog.push({ direction, data, timestamp });
  if (clientFilter !== 'all' && clientFilter !== direction) return;
  renderClientMsg({ direction, data, timestamp });
}

function renderClientMsg({ direction, data, timestamp }) {
  const stream = document.getElementById('client-stream');
  const empty = stream.querySelector('.empty-stream');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'msg-row ' + direction;
  row.dataset.dir = direction;

  let body = esc(data);
  try {
    const parsed = JSON.parse(data);
    body = '<span style="color:var(--vscode-symbolIcon-objectForeground,#d19a66)">' + esc(JSON.stringify(parsed, null, 2)) + '</span>';
  } catch {}

  const dir = direction === 'sent' ? '→' : direction === 'received' ? '←' : '·';
  const time = timestamp ? formatTime(timestamp) : '';
  row.innerHTML = \`<span class="msg-dir">\${dir}</span><span class="msg-time">\${time}</span><span class="msg-body">\${body}</span>\`;
  stream.appendChild(row);
  stream.scrollTop = stream.scrollHeight;
}

document.querySelectorAll('.filter-btn:not([data-scope])').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn:not([data-scope])').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    clientFilter = btn.dataset.filter;
    rebuildClientStream();
  });
});

function rebuildClientStream() {
  const stream = document.getElementById('client-stream');
  stream.innerHTML = '';
  const filtered = clientFilter === 'all' ? clientLog : clientLog.filter(m => m.direction === clientFilter);
  if (!filtered.length) { stream.innerHTML = '<div class="empty-stream">메시지 없음</div>'; return; }
  filtered.forEach(m => renderClientMsg(m));
}

document.getElementById('btn-clear-log').addEventListener('click', () => {
  clientLog.length = 0;
  document.getElementById('client-stream').innerHTML = '<div class="empty-stream">연결하면 메시지가 여기에 표시됩니다.</div>';
});

document.getElementById('btn-save-log').addEventListener('click', () => {
  const text = clientLog.map(m => {
    const dir = m.direction === 'sent' ? '→' : m.direction === 'received' ? '←' : '·';
    return \`[\${m.timestamp ? formatTime(m.timestamp) : ''}] \${dir} \${m.data}\`;
  }).join('\\n');
  vscode.postMessage({ type: 'ws:saveLog', payload: { text } });
});

// ── 서버 탭 ─────────────────────────────────────────────
let serverRunning = false;
let selectedClientId = null;
let serverClients = [];
let serverFilter = 'all';
const serverLog = [];

function setServerStatus(running, text) {
  const badge = document.getElementById('server-status-badge');
  const textEl = document.getElementById('server-status-text');
  badge.className = 'status-badge ' + (running ? 'connected' : 'disconnected');
  textEl.textContent = text;
  serverRunning = running;
  document.getElementById('btn-srv-start').disabled = running;
  document.getElementById('btn-srv-stop').disabled = !running;
  document.getElementById('srv-port').disabled = running;
  updateServerSendButtons();
}

document.getElementById('btn-srv-start').addEventListener('click', () => {
  const port = +document.getElementById('srv-port').value;
  if (!port) return;
  vscode.postMessage({ type: 'ws:startServer', payload: { port } });
});

document.getElementById('btn-srv-stop').addEventListener('click', () => {
  vscode.postMessage({ type: 'ws:stopServer' });
});

// ── 클라이언트 목록 ───────────────────────────────────────
function renderClientList() {
  const list = document.getElementById('client-list');
  if (!serverClients.length) {
    list.innerHTML = '<div class="no-clients">클라이언트 없음</div>';
    selectedClientId = null;
    updateServerSendButtons();
    return;
  }
  list.innerHTML = '';
  serverClients.forEach(c => {
    const div = document.createElement('div');
    div.className = 'client-item' + (c.id === selectedClientId ? ' selected' : '');
    div.dataset.id = c.id;
    const elapsed = Math.round((Date.now() - c.connectedAt) / 1000);
    div.innerHTML = \`<div class="client-addr">\${esc(c.remoteAddress)}</div><div class="client-time">연결 \${elapsed}초 전</div>\`;
    div.addEventListener('click', () => {
      selectedClientId = selectedClientId === c.id ? null : c.id;
      renderClientList();
      updateServerSendButtons();
    });
    list.appendChild(div);
  });
}

function updateServerSendButtons() {
  const hasSel = selectedClientId !== null;
  const hasClients = serverClients.length > 0;
  document.getElementById('btn-send-selected').disabled = !serverRunning || !hasSel;
  document.getElementById('btn-broadcast').disabled = !serverRunning || !hasClients;
  const lbl = document.getElementById('srv-target-label');
  if (hasSel) {
    const c = serverClients.find(c => c.id === selectedClientId);
    lbl.textContent = c ? '→ ' + c.remoteAddress : '';
  } else {
    lbl.textContent = hasClients ? '(클라이언트를 선택하면 개별 전송)' : '';
  }
}

document.getElementById('btn-send-selected').addEventListener('click', () => {
  if (!selectedClientId) return;
  const data = getSrvMsg();
  if (!data) return;
  vscode.postMessage({ type: 'ws:serverSend', payload: { clientId: selectedClientId, data } });
  appendServerMsg('sent', data, Date.now(), selectedClientId);
  document.getElementById('srv-msg-input').value = '';
});

document.getElementById('btn-broadcast').addEventListener('click', () => {
  const data = getSrvMsg();
  if (!data) return;
  vscode.postMessage({ type: 'ws:serverBroadcast', payload: { data } });
  appendServerMsg('sent', data, Date.now(), null);
  document.getElementById('srv-msg-input').value = '';
});

function getSrvMsg() {
  const input = document.getElementById('srv-msg-input');
  const format = document.getElementById('srv-msg-format').value;
  let data = input.value;
  if (format === 'json') {
    try { data = JSON.stringify(JSON.parse(data)); } catch { appendServerMsg('system', '⚠ JSON 파싱 오류', Date.now(), null); return null; }
  }
  return data.trim() || null;
}

// ── 서버 스트림 ───────────────────────────────────────────
function appendServerMsg(direction, data, timestamp, clientId) {
  serverLog.push({ direction, data, timestamp, clientId });
  if (serverFilter !== 'all' && serverFilter !== direction) return;
  renderServerMsg({ direction, data, timestamp, clientId });
}

function renderServerMsg({ direction, data, timestamp, clientId }) {
  const stream = document.getElementById('server-stream');
  const empty = stream.querySelector('.empty-stream');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'msg-row ' + direction;

  let body = esc(data);
  try {
    const parsed = JSON.parse(data);
    body = '<span style="color:var(--vscode-symbolIcon-objectForeground,#d19a66)">' + esc(JSON.stringify(parsed, null, 2)) + '</span>';
  } catch {}

  const dir = direction === 'sent' ? '→' : direction === 'received' ? '←' : '·';
  const time = timestamp ? formatTime(timestamp) : '';
  const client = serverClients.find(c => c.id === clientId);
  const label = clientId ? esc(client?.remoteAddress ?? clientId) : (direction === 'sent' ? '전체' : '');
  row.innerHTML = \`<span class="msg-dir">\${dir}</span><span class="msg-time">\${time}</span><span class="msg-body">\${body}</span>\${label ? '<span class="msg-label">' + label + '</span>' : ''}\`;
  stream.appendChild(row);
  stream.scrollTop = stream.scrollHeight;
}

document.querySelectorAll('.filter-btn[data-scope="server"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-scope="server"]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    serverFilter = btn.dataset.filter;
    rebuildServerStream();
  });
});

function rebuildServerStream() {
  const stream = document.getElementById('server-stream');
  stream.innerHTML = '';
  const filtered = serverFilter === 'all' ? serverLog : serverLog.filter(m => m.direction === serverFilter);
  if (!filtered.length) { stream.innerHTML = '<div class="empty-stream">메시지 없음</div>'; return; }
  filtered.forEach(m => renderServerMsg(m));
}

document.getElementById('btn-srv-clear').addEventListener('click', () => {
  serverLog.length = 0;
  document.getElementById('server-stream').innerHTML = '<div class="empty-stream">서버를 시작하면 로그가 여기에 표시됩니다.</div>';
});

document.getElementById('btn-srv-save').addEventListener('click', () => {
  const text = serverLog.map(m => {
    const dir = m.direction === 'sent' ? '→' : m.direction === 'received' ? '←' : '·';
    const client = serverClients.find(c => c.id === m.clientId);
    const label = m.clientId ? ' [' + (client?.remoteAddress ?? m.clientId) + ']' : '';
    return \`[\${m.timestamp ? formatTime(m.timestamp) : ''}] \${dir}\${label} \${m.data}\`;
  }).join('\\n');
  vscode.postMessage({ type: 'ws:saveLog', payload: { text } });
});

// ── 이벤트 핸들러 ─────────────────────────────────────────
let handlers = [];

function renderHandlers() {
  const list = document.getElementById('handler-list');
  list.innerHTML = '';
  handlers.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'handler-row';
    row.innerHTML = \`
      <input type="checkbox" class="kv-checkbox" \${h.enabled ? 'checked' : ''} data-i="\${i}" data-field="enabled">
      <select data-i="\${i}" data-field="trigger">
        <option value="connect" \${h.trigger === 'connect' ? 'selected' : ''}>연결 시</option>
        <option value="message" \${h.trigger === 'message' ? 'selected' : ''}>메시지 수신 시</option>
        <option value="disconnect" \${h.trigger === 'disconnect' ? 'selected' : ''}>연결 해제 시</option>
      </select>
      <input type="text" class="handler-match" placeholder="패턴 (정규식)" value="\${esc(h.match)}" data-i="\${i}" data-field="match" \${h.trigger === 'message' ? '' : 'style="display:none"'}>
      <span style="font-size:11px;opacity:0.7;">→</span>
      <input type="text" placeholder="자동 응답 메시지" value="\${esc(h.response)}" data-i="\${i}" data-field="response">
      <button class="handler-del" data-i="\${i}">✕</button>
    \`;
    list.appendChild(row);
  });
}

document.getElementById('handler-list').addEventListener('change', e => {
  const el = e.target;
  if (!el.dataset.i) return;
  const i = +el.dataset.i;
  if (el.dataset.field === 'enabled') { handlers[i].enabled = el.checked; }
  else { handlers[i][el.dataset.field] = el.value; }
  if (el.dataset.field === 'trigger') renderHandlers();
  syncHandlers();
});
document.getElementById('handler-list').addEventListener('input', e => {
  const el = e.target;
  if (!el.dataset.i || el.type === 'checkbox') return;
  handlers[+el.dataset.i][el.dataset.field] = el.value;
  syncHandlers();
});
document.getElementById('handler-list').addEventListener('click', e => {
  if (e.target.classList.contains('handler-del')) {
    handlers.splice(+e.target.dataset.i, 1);
    renderHandlers();
    syncHandlers();
  }
});
document.getElementById('handler-add-btn').addEventListener('click', () => {
  handlers.push({ enabled: true, trigger: 'message', match: '', response: '' });
  renderHandlers();
});

function syncHandlers() {
  vscode.postMessage({ type: 'ws:setHandlers', payload: { handlers } });
}

renderHandlers();

// ── 확장 메시지 수신 ──────────────────────────────────────
window.addEventListener('message', e => {
  const { type, payload } = e.data;
  switch (type) {
    case 'ws:status':
      if (payload.status === 'connecting')    setClientStatus('connecting', '연결 중...');
      else if (payload.status === 'connected') setClientStatus('connected', '연결됨');
      else {
        const reason = payload.reason ? ' · ' + payload.reason : '';
        setClientStatus('disconnected', '미연결' + reason);
        if (reason) appendClientMsg('system', '연결 끊김' + reason, Date.now());
      }
      break;

    case 'ws:message':
      appendClientMsg('received', payload.data, payload.timestamp);
      break;

    case 'ws:serverStatus':
      if (payload.running) {
        setServerStatus(true, '실행 중 :' + payload.port);
        appendServerMsg('system', '서버 시작 (포트 ' + payload.port + ')', Date.now(), null);
      } else {
        setServerStatus(false, '중지됨');
        serverClients = [];
        renderClientList();
        if (payload.error) {
          appendServerMsg('system', '오류: ' + payload.error, Date.now(), null);
        } else {
          appendServerMsg('system', '서버 중지', Date.now(), null);
        }
      }
      break;

    case 'ws:clientConnected':
      serverClients.push(payload.client);
      renderClientList();
      appendServerMsg('system', '클라이언트 연결: ' + payload.client.remoteAddress, payload.client.connectedAt, payload.client.id);
      break;

    case 'ws:clientDisconnected':
      appendServerMsg('system', '클라이언트 해제: ' + (serverClients.find(c => c.id === payload.clientId)?.remoteAddress ?? payload.clientId), Date.now(), payload.clientId);
      serverClients = serverClients.filter(c => c.id !== payload.clientId);
      if (selectedClientId === payload.clientId) selectedClientId = null;
      renderClientList();
      break;

    case 'ws:serverMessage':
      appendServerMsg('received', payload.data, payload.timestamp, payload.clientId);
      break;
  }
});

// ── 유틸 ─────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
`;
