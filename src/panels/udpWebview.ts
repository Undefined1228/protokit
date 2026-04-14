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
.status-badge.running { background: #155724; color: #d4edda; }
.status-badge.stopped { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
.status-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.status-badge.running .dot { background: #4caf50; }

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

.control-area {
  padding: 8px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.control-area label { font-size: 11px; opacity: 0.7; }
.control-area input[type=text] { width: 140px; }
.control-area input[type=number] { width: 70px; }
.local-port-label { font-size: 11px; color: var(--vscode-descriptionForeground); }

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
  flex-wrap: wrap;
}
.send-options label { font-size: 11px; opacity: 0.7; }
.send-options input[type=text] { width: 130px; }
.send-options input[type=number] { width: 70px; }
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

/* ── 자동 응답 규칙 ── */
.rules-area {
  border-top: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
  max-height: 150px;
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
`;

export const HTML = `
<div class="tab-bar">
  <button class="tab-btn active" data-tab="client">클라이언트</button>
  <button class="tab-btn" data-tab="server">서버</button>
</div>

<!-- 클라이언트 패널 -->
<div class="tab-panel active" id="tab-client">
  <div class="control-area">
    <button class="btn" id="c-start">시작</button>
    <button class="btn secondary" id="c-stop" disabled>중지</button>
    <span class="status-badge stopped" id="c-status"><span class="dot"></span>중지됨</span>
    <span class="local-port-label" id="c-local-port"></span>
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
      <label>Host</label>
      <input type="text" id="c-host" placeholder="127.0.0.1" value="127.0.0.1">
      <label>Port</label>
      <input type="number" id="c-port" placeholder="9000" value="9000">
      <label>인코딩</label>
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
  <div class="control-area">
    <label>Port</label>
    <input type="number" id="s-port" placeholder="9001" value="9001">
    <button class="btn" id="s-start">시작</button>
    <button class="btn secondary" id="s-stop" disabled>중지</button>
    <span class="status-badge stopped" id="s-status"><span class="dot"></span>중지됨</span>
  </div>
  <div class="log-toolbar">
    <label>표시 인코딩</label>
    <select id="s-display-enc">
      <option value="utf8">UTF-8</option>
      <option value="hex">Hex</option>
      <option value="base64">Base64</option>
    </select>
    <div style="flex:1"></div>
    <button class="btn secondary small" id="s-clear-log">지우기</button>
    <button class="btn secondary small" id="s-save-log">저장</button>
  </div>
  <div class="log-area" id="s-log"></div>
  <div class="send-area">
    <div class="send-options">
      <label>Host</label>
      <input type="text" id="s-host" placeholder="127.0.0.1" value="127.0.0.1">
      <label>Port</label>
      <input type="number" id="s-target-port" placeholder="9000" value="9000">
      <label>인코딩</label>
      <select id="s-send-enc">
        <option value="utf8">UTF-8</option>
        <option value="hex">Hex</option>
        <option value="base64">Base64</option>
      </select>
      <div style="flex:1"></div>
      <button class="btn secondary" id="s-broadcast" disabled>Broadcast</button>
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
const vscode = acquireVsCodeApi();

// ── 유틸리티 ─────────────────────────────────────────────────────────

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

// ── 탭 전환 ──────────────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
  });
});

// ── 클라이언트 탭 ────────────────────────────────────────────────────

let cRunning = false;
let cLog = [];
let cDisplayEnc = 'utf8';

const cStatusBadge = document.getElementById('c-status');
const cLocalPortLabel = document.getElementById('c-local-port');
const cLogEl = document.getElementById('c-log');
const cDisplayEncSel = document.getElementById('c-display-enc');
const cSendEncSel = document.getElementById('c-send-enc');
const cSendInput = document.getElementById('c-send-input');
const cSendBtn = document.getElementById('c-send');
const cStartBtn = document.getElementById('c-start');
const cStopBtn = document.getElementById('c-stop');
const cHost = document.getElementById('c-host');
const cPort = document.getElementById('c-port');

