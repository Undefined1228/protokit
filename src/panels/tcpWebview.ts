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
.btn.small { padding: 3px 8px; font-size: 11px; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.connect-area {
  padding: 8px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.connect-area label { font-size: 11px; opacity: 0.7; }
.connect-area input[type=text] { width: 140px; }
.connect-area input[type=number] { width: 70px; }

.log-toolbar {
  padding: 5px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.log-toolbar label { font-size: 11px; opacity: 0.7; }

.log-area {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 11px;
}

.log-entry {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 2px 12px;
  line-height: 1.5;
}
.log-entry:hover { background: var(--vscode-list-hoverBackground); }
.log-time { color: var(--vscode-descriptionForeground); flex-shrink: 0; font-size: 10px; }
.log-arrow { flex-shrink: 0; font-weight: 700; }
.log-arrow.tx { color: #4fc3f7; }
.log-arrow.rx { color: #81c784; }
.log-meta { flex-shrink: 0; font-size: 10px; padding: 1px 5px; border-radius: 3px; background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
.log-payload { word-break: break-all; white-space: pre-wrap; }
.log-entry.info .log-payload { color: var(--vscode-descriptionForeground); }

.send-area {
  border-top: 1px solid var(--vscode-panel-border);
  padding: 8px 12px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.send-options {
  display: flex;
  align-items: center;
  gap: 8px;
}
.send-options label { font-size: 11px; opacity: 0.7; }
.send-input-row {
  display: flex;
  gap: 6px;
  align-items: flex-end;
}
.send-input-row textarea {
  flex: 1;
  resize: vertical;
  min-height: 52px;
  max-height: 120px;
}

/* ── 서버 탭 ── */
.server-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

.clients-panel {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--vscode-panel-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-title {
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  border-bottom: 1px solid var(--vscode-panel-border);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.clients-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}
.client-row {
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.client-addr { font-size: 11px; font-family: monospace; }
.client-time { font-size: 10px; color: var(--vscode-descriptionForeground); }

.log-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.log-panel .panel-title {
  gap: 8px;
  flex-wrap: wrap;
}

/* ── 자동 응답 규칙 ── */
.rules-area {
  border-top: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  max-height: 160px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.rules-header {
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.rules-list {
  overflow-y: auto;
  flex: 1;
  padding: 4px 8px;
}
.rule-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 0;
}
.rule-row input[type=text] { flex: 1; min-width: 60px; font-size: 11px; padding: 3px 6px; }
.rule-row select { font-size: 11px; padding: 3px 4px; }
.rule-row input[type=checkbox] { cursor: pointer; }
${SEARCH_CSS}`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- 클라이언트 패널 -->
<div class="tab-panel active" id="tab-client">
  <div class="connect-area">
    <label>Host</label>
    <input type="text" id="c-host" placeholder="127.0.0.1" value="127.0.0.1">
    <label>Port</label>
    <input type="number" id="c-port" placeholder="8080" value="8080">
    <button class="btn" id="c-connect">연결</button>
    <button class="btn secondary" id="c-disconnect" disabled>해제</button>
    <span class="status-badge disconnected" id="c-status"><span class="dot"></span>연결 안 됨</span>
  </div>
  <div class="log-toolbar">
    <label>표시 인코딩</label>
    <select id="c-display-enc">
      <option value="utf8">UTF-8</option>
      <option value="hex">Hex</option>
      <option value="base64">Base64</option>
    </select>
    <div style="flex:1"></div>
    <button class="btn secondary small" id="c-clear-log">지우기</button>
    <button class="btn secondary small" id="c-save-log">로그 저장</button>
  </div>
  <div class="log-area" id="c-log"></div>
  <div class="send-area">
    <div class="send-options">
      <label>입력 인코딩</label>
      <select id="c-send-enc">
        <option value="utf8">UTF-8</option>
        <option value="hex">Hex</option>
        <option value="base64">Base64</option>
      </select>
    </div>
    <div class="send-input-row">
      <textarea id="c-send-input" placeholder="전송할 데이터..."></textarea>
      <button class="btn" id="c-send" disabled>전송</button>
    </div>
  </div>
</div>

<!-- 서버 패널 -->
<div class="tab-panel" id="tab-server">
  <div class="connect-area">
    <label>Port</label>
    <input type="number" id="s-port" placeholder="9000" value="9000">
    <button class="btn" id="s-start">시작</button>
    <button class="btn secondary" id="s-stop" disabled>중지</button>
    <span class="status-badge disconnected" id="s-status"><span class="dot"></span>중지됨</span>
  </div>
  <div class="server-main">
    <div class="clients-panel">
      <div class="panel-title">클라이언트 <span id="s-client-count">0</span></div>
      <div class="clients-list" id="s-clients-list"></div>
    </div>
    <div class="log-panel">
      <div class="panel-title">
        <span style="flex:1">수신 로그</span>
        <select id="s-display-enc">
          <option value="utf8">UTF-8</option>
          <option value="hex">Hex</option>
          <option value="base64">Base64</option>
        </select>
        <button class="btn secondary small" id="s-clear-log">지우기</button>
        <button class="btn secondary small" id="s-save-log">저장</button>
      </div>
      <div class="log-area" id="s-log"></div>
    </div>
  </div>
  <div class="send-area">
    <div class="send-options">
      <label>대상</label>
      <select id="s-send-target">
        <option value="broadcast">전체 (Broadcast)</option>
      </select>
      <label>인코딩</label>
      <select id="s-send-enc">
        <option value="utf8">UTF-8</option>
        <option value="hex">Hex</option>
        <option value="base64">Base64</option>
      </select>
      <div style="flex:1"></div>
      <button class="btn" id="s-send" disabled>전송</button>
    </div>
    <div class="send-input-row">
      <textarea id="s-send-input" placeholder="전송할 데이터..."></textarea>
    </div>
  </div>
  <div class="rules-area">
    <div class="rules-header">
      <span>자동 응답 규칙</span>
      <button class="btn secondary small" id="s-add-rule">+ 추가</button>
    </div>
    <div class="rules-list" id="s-rules-list"></div>
  </div>
</div>
`;

export const JS = `
${SEARCH_JS}
const vscode = acquireVsCodeApi();

// ── 유틸리티 ──────────────────────────────────────────────────────────

function fmtBytes(bytes, enc) {
  if (enc === 'hex') return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join(' ');
  if (enc === 'base64') {
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
  }
  try { return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(bytes)); }
  catch { return '<decode error>'; }
}

function encodeInput(str, enc) {
  if (enc === 'hex') {
    const clean = str.replace(/\\s/g, '');
    const bytes = [];
    for (let i = 0; i < clean.length; i += 2) bytes.push(parseInt(clean.substr(i, 2), 16) || 0);
    return bytes;
  }
  if (enc === 'base64') {
    try { return Array.from(atob(str), c => c.charCodeAt(0)); }
    catch { return []; }
  }
  return Array.from(new TextEncoder().encode(str));
}

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('ko-KR', { hour12: false });
}

function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── 탭 전환 ───────────────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
  });
});

// ── 클라이언트 탭 ─────────────────────────────────────────────────────

let cStatus = 'disconnected';
let cLog = [];
let cDisplayEnc = 'utf8';

const cHost = document.getElementById('c-host');
const cPort = document.getElementById('c-port');
const cConnectBtn = document.getElementById('c-connect');
const cDisconnectBtn = document.getElementById('c-disconnect');
const cStatusBadge = document.getElementById('c-status');
const cLogEl = document.getElementById('c-log');
const cDisplayEncSel = document.getElementById('c-display-enc');
const cSendEncSel = document.getElementById('c-send-enc');
const cSendInput = document.getElementById('c-send-input');
const cSendBtn = document.getElementById('c-send');

function updateClientStatus(status, reason) {
  cStatus = status;
  const labels = { connecting: '연결 중...', connected: '연결됨', disconnected: '연결 안 됨' };
  cStatusBadge.className = 'status-badge ' + status;
  cStatusBadge.innerHTML = '<span class="dot"></span>' + labels[status];
  cConnectBtn.disabled = status !== 'disconnected';
  cDisconnectBtn.disabled = status !== 'connected';
  cSendBtn.disabled = status !== 'connected';
  if (reason) appendClientLog({ direction: 'info', text: reason, timestamp: Date.now() });
}

function appendClientLog(entry) {
  cLog.push(entry);
  renderClientEntry(entry);
}

function renderClientEntry(entry) {
  const row = document.createElement('div');
  row.className = 'log-entry ' + entry.direction;
  if (entry.direction === 'info') {
    row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span><span class="log-meta">ℹ</span><span class="log-payload">' + esc(entry.text) + '</span>';
  } else {
    const arrow = entry.direction === 'tx' ? '→' : '←';
    const payload = fmtBytes(entry.data, cDisplayEnc);
    row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span><span class="log-arrow ' + entry.direction + '">' + arrow + '</span><span class="log-payload">' + esc(payload) + '</span>';
  }
  cLogEl.appendChild(row);
  cLogEl.scrollTop = cLogEl.scrollHeight;
}

function rerenderClientLog() {
  cLogEl.innerHTML = '';
  for (const entry of cLog) renderClientEntry(entry);
}

cDisplayEncSel.addEventListener('change', () => { cDisplayEnc = cDisplayEncSel.value; rerenderClientLog(); });

cConnectBtn.addEventListener('click', () => {
  const host = cHost.value.trim() || '127.0.0.1';
  const port = parseInt(cPort.value) || 8080;
  vscode.postMessage({ type: 'tcp:connect', payload: { host, port } });
});

cDisconnectBtn.addEventListener('click', () => {
  vscode.postMessage({ type: 'tcp:disconnect', payload: {} });
});

cSendBtn.addEventListener('click', () => {
  const data = cSendInput.value;
  if (!data) return;
  const encoding = cSendEncSel.value;
  const bytes = encodeInput(data, encoding);
  vscode.postMessage({ type: 'tcp:send', payload: { data, encoding } });
  appendClientLog({ direction: 'tx', data: bytes, timestamp: Date.now() });
});

document.getElementById('c-clear-log').addEventListener('click', () => { cLog = []; cLogEl.innerHTML = ''; });

document.getElementById('c-save-log').addEventListener('click', () => {
  const lines = cLog.map(e => {
    if (e.direction === 'info') return '[' + fmtTime(e.timestamp) + '] ℹ ' + e.text;
    const arrow = e.direction === 'tx' ? '→' : '←';
    return '[' + fmtTime(e.timestamp) + '] ' + arrow + ' ' + fmtBytes(e.data, cDisplayEnc);
  });
  vscode.postMessage({ type: 'tcp:saveLog', payload: { text: lines.join('\\n') } });
});

// ── 서버 탭 ───────────────────────────────────────────────────────────

let sRunning = false;
let sClients = {};
let sLog = [];
let sDisplayEnc = 'utf8';
let sAutoReplies = [];

const sPortInput = document.getElementById('s-port');
const sStartBtn = document.getElementById('s-start');
const sStopBtn = document.getElementById('s-stop');
const sStatusBadge = document.getElementById('s-status');
const sClientCount = document.getElementById('s-client-count');
const sClientsList = document.getElementById('s-clients-list');
const sLogEl = document.getElementById('s-log');
const sDisplayEncSel = document.getElementById('s-display-enc');
const sSendTarget = document.getElementById('s-send-target');
const sSendEncSel = document.getElementById('s-send-enc');
const sSendInput = document.getElementById('s-send-input');
const sSendBtn = document.getElementById('s-send');
const sRulesList = document.getElementById('s-rules-list');

function updateServerStatus(payload) {
  sRunning = payload.running;
  sStatusBadge.className = 'status-badge ' + (sRunning ? 'connected' : 'disconnected');
  sStatusBadge.innerHTML = '<span class="dot"></span>' + (sRunning ? '실행 중 :' + payload.port : payload.error || '중지됨');
  sStartBtn.disabled = sRunning;
  sStopBtn.disabled = !sRunning;
  sSendBtn.disabled = !sRunning;
  if (!sRunning) { sClients = {}; updateClientList(); }
}

function updateClientList() {
  sClientCount.textContent = Object.keys(sClients).length;
  const currentVal = sSendTarget.value;
  sSendTarget.innerHTML = '<option value="broadcast">전체 (Broadcast)</option>';
  for (const [id, c] of Object.entries(sClients)) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = c.address + ':' + c.port;
    sSendTarget.appendChild(opt);
  }
  if (sClients[currentVal]) sSendTarget.value = currentVal;

  sClientsList.innerHTML = '';
  for (const [, c] of Object.entries(sClients)) {
    const row = document.createElement('div');
    row.className = 'client-row';
    row.innerHTML = '<span class="client-addr">' + esc(c.address) + ':' + c.port + '</span>';
    sClientsList.appendChild(row);
  }
}

function appendServerLog(entry) {
  sLog.push({ ...entry, _ts: Date.now() });
  renderServerEntry(entry);
}

function renderServerEntry(entry) {
  const row = document.createElement('div');
  const c = sClients[entry.clientId] || {};
  const addr = c.address ? c.address + ':' + c.port : (entry.clientId || '');

  if (entry.type === 'connected') {
    row.className = 'log-entry info';
    row.innerHTML = '<span class="log-time">' + fmtTime(Date.now()) + '</span><span class="log-meta">+</span><span class="log-payload">' + esc(entry.client.address + ':' + entry.client.port) + ' 연결됨</span>';
  } else if (entry.type === 'disconnected') {
    row.className = 'log-entry info';
    row.innerHTML = '<span class="log-time">' + fmtTime(Date.now()) + '</span><span class="log-meta">−</span><span class="log-payload">' + esc(entry.addr || entry.clientId) + ' 연결 해제됨</span>';
  } else if (entry.type === 'data') {
    row.className = 'log-entry rx';
    const payload = fmtBytes(entry.data, sDisplayEnc);
    row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span><span class="log-meta">' + esc(addr) + '</span><span class="log-arrow rx">←</span><span class="log-payload">' + esc(payload) + '</span>';
  }
  sLogEl.appendChild(row);
  sLogEl.scrollTop = sLogEl.scrollHeight;
}

function rerenderServerLog() {
  sLogEl.innerHTML = '';
  for (const entry of sLog) renderServerEntry(entry);
}

sDisplayEncSel.addEventListener('change', () => { sDisplayEnc = sDisplayEncSel.value; rerenderServerLog(); });

sStartBtn.addEventListener('click', () => {
  const port = parseInt(sPortInput.value) || 9000;
  vscode.postMessage({ type: 'tcp:startServer', payload: { port } });
});

sStopBtn.addEventListener('click', () => {
  vscode.postMessage({ type: 'tcp:stopServer', payload: {} });
});

sSendBtn.addEventListener('click', () => {
  const target = sSendTarget.value;
  const data = sSendInput.value;
  if (!data) return;
  const encoding = sSendEncSel.value;
  if (target === 'broadcast') {
    vscode.postMessage({ type: 'tcp:serverBroadcast', payload: { data, encoding } });
  } else {
    vscode.postMessage({ type: 'tcp:serverSendToClient', payload: { clientId: target, data, encoding } });
  }
});

document.getElementById('s-clear-log').addEventListener('click', () => { sLog = []; sLogEl.innerHTML = ''; });

document.getElementById('s-save-log').addEventListener('click', () => {
  const lines = sLog.map(e => {
    if (e.type === 'connected') return '[연결됨] ' + e.client.address + ':' + e.client.port;
    if (e.type === 'disconnected') return '[해제됨] ' + (e.addr || e.clientId);
    return '[' + fmtTime(e.timestamp) + '] ' + (e.clientId || '') + ': ' + fmtBytes(e.data, sDisplayEnc);
  });
  vscode.postMessage({ type: 'tcp:saveLog', payload: { text: lines.join('\\n') } });
});

document.getElementById('s-add-rule').addEventListener('click', () => {
  sAutoReplies.push({ enabled: true, match: '', response: '', encoding: 'utf8' });
  renderAutoReplies();
  syncAutoReplies();
});

function renderAutoReplies() {
  sRulesList.innerHTML = '';
  sAutoReplies.forEach((rule, idx) => {
    const row = document.createElement('div');
    row.className = 'rule-row';
    row.innerHTML =
      '<input type="checkbox" class="r-enabled" title="활성화"' + (rule.enabled ? ' checked' : '') + '>' +
      '<input type="text" class="r-match" placeholder="매치 문자열 (비우면 항상)" value="' + esc(rule.match) + '">' +
      '<input type="text" class="r-response" placeholder="응답 내용" value="' + esc(rule.response) + '">' +
      '<select class="r-enc">' +
        '<option value="utf8"' + (rule.encoding==='utf8'?' selected':'') + '>UTF-8</option>' +
        '<option value="hex"' + (rule.encoding==='hex'?' selected':'') + '>Hex</option>' +
        '<option value="base64"' + (rule.encoding==='base64'?' selected':'') + '>Base64</option>' +
      '</select>' +
      '<button class="btn danger small r-del">✕</button>';
    row.querySelector('.r-enabled').addEventListener('change', e => { sAutoReplies[idx].enabled = e.target.checked; syncAutoReplies(); });
    row.querySelector('.r-match').addEventListener('input', e => { sAutoReplies[idx].match = e.target.value; syncAutoReplies(); });
    row.querySelector('.r-response').addEventListener('input', e => { sAutoReplies[idx].response = e.target.value; syncAutoReplies(); });
    row.querySelector('.r-enc').addEventListener('change', e => { sAutoReplies[idx].encoding = e.target.value; syncAutoReplies(); });
    row.querySelector('.r-del').addEventListener('click', () => { sAutoReplies.splice(idx, 1); renderAutoReplies(); syncAutoReplies(); });
    sRulesList.appendChild(row);
  });
}

function syncAutoReplies() {
  vscode.postMessage({ type: 'tcp:setAutoReplies', payload: { rules: sAutoReplies } });
}

window.__search.setTargets(['c-log', 's-log']);

// ── Extension 메시지 수신 ─────────────────────────────────────────────

window.addEventListener('message', event => {
  const { type, payload } = event.data;
  switch (type) {
    case 'tcp:status':
      updateClientStatus(payload.status, payload.reason);
      break;
    case 'tcp:data':
      appendClientLog({ direction: 'rx', data: payload.data, timestamp: payload.timestamp });
      break;
    case 'tcp:serverStatus':
      updateServerStatus(payload);
      break;
    case 'tcp:clientConnected': {
      const c = payload.client;
      sClients[c.id] = c;
      updateClientList();
      appendServerLog({ type: 'connected', client: c });
      break;
    }
    case 'tcp:clientDisconnected': {
      const info = sClients[payload.clientId] || {};
      const addr = info.address ? info.address + ':' + info.port : payload.clientId;
      appendServerLog({ type: 'disconnected', clientId: payload.clientId, addr });
      delete sClients[payload.clientId];
      updateClientList();
      break;
    }
    case 'tcp:serverData':
      appendServerLog({ type: 'data', clientId: payload.clientId, data: payload.data, timestamp: payload.timestamp });
      break;
  }
});
`;
