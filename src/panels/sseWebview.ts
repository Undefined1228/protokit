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

/* ── URL 바 ── */
.url-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.url-bar input { flex: 1; }

/* ── 섹션 접기 ── */
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

/* ── 스트림 툴바 ── */
.stream-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.stream-spacer { flex: 1; }
.filter-input {
  padding: 3px 8px;
  font-size: 11px;
  width: 130px;
}

/* ── 이벤트 스트림 ── */
.stream-log {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}

.event-row {
  padding: 5px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.event-row:hover { background: var(--vscode-list-hoverBackground); }
.event-row.system { opacity: 0.6; }

.event-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}
.event-time {
  color: var(--vscode-descriptionForeground);
  font-size: 10px;
  flex-shrink: 0;
}
.event-type-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 8px;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
  flex-shrink: 0;
}
.event-type-badge.message { background: #1e4d78; color: #aed6f1; }
.event-type-badge.system  { background: transparent; color: var(--vscode-descriptionForeground); }
.event-id {
  font-size: 10px;
  color: var(--vscode-descriptionForeground);
  flex-shrink: 0;
}
.event-data {
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vscode-editor-foreground);
  padding-left: 2px;
}
.event-data.json { color: var(--vscode-symbolIcon-objectForeground, #d19a66); }

.empty-stream {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}

/* ── Last-Event-ID 표시 ── */
.last-id-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  font-size: 11px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  color: var(--vscode-descriptionForeground);
}
.last-id-value {
  font-family: var(--vscode-editor-font-family, monospace);
  color: var(--vscode-editor-foreground);
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
  font-size: 11px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.client-addr { font-weight: 600; }
.client-time { opacity: 0.6; font-size: 10px; margin-top: 2px; }
.no-clients { padding: 10px; font-size: 11px; color: var(--vscode-descriptionForeground); text-align: center; }

.server-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── 이벤트 전송 폼 ── */
.compose-area {
  border-top: 1px solid var(--vscode-panel-border);
  padding: 8px 12px;
  flex-shrink: 0;
}
.compose-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.compose-row label { font-size: 11px; opacity: 0.7; white-space: nowrap; min-width: 60px; }
.compose-row input { flex: 1; }
.compose-data {
  width: 100%;
  height: 56px;
  resize: none;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  margin-bottom: 6px;
}
.compose-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

/* ── 스케줄 섹션 ── */
.schedule-section {
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.schedule-body {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.schedule-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.schedule-row label { font-size: 11px; opacity: 0.7; white-space: nowrap; min-width: 60px; }
.schedule-row input { flex: 1; }
.schedule-row input[type=number] { width: 70px; flex: none; }
.schedule-footer {
  display: flex;
  gap: 6px;
  align-items: center;
}
.schedule-status {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
}
.schedule-status.running { color: #4caf50; }
${AUTOCOMPLETE_CSS}${SEARCH_CSS}`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- ════════ 클라이언트 탭 ════════ -->
<div class="tab-panel active" id="tab-client">
  <div class="url-bar">
    <input type="text" id="sse-url" placeholder="http://localhost:8080" />
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

  <div class="last-id-bar" id="last-id-bar" style="display:none;">
    <span>Last-Event-ID:</span>
    <span class="last-id-value" id="last-id-value">—</span>
  </div>

  <div class="stream-toolbar">
    <span style="font-size:11px;opacity:0.7;">이벤트 타입 필터:</span>
    <input type="text" class="filter-input" id="event-filter" placeholder="전체 (비우면 전체)" />
    <span class="stream-spacer"></span>
    <button class="btn secondary" id="btn-clear-log" style="padding:3px 10px;font-size:11px;">지우기</button>
    <button class="btn secondary" id="btn-save-log" style="padding:3px 10px;font-size:11px;">로그 저장</button>
  </div>

  <div class="stream-log" id="client-stream">
    <div class="empty-stream">연결하면 이벤트가 여기에 표시됩니다.</div>
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
      <div class="schedule-section">
        <div class="section-header" id="schedule-toggle">
          <span>반복 전송 스케줄</span>
          <span class="chevron">▶</span>
        </div>
        <div id="schedule-body" style="display:none;">
          <div class="schedule-body">
            <div class="schedule-row">
              <label>간격 (초):</label>
              <input type="number" id="sch-interval" value="5" min="1" max="3600" />
              <label style="min-width:auto;">이벤트 타입:</label>
              <input type="text" id="sch-event-type" placeholder="message" />
            </div>
            <div class="schedule-row">
              <label>데이터:</label>
              <input type="text" id="sch-data" placeholder="전송할 데이터" />
            </div>
            <div class="schedule-footer">
              <button class="btn" id="btn-sch-start" disabled>스케줄 시작</button>
              <button class="btn secondary" id="btn-sch-stop" disabled>스케줄 중지</button>
              <span class="schedule-status" id="sch-status"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="stream-toolbar">
        <span style="font-size:11px;opacity:0.7;">서버 로그</span>
        <span class="stream-spacer"></span>
        <button class="btn secondary" id="btn-srv-clear" style="padding:3px 10px;font-size:11px;">지우기</button>
        <button class="btn secondary" id="btn-srv-save" style="padding:3px 10px;font-size:11px;">로그 저장</button>
      </div>

      <div class="stream-log" id="server-stream">
        <div class="empty-stream">서버를 시작하면 로그가 여기에 표시됩니다.</div>
      </div>

      <div class="compose-area">
        <div class="compose-row">
          <label>이벤트 타입:</label>
          <input type="text" id="srv-event-type" placeholder="message" />
          <label>ID:</label>
          <input type="text" id="srv-event-id" placeholder="자동" style="max-width:100px;" />
        </div>
        <textarea class="compose-data" id="srv-event-data" placeholder="전송할 데이터를 입력하세요..."></textarea>
        <div class="compose-footer">
          <button class="btn" id="btn-broadcast" disabled>전체 전송 (Broadcast)</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export const JS = `
${AUTOCOMPLETE_JS}
${SEARCH_JS}
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
  if (!toggle || !body) { return; }
  toggle.addEventListener('click', () => {
    const open = body.style.display !== 'none';
    body.style.display = open ? 'none' : 'block';
    toggle.classList.toggle('open', !open);
  });
}
setupCollapse('section-headers-toggle', 'section-headers-body');
setupCollapse('schedule-toggle', 'schedule-body');

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
  if (!el.dataset.i) { return; }
  const i = +el.dataset.i;
  if (el.dataset.field === 'enabled') { headers[i].enabled = el.checked; }
  else { headers[i][el.dataset.field] = el.value; }
});
document.getElementById('header-table').addEventListener('input', e => {
  const el = e.target;
  if (!el.dataset.i || el.type === 'checkbox') { return; }
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
const clientLog = [];
let eventFilter = '';

function setClientStatus(status, text) {
  const badge = document.getElementById('client-status-badge');
  const textEl = document.getElementById('client-status-text');
  badge.className = 'status-badge ' + status;
  textEl.textContent = text;
  clientConnected = status === 'connected';
  document.getElementById('btn-connect').disabled = status !== 'disconnected';
  document.getElementById('btn-disconnect').disabled = status === 'disconnected';
}

function setLastEventId(id) {
  const bar = document.getElementById('last-id-bar');
  const val = document.getElementById('last-id-value');
  if (id) {
    bar.style.display = 'flex';
    val.textContent = id;
  } else {
    bar.style.display = 'none';
  }
}

// ── 클라이언트 연결 ───────────────────────────────────────
document.getElementById('btn-connect').addEventListener('click', () => {
  const url = document.getElementById('sse-url').value.trim();
  if (!url) { return; }
  const hdrs = {};
  headers.filter(h => h.enabled && h.key).forEach(h => { hdrs[h.key] = h.value; });
  vscode.postMessage({ type: 'sse:connect', payload: { url, headers: hdrs } });
});

document.getElementById('btn-disconnect').addEventListener('click', () => {
  vscode.postMessage({ type: 'sse:disconnect' });
});

// ── 이벤트 스트림 뷰어 ────────────────────────────────────
function formatTime(ts) {
  const d = new Date(ts);
  return d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0');
}

function matchesFilter(eventType) {
  if (!eventFilter) { return true; }
  return eventType.toLowerCase().includes(eventFilter.toLowerCase());
}

function appendClientEvent(entry) {
  clientLog.push(entry);
  if (entry.type !== 'system' && !matchesFilter(entry.eventType)) { return; }
  renderClientEvent(entry);
}

function renderClientEvent(entry) {
  const stream = document.getElementById('client-stream');
  const empty = stream.querySelector('.empty-stream');
  if (empty) { empty.remove(); }

  const row = document.createElement('div');
  row.className = 'event-row' + (entry.type === 'system' ? ' system' : '');
  row.dataset.eventType = entry.eventType || '';

  if (entry.type === 'system') {
    row.innerHTML = \`
      <div class="event-header">
        <span class="event-time">\${entry.timestamp ? formatTime(entry.timestamp) : ''}</span>
        <span class="event-type-badge system">시스템</span>
        <span class="event-data">\${esc(entry.data)}</span>
      </div>
    \`;
  } else {
    let dataHtml = esc(entry.data);
    let jsonClass = '';
    try {
      const parsed = JSON.parse(entry.data);
      dataHtml = esc(JSON.stringify(parsed, null, 2));
      jsonClass = ' json';
    } catch {}

    const idPart = entry.id ? \`<span class="event-id">id: \${esc(entry.id)}</span>\` : '';
    const badgeClass = entry.eventType === 'message' ? 'message' : '';
    row.innerHTML = \`
      <div class="event-header">
        <span class="event-time">\${formatTime(entry.timestamp)}</span>
        <span class="event-type-badge \${badgeClass}">\${esc(entry.eventType)}</span>
        \${idPart}
      </div>
      <div class="event-data\${jsonClass}">\${dataHtml}</div>
    \`;
  }

  stream.appendChild(row);
  stream.scrollTop = stream.scrollHeight;
}

document.getElementById('event-filter').addEventListener('input', e => {
  eventFilter = e.target.value.trim();
  rebuildClientStream();
});

function rebuildClientStream() {
  const stream = document.getElementById('client-stream');
  stream.innerHTML = '';
  const filtered = clientLog.filter(e => e.type === 'system' || matchesFilter(e.eventType));
  if (!filtered.length) {
    stream.innerHTML = '<div class="empty-stream">표시할 이벤트 없음</div>';
    return;
  }
  filtered.forEach(e => renderClientEvent(e));
}

document.getElementById('btn-clear-log').addEventListener('click', () => {
  clientLog.length = 0;
  document.getElementById('client-stream').innerHTML = '<div class="empty-stream">연결하면 이벤트가 여기에 표시됩니다.</div>';
});

document.getElementById('btn-save-log').addEventListener('click', () => {
  const text = clientLog
    .filter(e => e.type !== 'system')
    .map(e => {
      const parts = [\`[\${formatTime(e.timestamp)}]\`, \`[event:\${e.eventType}]\`];
      if (e.id) { parts.push(\`[id:\${e.id}]\`); }
      parts.push(e.data);
      return parts.join(' ');
    }).join('\\n');
  vscode.postMessage({ type: 'sse:saveLog', payload: { text } });
});

// ── 서버 탭 ─────────────────────────────────────────────
let serverRunning = false;
let serverClients = [];
let scheduleRunning = false;
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
  document.getElementById('btn-broadcast').disabled = !running;
  document.getElementById('btn-sch-start').disabled = !running || scheduleRunning;
  document.getElementById('btn-sch-stop').disabled = !scheduleRunning;
}

document.getElementById('btn-srv-start').addEventListener('click', () => {
  const port = +document.getElementById('srv-port').value;
  if (!port) { return; }
  vscode.postMessage({ type: 'sse:startServer', payload: { port } });
});

document.getElementById('btn-srv-stop').addEventListener('click', () => {
  vscode.postMessage({ type: 'sse:stopServer' });
});

// ── 클라이언트 목록 ───────────────────────────────────────
function renderClientList() {
  const list = document.getElementById('client-list');
  if (!serverClients.length) {
    list.innerHTML = '<div class="no-clients">클라이언트 없음</div>';
    return;
  }
  list.innerHTML = '';
  serverClients.forEach(c => {
    const div = document.createElement('div');
    div.className = 'client-item';
    const elapsed = Math.round((Date.now() - c.connectedAt) / 1000);
    div.innerHTML = \`<div class="client-addr">\${esc(c.remoteAddress)}</div><div class="client-time">연결 \${elapsed}초 전</div>\`;
    list.appendChild(div);
  });
}

// ── Broadcast ────────────────────────────────────────────
document.getElementById('btn-broadcast').addEventListener('click', () => {
  const eventType = document.getElementById('srv-event-type').value.trim() || 'message';
  const data = document.getElementById('srv-event-data').value;
  const id = document.getElementById('srv-event-id').value.trim();
  if (!data.trim()) { return; }
  vscode.postMessage({ type: 'sse:broadcast', payload: { eventType, data, id } });
  appendServerLog('sent', \`[\${eventType}]\${id ? ' id:' + id : ''} \${data}\`, Date.now());
  document.getElementById('srv-event-data').value = '';
  document.getElementById('srv-event-id').value = '';
});

// ── 스케줄 ───────────────────────────────────────────────
document.getElementById('btn-sch-start').addEventListener('click', () => {
  const intervalSec = +document.getElementById('sch-interval').value || 5;
  const eventType = document.getElementById('sch-event-type').value.trim() || 'message';
  const data = document.getElementById('sch-data').value.trim();
  if (!data) { return; }
  vscode.postMessage({ type: 'sse:startSchedule', payload: { intervalMs: intervalSec * 1000, eventType, data } });
  scheduleRunning = true;
  document.getElementById('sch-status').textContent = \`실행 중 (\${intervalSec}초 간격)\`;
  document.getElementById('sch-status').className = 'schedule-status running';
  document.getElementById('btn-sch-start').disabled = true;
  document.getElementById('btn-sch-stop').disabled = false;
  appendServerLog('system', \`스케줄 시작 (\${intervalSec}초 간격, 이벤트: \${eventType})\`, Date.now());
});

document.getElementById('btn-sch-stop').addEventListener('click', () => {
  vscode.postMessage({ type: 'sse:stopSchedule' });
  scheduleRunning = false;
  document.getElementById('sch-status').textContent = '';
  document.getElementById('sch-status').className = 'schedule-status';
  document.getElementById('btn-sch-start').disabled = !serverRunning;
  document.getElementById('btn-sch-stop').disabled = true;
  appendServerLog('system', '스케줄 중지', Date.now());
});

// ── 서버 로그 ─────────────────────────────────────────────
function appendServerLog(direction, data, timestamp) {
  serverLog.push({ direction, data, timestamp });
  renderServerLog({ direction, data, timestamp });
}

function renderServerLog({ direction, data, timestamp }) {
  const stream = document.getElementById('server-stream');
  const empty = stream.querySelector('.empty-stream');
  if (empty) { empty.remove(); }

  const row = document.createElement('div');
  row.className = 'event-row' + (direction === 'system' ? ' system' : '');

  const dir = direction === 'sent' ? '→' : '·';
  const badgeClass = direction === 'system' ? 'system' : '';
  const badgeText = direction === 'sent' ? '전송' : '시스템';
  row.innerHTML = \`
    <div class="event-header">
      <span class="event-time">\${formatTime(timestamp)}</span>
      <span class="event-type-badge \${badgeClass}">\${dir} \${badgeText}</span>
      <span class="event-data">\${esc(data)}</span>
    </div>
  \`;
  stream.appendChild(row);
  stream.scrollTop = stream.scrollHeight;
}

document.getElementById('btn-srv-clear').addEventListener('click', () => {
  serverLog.length = 0;
  document.getElementById('server-stream').innerHTML = '<div class="empty-stream">서버를 시작하면 로그가 여기에 표시됩니다.</div>';
});

document.getElementById('btn-srv-save').addEventListener('click', () => {
  const text = serverLog.map(m => \`[\${formatTime(m.timestamp)}] \${m.direction === 'sent' ? '→' : '·'} \${m.data}\`).join('\\n');
  vscode.postMessage({ type: 'sse:saveLog', payload: { text } });
});

window.__ac.init(['sse-url']);
window.__search.setTargets(['client-stream', 'server-stream']);
vscode.postMessage({ type: 'ready' });

// ── 확장 메시지 수신 ──────────────────────────────────────
window.addEventListener('message', e => {
  const { type, payload } = e.data;
  switch (type) {
    case 'setEnvVars':
      window.__ac.setVars(payload);
      break;

    case 'sse:status':
      if (payload.status === 'connecting') {
        setClientStatus('connecting', '연결 중...');
        appendClientEvent({ type: 'system', data: '연결 중...', timestamp: Date.now() });
      } else if (payload.status === 'connected') {
        setClientStatus('connected', '연결됨');
        appendClientEvent({ type: 'system', data: '연결됨', timestamp: Date.now() });
      } else {
        const reason = payload.reason ? ' · ' + payload.reason : '';
        setClientStatus('disconnected', '미연결' + reason);
        appendClientEvent({ type: 'system', data: '연결 끊김' + reason, timestamp: Date.now() });
        setLastEventId('');
      }
      break;

    case 'sse:event':
      appendClientEvent({
        type: 'event',
        eventType: payload.eventType,
        data: payload.data,
        id: payload.id,
        timestamp: payload.timestamp,
      });
      if (payload.id) { setLastEventId(payload.id); }
      break;

    case 'sse:serverStatus':
      if (payload.running) {
        setServerStatus(true, '실행 중 :' + payload.port);
        appendServerLog('system', '서버 시작 (포트 ' + payload.port + ')', Date.now());
      } else {
        if (scheduleRunning) {
          scheduleRunning = false;
          document.getElementById('sch-status').textContent = '';
          document.getElementById('sch-status').className = 'schedule-status';
        }
        setServerStatus(false, '중지됨');
        serverClients = [];
        renderClientList();
        if (payload.error) {
          appendServerLog('system', '오류: ' + payload.error, Date.now());
        } else {
          appendServerLog('system', '서버 중지', Date.now());
        }
      }
      break;

    case 'sse:clientConnected':
      serverClients.push(payload.client);
      renderClientList();
      appendServerLog('system', '클라이언트 연결: ' + payload.client.remoteAddress, payload.client.connectedAt);
      break;

    case 'sse:clientDisconnected': {
      const c = serverClients.find(c => c.id === payload.clientId);
      appendServerLog('system', '클라이언트 해제: ' + (c?.remoteAddress ?? payload.clientId), Date.now());
      serverClients = serverClients.filter(c => c.id !== payload.clientId);
      renderClientList();
      break;
    }
  }
});

// ── 유틸 ─────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
`;