function updateClientStatus(payload) {
  cRunning = payload.status === 'started';
  cStatusBadge.className = 'status-badge ' + (cRunning ? 'running' : 'stopped');
  if (cRunning) {
    cStatusBadge.innerHTML = '<span class="dot"></span>실행 중';
    cLocalPortLabel.textContent = '로컬 포트: ' + payload.localPort;
  } else {
    cStatusBadge.innerHTML = '<span class="dot"></span>' + (payload.error || '중지됨');
    cLocalPortLabel.textContent = '';
    if (payload.error) appendClientLog({ type: 'info', text: payload.error, timestamp: Date.now() });
  }
  cStartBtn.disabled = cRunning;
  cStopBtn.disabled = !cRunning;
  cSendBtn.disabled = !cRunning;
}

function appendClientLog(entry) {
  cLog.push(entry);
  renderClientEntry(entry);
}

function renderClientEntry(entry) {
  const row = document.createElement('div');
  if (entry.type === 'info') {
    row.className = 'log-entry info';
    row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span><span class="log-meta">ℹ</span><span class="log-payload">' + esc(entry.text) + '</span>';
  } else {
    const dir = entry.direction;
    row.className = 'log-entry ' + dir;
    const arrow = dir === 'tx' ? '→' : '←';
    const addrMeta = entry.remoteAddress ? esc(entry.remoteAddress + ':' + entry.remotePort) : '';
    const payload = fmtBytes(entry.data, cDisplayEnc);
    row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span>' +
      (addrMeta ? '<span class="log-meta">' + addrMeta + '</span>' : '') +
      '<span class="log-arrow ' + dir + '">' + arrow + '</span>' +
      '<span class="log-payload">' + esc(payload) + '</span>';
  }
  cLogEl.appendChild(row);
  cLogEl.scrollTop = cLogEl.scrollHeight;
}

function rerenderClientLog() {
  cLogEl.innerHTML = '';
  for (const e of cLog) renderClientEntry(e);
}

cDisplayEncSel.addEventListener('change', () => { cDisplayEnc = cDisplayEncSel.value; rerenderClientLog(); });

cStartBtn.addEventListener('click', () => {
  vscode.postMessage({ type: 'udp:startClient', payload: {} });
});
cStopBtn.addEventListener('click', () => {
  vscode.postMessage({ type: 'udp:stopClient', payload: {} });
});

cSendBtn.addEventListener('click', () => {
  const host = cHost.value.trim() || '127.0.0.1';
  const port = parseInt(cPort.value) || 9001;
  const data = cSendInput.value;
  if (!data) return;
  const encoding = cSendEncSel.value;
  const bytes = encodeInput(data, encoding);
  vscode.postMessage({ type: 'udp:send', payload: { host, port, data, encoding } });
  appendClientLog({ type: 'packet', direction: 'tx', data: bytes, remoteAddress: host, remotePort: port, timestamp: Date.now() });
});

document.getElementById('c-clear-log').addEventListener('click', () => { cLog = []; cLogEl.innerHTML = ''; });

document.getElementById('c-save-log').addEventListener('click', () => {
  const lines = cLog.map(e => {
    if (e.type === 'info') return '[ℹ] ' + e.text;
    const arrow = e.direction === 'tx' ? '→' : '←';
    const addr = e.remoteAddress ? e.remoteAddress + ':' + e.remotePort : '';
    return '[' + fmtTime(e.timestamp) + '] ' + addr + ' ' + arrow + ' ' + fmtBytes(e.data, cDisplayEnc);
  });
  vscode.postMessage({ type: 'udp:saveLog', payload: { text: lines.join('\\n') } });
});

// ── 서버 탭 ──────────────────────────────────────────────────────────

let sRunning = false;
let sLog = [];
let sDisplayEnc = 'utf8';
let sAutoReplies = [];

const sStatusBadge = document.getElementById('s-status');
const sLogEl = document.getElementById('s-log');
const sDisplayEncSel = document.getElementById('s-display-enc');
const sSendEncSel = document.getElementById('s-send-enc');
const sSendInput = document.getElementById('s-send-input');
const sSendBtn = document.getElementById('s-send');
const sBroadcastBtn = document.getElementById('s-broadcast');
const sStartBtn = document.getElementById('s-start');
const sStopBtn = document.getElementById('s-stop');
const sRulesList = document.getElementById('s-rules-list');
const sHost = document.getElementById('s-host');
const sTargetPort = document.getElementById('s-target-port');

