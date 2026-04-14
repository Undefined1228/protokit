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
.status-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.status-badge.connecting .dot { animation: pulse 1s infinite; }
.status-badge.connected .dot { background: #4caf50; }

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

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
input:focus, textarea:focus, select:focus { border-color: var(--vscode-focusBorder); }
input::placeholder, textarea::placeholder { color: var(--vscode-input-placeholderForeground); }

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
.btn.danger { background: #c0392b; color: #fff; }
.btn.danger:hover { background: #a93226; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

/* ── 연결 설정 영역 ── */
.connect-area {
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.connect-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.connect-row label { font-size: 11px; opacity: 0.7; white-space: nowrap; }
.connect-row input[type=text] { flex: 1; }
.connect-row select { padding: 4px 6px; }

.section { border-bottom: 1px solid var(--vscode-panel-border); flex-shrink: 0; }
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

/* ── 이벤트 스트림 ── */
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
.event-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.event-row:hover { background: var(--vscode-list-hoverBackground); }
.event-row.sent .event-dir { color: #61affe; }
.event-row.received .event-dir { color: #49cc90; }
.event-row.system .event-dir { color: var(--vscode-descriptionForeground); }
.event-dir { font-size: 13px; flex-shrink: 0; width: 16px; text-align: center; }
.event-time { color: var(--vscode-descriptionForeground); font-size: 10px; flex-shrink: 0; align-self: center; }
.event-name {
  font-size: 10px;
  font-weight: 600;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
  border-radius: 3px;
  padding: 1px 5px;
  flex-shrink: 0;
  align-self: center;
}
.event-body { flex: 1; white-space: pre-wrap; word-break: break-all; min-width: 0; }
.empty-stream {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}

/* ── emit 입력 ── */
.emit-area {
  border-top: 1px solid var(--vscode-panel-border);
  padding: 8px 12px;
  flex-shrink: 0;
}
.emit-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.emit-row label { font-size: 11px; opacity: 0.7; white-space: nowrap; }
.emit-row input { flex: 1; }
.emit-input {
  width: 100%;
  height: 56px;
  resize: none;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
}
.emit-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}
.emit-footer .room-label { font-size: 11px; opacity: 0.7; }
.emit-spacer { flex: 1; }

/* ── 리스너 태그 ── */
.listener-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  min-height: 28px;
}
.listener-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: var(--vscode-badge-background);
  color: var(--vscode-badge-foreground);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
}
.listener-tag button {
  background: none; border: none; cursor: pointer;
  color: inherit; font-size: 11px; padding: 0 2px; opacity: 0.7;
}
.listener-tag button:hover { opacity: 1; }
.listener-add-input { width: 100px; padding: 3px 6px; font-size: 11px; }
.listener-add-btn {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-textLink-foreground); font-size: 11px;
}
.listener-add-btn:hover { text-decoration: underline; }

/* ── 서버 패널 ── */
.server-top {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  flex-wrap: wrap;
}
.server-top label { font-size: 11px; opacity: 0.7; }
.server-top input[type=number] { width: 80px; }
.server-top input[type=text] { width: 160px; }

.server-body { flex: 1; display: flex; overflow: hidden; }

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
  flex-shrink: 0;
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
.client-id { font-weight: 600; font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.client-ns { opacity: 0.6; font-size: 10px; margin-top: 2px; }
.no-clients { padding: 10px; font-size: 11px; color: var(--vscode-descriptionForeground); text-align: center; }

.server-right { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

/* ── 서버 emit ── */
.server-emit-area {
  border-bottom: 1px solid var(--vscode-panel-border);
  padding: 8px 12px;
  flex-shrink: 0;
}
.server-emit-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.server-emit-row label { font-size: 11px; opacity: 0.7; white-space: nowrap; }
.server-emit-row input, .server-emit-row select { flex: 1; }
.server-emit-input {
  width: 100%;
  height: 48px;
  resize: none;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  margin-bottom: 6px;
}
.server-emit-footer { display: flex; gap: 6px; }

/* ── 이벤트 핸들러 ── */
.handlers-header {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
  border-bottom: 1px solid var(--vscode-panel-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.handler-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  font-size: 11px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.handler-row input { flex: 1; min-width: 0; }
.handler-narrow { width: 90px !important; flex: none !important; }
.handler-chk { width: 14px; height: 14px; cursor: pointer; accent-color: var(--vscode-focusBorder); flex-shrink: 0; }
.handler-del {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-errorForeground); font-size: 12px; padding: 0 2px; opacity: 0.6; flex-shrink: 0;
}
.handler-del:hover { opacity: 1; }
.handler-arrow { opacity: 0.4; flex-shrink: 0; }
.handlers-add { padding: 6px 12px; }
.kv-add-btn {
  background: none; border: none; cursor: pointer;
  color: var(--vscode-textLink-foreground); font-size: 11px;
  padding: 0; display: flex; align-items: center; gap: 3px;
}
.kv-add-btn:hover { text-decoration: underline; }
`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- ════════ 클라이언트 탭 ════════ -->
<div class="tab-panel active" id="tab-client">
  <div class="connect-area">
    <div class="connect-row">
      <label>URL</label>
      <input type="text" id="sio-url" placeholder="http://localhost:3000" />
      <span class="status-badge disconnected" id="client-status-badge">
        <span class="dot"></span>
        <span id="client-status-text">미연결</span>
      </span>
      <button class="btn" id="btn-connect">연결</button>
      <button class="btn danger" id="btn-disconnect" disabled>끊기</button>
    </div>
    <div class="connect-row">
      <label>Namespace</label>
      <input type="text" id="sio-namespace" placeholder="/" style="width:100px;" />
      <label>Transport</label>
      <select id="sio-transport">
        <option value="websocket">WebSocket</option>
        <option value="polling">Polling</option>
      </select>
    </div>
    <div class="connect-row">
      <label>Auth (JSON)</label>
      <input type="text" id="sio-auth" placeholder='{"token":"..."}' />
    </div>
  </div>

  <div class="section" id="section-listeners">
    <div class="section-header" id="section-listeners-toggle">
      <span>이벤트 리스너</span>
      <span class="chevron">▶</span>
    </div>
    <div class="section-body" id="section-listeners-body" style="display:none;">
      <div class="listener-wrap" id="listener-tags"></div>
      <div style="display:flex;gap:6px;margin-top:6px;align-items:center;">
        <input type="text" class="listener-add-input" id="listener-add-input" placeholder="이벤트 이름" />
        <button class="listener-add-btn" id="listener-add-btn">＋ 추가</button>
      </div>
      <div style="font-size:10px;opacity:0.6;margin-top:4px;">연결 전에 리스너를 등록하면 해당 이벤트를 수신합니다.</div>
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
    <div class="empty-stream">연결하면 이벤트가 여기에 표시됩니다.</div>
  </div>

  <div class="emit-area">
    <div class="emit-row">
      <label>이벤트</label>
      <input type="text" id="emit-event-name" placeholder="message" />
    </div>
    <textarea class="emit-input" id="emit-payload" placeholder='페이로드 (JSON 또는 텍스트)'></textarea>
    <div class="emit-footer">
      <label class="room-label">Room</label>
      <input type="text" id="room-input" placeholder="room 이름" style="width:120px;" />
      <button class="btn secondary" id="btn-join-room" disabled style="padding:4px 10px;font-size:11px;">Join</button>
      <button class="btn secondary" id="btn-leave-room" disabled style="padding:4px 10px;font-size:11px;">Leave</button>
      <span class="emit-spacer"></span>
      <button class="btn" id="btn-emit" disabled>전송</button>
    </div>
  </div>
</div>

<!-- ════════ 서버 탭 ════════ -->
<div class="tab-panel" id="tab-server">
  <div class="server-top">
    <label>포트</label>
    <input type="number" id="srv-port" value="3000" min="1" max="65535" />
    <label>Namespace (쉼표 구분)</label>
    <input type="text" id="srv-namespaces" placeholder="/, /chat" />
    <span class="status-badge disconnected" id="server-status-badge">
      <span class="dot"></span>
      <span id="server-status-text">중지됨</span>
    </span>
    <button class="btn" id="btn-start-server">시작</button>
    <button class="btn danger" id="btn-stop-server" disabled>중지</button>
  </div>

  <div class="server-body">
    <!-- 클라이언트 목록 -->
    <div class="client-list-panel">
      <div class="client-list-header">연결된 클라이언트</div>
      <div class="client-list" id="client-list">
        <div class="no-clients">연결 없음</div>
      </div>
    </div>

    <div class="server-right">
      <!-- 서버 emit -->
      <div class="server-emit-area">
        <div class="server-emit-row">
          <label>대상</label>
          <select id="srv-emit-target">
            <option value="broadcast">전체 Broadcast</option>
            <option value="client">특정 클라이언트</option>
            <option value="room">Room</option>
          </select>
          <label>Namespace</label>
          <input type="text" id="srv-emit-ns" placeholder="/" style="width:80px;" />
        </div>
        <div class="server-emit-row" id="srv-target-row" style="display:none;">
          <label id="srv-target-label">클라이언트 ID</label>
          <input type="text" id="srv-emit-to" placeholder="socket id 또는 room 이름" />
        </div>
        <div class="server-emit-row">
          <label>이벤트</label>
          <input type="text" id="srv-emit-event" placeholder="message" />
        </div>
        <textarea class="server-emit-input" id="srv-emit-payload" placeholder='페이로드 (JSON 또는 텍스트)'></textarea>
        <div class="server-emit-footer">
          <button class="btn" id="btn-srv-emit">전송</button>
        </div>
      </div>

      <!-- 이벤트 핸들러 -->
      <div class="handlers-header">
        <span>자동 응답 핸들러</span>
        <button class="btn secondary" id="btn-save-handlers" style="padding:2px 8px;font-size:11px;">적용</button>
      </div>
      <div id="handlers-list" style="overflow-y:auto;flex:1;"></div>
      <div class="handlers-add">
        <button class="kv-add-btn" id="btn-add-handler">＋ 핸들러 추가</button>
      </div>
    </div>
  </div>
</div>
`;

export const JS = `
const vscode = acquireVsCodeApi();

// ─── 탭 전환 ───────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ─── 섹션 토글 ─────────────────────────────────────────────────────────
document.getElementById('section-listeners-toggle').addEventListener('click', () => {
  const hdr = document.getElementById('section-listeners-toggle');
  const body = document.getElementById('section-listeners-body');
  const open = body.style.display === 'none';
  body.style.display = open ? 'block' : 'none';
  hdr.classList.toggle('open', open);
});

// ─── 클라이언트 상태 ────────────────────────────────────────────────────
let clientConnected = false;

function setClientStatus(status, reason) {
  const badge = document.getElementById('client-status-badge');
  const text = document.getElementById('client-status-text');
  badge.className = 'status-badge ' + status;
  const labels = { connecting: '연결 중...', connected: '연결됨', disconnected: '미연결' };
  text.textContent = labels[status] || status;
  clientConnected = status === 'connected';
  document.getElementById('btn-connect').disabled = status !== 'disconnected';
  document.getElementById('btn-disconnect').disabled = !clientConnected;
  document.getElementById('btn-emit').disabled = !clientConnected;
  document.getElementById('btn-join-room').disabled = !clientConnected;
  document.getElementById('btn-leave-room').disabled = !clientConnected;
  if (reason && status === 'disconnected') {
    appendClientEvent('system', '', '연결 끊김: ' + reason);
  }
}

// ─── 이벤트 리스너 태그 ─────────────────────────────────────────────────
const listeners = new Set(['message']);

function renderListeners() {
  const wrap = document.getElementById('listener-tags');
  wrap.innerHTML = '';
  for (const name of listeners) {
    const tag = document.createElement('span');
    tag.className = 'listener-tag';
    tag.innerHTML = name + '<button title="삭제">×</button>';
    tag.querySelector('button').addEventListener('click', () => {
      listeners.delete(name);
      renderListeners();
    });
    wrap.appendChild(tag);
  }
}
renderListeners();

document.getElementById('listener-add-btn').addEventListener('click', () => {
  const inp = document.getElementById('listener-add-input');
  const name = inp.value.trim();
  if (name) { listeners.add(name); renderListeners(); inp.value = ''; }
});
document.getElementById('listener-add-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') { document.getElementById('listener-add-btn').click(); }
});

// ─── 연결 ─────────────────────────────────────────────────────────────
document.getElementById('btn-connect').addEventListener('click', () => {
  const url = document.getElementById('sio-url').value.trim();
  if (!url) { return; }
  let namespace = document.getElementById('sio-namespace').value.trim() || '/';
  if (!namespace.startsWith('/')) { namespace = '/' + namespace; }
  const transport = document.getElementById('sio-transport').value;
  let auth = {};
  try { auth = JSON.parse(document.getElementById('sio-auth').value || '{}'); } catch {}
  setClientStatus('connecting');
  vscode.postMessage({ type: 'sio:connect', payload: { url, namespace, transport, auth, listeners: Array.from(listeners) } });
});

document.getElementById('btn-disconnect').addEventListener('click', () => {
  vscode.postMessage({ type: 'sio:disconnect' });
});

// ─── 이벤트 스트림 ────────────────────────────────────────────────────
let activeFilter = 'all';
const eventLog = [];

function appendClientEvent(dir, eventName, body) {
  const ts = new Date().toLocaleTimeString('ko-KR', { hour12: false });
  eventLog.push({ dir, eventName, body, ts });
  renderClientStream();
}

function renderClientStream() {
  const stream = document.getElementById('client-stream');
  const filtered = activeFilter === 'all' ? eventLog : eventLog.filter(e => e.dir === activeFilter);
  if (!filtered.length) {
    stream.innerHTML = '<div class="empty-stream">연결하면 이벤트가 여기에 표시됩니다.</div>';
    return;
  }
  stream.innerHTML = filtered.map(e => {
    const icon = e.dir === 'sent' ? '↑' : e.dir === 'received' ? '↓' : '●';
    const nameTag = e.eventName ? \`<span class="event-name">\${e.eventName}</span>\` : '';
    return \`<div class="event-row \${e.dir}">
      <span class="event-dir">\${icon}</span>
      <span class="event-time">\${e.ts}</span>
      \${nameTag}
      <span class="event-body">\${escHtml(e.body)}</span>
    </div>\`;
  }).join('');
  stream.scrollTop = stream.scrollHeight;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderClientStream();
  });
});

document.getElementById('btn-clear-log').addEventListener('click', () => {
  eventLog.length = 0;
  renderClientStream();
});

document.getElementById('btn-save-log').addEventListener('click', () => {
  const text = eventLog.map(e => \`[\${e.ts}] [\${e.dir}] \${e.eventName ? '[' + e.eventName + '] ' : ''}\${e.body}\`).join('\\n');
  vscode.postMessage({ type: 'sio:saveLog', payload: { text } });
});

// ─── emit ─────────────────────────────────────────────────────────────
document.getElementById('btn-emit').addEventListener('click', () => {
  const eventName = document.getElementById('emit-event-name').value.trim() || 'message';
  const raw = document.getElementById('emit-payload').value;
  let data;
  try { data = JSON.parse(raw); } catch { data = raw; }
  vscode.postMessage({ type: 'sio:emit', payload: { eventName, data } });
  const display = typeof data === 'string' ? data : JSON.stringify(data);
  appendClientEvent('sent', eventName, display);
});

// ─── Room join / leave ────────────────────────────────────────────────
document.getElementById('btn-join-room').addEventListener('click', () => {
  const room = document.getElementById('room-input').value.trim();
  if (!room) { return; }
  vscode.postMessage({ type: 'sio:joinRoom', payload: { room } });
  appendClientEvent('system', '', 'join: ' + room);
});
document.getElementById('btn-leave-room').addEventListener('click', () => {
  const room = document.getElementById('room-input').value.trim();
  if (!room) { return; }
  vscode.postMessage({ type: 'sio:leaveRoom', payload: { room } });
  appendClientEvent('system', '', 'leave: ' + room);
});

// ─── 서버 상태 ────────────────────────────────────────────────────────
function setServerStatus(running, port, error) {
  const badge = document.getElementById('server-status-badge');
  const text = document.getElementById('server-status-text');
  if (error) {
    badge.className = 'status-badge disconnected';
    text.textContent = '오류: ' + error;
  } else if (running) {
    badge.className = 'status-badge connected';
    text.textContent = 'Port ' + port + ' 실행 중';
  } else {
    badge.className = 'status-badge disconnected';
    text.textContent = '중지됨';
  }
  document.getElementById('btn-start-server').disabled = running;
  document.getElementById('btn-stop-server').disabled = !running;
}

document.getElementById('btn-start-server').addEventListener('click', () => {
  const port = parseInt(document.getElementById('srv-port').value, 10);
  const nsRaw = document.getElementById('srv-namespaces').value.trim();
  const namespaces = nsRaw ? nsRaw.split(',').map(s => s.trim()).filter(Boolean) : ['/'];
  vscode.postMessage({ type: 'sio:startServer', payload: { port, namespaces } });
});
document.getElementById('btn-stop-server').addEventListener('click', () => {
  vscode.postMessage({ type: 'sio:stopServer' });
});

// ─── 클라이언트 목록 ─────────────────────────────────────────────────
const serverClients = new Map();
let selectedClientId = null;

function renderClientList() {
  const list = document.getElementById('client-list');
  if (!serverClients.size) {
    list.innerHTML = '<div class="no-clients">연결 없음</div>';
    return;
  }
  list.innerHTML = Array.from(serverClients.values()).map(c => {
    const sel = c.id === selectedClientId ? ' selected' : '';
    return \`<div class="client-item\${sel}" data-id="\${c.id}" title="\${c.id}">
      <div class="client-id">\${c.id.slice(0,12)}…</div>
      <div class="client-ns">\${c.namespace}</div>
    </div>\`;
  }).join('');
  list.querySelectorAll('.client-item').forEach(el => {
    el.addEventListener('click', () => {
      selectedClientId = el.dataset.id;
      document.getElementById('srv-emit-to').value = selectedClientId;
      document.getElementById('srv-emit-target').value = 'client';
      toggleTargetRow();
      renderClientList();
    });
  });
}

// ─── 서버 emit 대상 토글 ─────────────────────────────────────────────
function toggleTargetRow() {
  const target = document.getElementById('srv-emit-target').value;
  const row = document.getElementById('srv-target-row');
  const label = document.getElementById('srv-target-label');
  row.style.display = target === 'broadcast' ? 'none' : 'flex';
  label.textContent = target === 'room' ? 'Room' : '클라이언트 ID';
}
document.getElementById('srv-emit-target').addEventListener('change', toggleTargetRow);

// ─── 서버 emit ────────────────────────────────────────────────────────
document.getElementById('btn-srv-emit').addEventListener('click', () => {
  const target = document.getElementById('srv-emit-target').value;
  const ns = document.getElementById('srv-emit-ns').value.trim() || '/';
  const eventName = document.getElementById('srv-emit-event').value.trim() || 'message';
  const raw = document.getElementById('srv-emit-payload').value;
  let data;
  try { data = JSON.parse(raw); } catch { data = raw; }

  if (target === 'broadcast') {
    vscode.postMessage({ type: 'sio:serverBroadcast', payload: { namespace: ns, eventName, data } });
  } else if (target === 'client') {
    const clientId = document.getElementById('srv-emit-to').value.trim();
    if (!clientId) { return; }
    vscode.postMessage({ type: 'sio:serverEmitToClient', payload: { clientId, eventName, data } });
  } else if (target === 'room') {
    const room = document.getElementById('srv-emit-to').value.trim();
    if (!room) { return; }
    vscode.postMessage({ type: 'sio:serverEmitToRoom', payload: { namespace: ns, room, eventName, data } });
  }
});

// ─── 이벤트 핸들러 ────────────────────────────────────────────────────
let handlers = [];

function renderHandlers() {
  const list = document.getElementById('handlers-list');
  if (!handlers.length) {
    list.innerHTML = '<div style="padding:10px 12px;font-size:11px;opacity:0.6;">핸들러가 없습니다.</div>';
    return;
  }
  list.innerHTML = handlers.map((h, i) => \`
    <div class="handler-row">
      <input type="checkbox" class="handler-chk" \${h.enabled ? 'checked' : ''} data-i="\${i}" title="활성화">
      <input type="text" class="handler-narrow" value="\${escHtml(h.eventName)}" data-i="\${i}" data-f="eventName" placeholder="이벤트">
      <span style="opacity:0.4;font-size:11px;">match:</span>
      <input type="text" class="handler-narrow" value="\${escHtml(h.match)}" data-i="\${i}" data-f="match" placeholder="정규식 (선택)">
      <span class="handler-arrow">→</span>
      <input type="text" class="handler-narrow" value="\${escHtml(h.responseEvent)}" data-i="\${i}" data-f="responseEvent" placeholder="응답 이벤트">
      <input type="text" value="\${escHtml(h.response)}" data-i="\${i}" data-f="response" placeholder="응답 페이로드">
      <button class="handler-del" data-i="\${i}">✕</button>
    </div>
  \`).join('');

  list.querySelectorAll('.handler-chk').forEach(el => {
    el.addEventListener('change', () => { handlers[+el.dataset.i].enabled = el.checked; });
  });
  list.querySelectorAll('input[data-f]').forEach(el => {
    el.addEventListener('input', () => { handlers[+el.dataset.i][el.dataset.f] = el.value; });
  });
  list.querySelectorAll('.handler-del').forEach(el => {
    el.addEventListener('click', () => { handlers.splice(+el.dataset.i, 1); renderHandlers(); });
  });
}

document.getElementById('btn-add-handler').addEventListener('click', () => {
  handlers.push({ enabled: true, eventName: '', match: '', responseEvent: '', response: '' });
  renderHandlers();
});

document.getElementById('btn-save-handlers').addEventListener('click', () => {
  vscode.postMessage({ type: 'sio:setHandlers', payload: { handlers } });
});

// ─── 메시지 수신 ─────────────────────────────────────────────────────
window.addEventListener('message', ({ data: msg }) => {
  switch (msg.type) {
    case 'sio:status': {
      const { status, reason } = msg.payload;
      setClientStatus(status, reason);
      if (status === 'connected') {
        appendClientEvent('system', '', '연결됨');
      }
      break;
    }
    case 'sio:event': {
      const { eventName, data, timestamp } = msg.payload;
      const display = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      appendClientEvent('received', eventName, display);
      break;
    }
    case 'sio:serverStatus': {
      const { running, port, error } = msg.payload;
      setServerStatus(running, port, error);
      if (!running && !error) {
        serverClients.clear();
        renderClientList();
      }
      break;
    }
    case 'sio:clientConnected': {
      const c = msg.payload.client;
      serverClients.set(c.id, c);
      renderClientList();
      break;
    }
    case 'sio:clientDisconnected': {
      serverClients.delete(msg.payload.clientId);
      if (selectedClientId === msg.payload.clientId) { selectedClientId = null; }
      renderClientList();
      break;
    }
    case 'sio:serverEvent':
      break;
  }
});
`;