function updateServerStatus(payload) {
  sRunning = payload.running;
  sStatusBadge.className = 'status-badge ' + (sRunning ? 'running' : 'stopped');
  sStatusBadge.innerHTML = '<span class="dot"></span>' + (sRunning ? '실행 중 :' + payload.port : payload.error || '중지됨');
  sStartBtn.disabled = sRunning;
  sStopBtn.disabled = !sRunning;
  sSendBtn.disabled = !sRunning;
  sBroadcastBtn.disabled = !sRunning;
}

function appendServerLog(entry) {
  sLog.push(entry);
  renderServerEntry(entry);
}

function renderServerEntry(entry) {
  const row = document.createElement('div');
  row.className = 'log-entry rx';
  const addr = esc(entry.remoteAddress + ':' + entry.remotePort);
  const payload = fmtBytes(entry.data, sDisplayEnc);
  row.innerHTML = '<span class="log-time">' + fmtTime(entry.timestamp) + '</span><span class="log-meta">' + addr + '</span><span class="log-arrow rx">←</span><span class="log-payload">' + esc(payload) + '</span>';
  sLogEl.appendChild(row);
  sLogEl.scrollTop = sLogEl.scrollHeight;
}

function rerenderServerLog() {
  sLogEl.innerHTML = '';
  for (const e of sLog) renderServerEntry(e);
}

sDisplayEncSel.addEventListener('change', () => { sDisplayEnc = sDisplayEncSel.value; rerenderServerLog(); });

sStartBtn.addEventListener('click', () => {
  const port = parseInt(document.getElementById('s-port').value) || 9001;
  vscode.postMessage({ type: 'udp:startServer', payload: { port } });
});
sStopBtn.addEventListener('click', () => {
  vscode.postMessage({ type: 'udp:stopServer', payload: {} });
});

sSendBtn.addEventListener('click', () => {
  const host = sHost.value.trim() || '127.0.0.1';
  const port = parseInt(sTargetPort.value) || 9000;
  const data = sSendInput.value;
  if (!data) return;
  const encoding = sSendEncSel.value;
  vscode.postMessage({ type: 'udp:serverSend', payload: { host, port, data, encoding } });
});

sBroadcastBtn.addEventListener('click', () => {
  const port = parseInt(sTargetPort.value) || 9000;
  const data = sSendInput.value;
  if (!data) return;
  const encoding = sSendEncSel.value;
  vscode.postMessage({ type: 'udp:serverBroadcast', payload: { port, data, encoding } });
});

document.getElementById('s-clear-log').addEventListener('click', () => { sLog = []; sLogEl.innerHTML = ''; });

document.getElementById('s-save-log').addEventListener('click', () => {
  const lines = sLog.map(e => '[' + fmtTime(e.timestamp) + '] ' + e.remoteAddress + ':' + e.remotePort + ' ← ' + fmtBytes(e.data, sDisplayEnc));
  vscode.postMessage({ type: 'udp:saveLog', payload: { text: lines.join('\\n') } });
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
  vscode.postMessage({ type: 'udp:setAutoReplies', payload: { rules: sAutoReplies } });
}

// ── Extension 메시지 수신 ────────────────────────────────────────────

window.addEventListener('message', event => {
  const { type, payload } = event.data;
  switch (type) {
    case 'udp:clientStatus':
      updateClientStatus(payload);
      break;
    case 'udp:packet':
      appendClientLog({ type: 'packet', direction: 'rx', data: payload.data, remoteAddress: payload.remoteAddress, remotePort: payload.remotePort, timestamp: payload.timestamp });
      break;
    case 'udp:serverStatus':
      updateServerStatus(payload);
      break;
    case 'udp:serverPacket':
      appendServerLog({ data: payload.data, remoteAddress: payload.remoteAddress, remotePort: payload.remotePort, timestamp: payload.timestamp });
      break;
  }
});
`;
