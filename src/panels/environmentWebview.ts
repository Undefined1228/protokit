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

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ── 좌측 사이드바 ── */
.sidebar {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--vscode-panel-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 8px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vscode-sideBarTitle-foreground, var(--vscode-foreground));
  opacity: 0.7;
}

.icon-btn {
  background: none;
  border: none;
  color: var(--vscode-foreground);
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}
.icon-btn:hover {
  background: var(--vscode-toolbar-hoverBackground);
  opacity: 1;
}

.env-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.env-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  border-left: 2px solid transparent;
  position: relative;
}
.env-item:hover {
  background: var(--vscode-list-hoverBackground);
}
.env-item.selected {
  background: var(--vscode-list-activeSelectionBackground);
  color: var(--vscode-list-activeSelectionForeground);
  border-left-color: var(--vscode-focusBorder);
}

.env-active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vscode-testing-iconPassed, #4caf50);
  flex-shrink: 0;
}
.env-active-dot.hidden {
  visibility: hidden;
}

.env-name {
  flex: 1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.env-actions {
  display: none;
  gap: 2px;
  flex-shrink: 0;
}
.env-item:hover .env-actions,
.env-item.selected .env-actions {
  display: flex;
}

.env-action-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 1px 3px;
  border-radius: 2px;
  font-size: 11px;
  opacity: 0.7;
  line-height: 1.4;
}
.env-action-btn:hover {
  background: var(--vscode-toolbar-hoverBackground);
  opacity: 1;
}
.env-action-btn.danger:hover {
  color: var(--vscode-errorForeground);
}

.env-empty {
  padding: 20px 12px;
  text-align: center;
  font-size: 12px;
  opacity: 0.5;
}

/* ── 우측 변수 영역 ── */
.vars-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.vars-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 8px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}

.vars-title {
  font-size: 13px;
  font-weight: 600;
}

.vars-env-label {
  font-size: 11px;
  opacity: 0.6;
  margin-left: 6px;
  font-weight: 400;
}

.vars-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.add-var-btn {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
  border: none;
  border-radius: 3px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}
.add-var-btn:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}

.save-btn {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 3px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}
.save-btn:hover {
  background: var(--vscode-button-hoverBackground);
}
.save-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.dirty-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vscode-notificationsWarningIcon-foreground, #cca700);
  flex-shrink: 0;
}
.dirty-dot.hidden { display: none; }

.vars-table-wrap {
  flex: 1;
  overflow-y: auto;
}

.usage-guide {
  padding: 10px 16px 12px;
  border-top: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}

.usage-guide p {
  font-size: 11px;
  opacity: 0.55;
  line-height: 1.6;
}

.usage-guide code {
  font-family: var(--vscode-editor-font-family, monospace);
  background: var(--vscode-textCodeBlock-background, rgba(128,128,128,0.15));
  border-radius: 3px;
  padding: 0 4px;
  font-size: 11px;
}

.vars-table {
  width: 100%;
  border-collapse: collapse;
}

.vars-table th {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vscode-panel-border);
  position: sticky;
  top: 0;
  background: var(--vscode-editor-background);
  z-index: 1;
}

.vars-table td {
  padding: 2px 6px;
  border-bottom: 1px solid var(--vscode-panel-border, rgba(128,128,128,0.1));
  vertical-align: middle;
}
.vars-table tr:hover td {
  background: var(--vscode-list-hoverBackground);
}

.var-input {
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  color: var(--vscode-editor-foreground);
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  padding: 3px 6px;
  outline: none;
}
.var-input:focus {
  background: var(--vscode-input-background);
  border-color: var(--vscode-focusBorder);
}
.var-input.key-input {
  font-weight: 500;
}

.delete-var-btn {
  background: none;
  border: none;
  color: var(--vscode-foreground);
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 3px;
  opacity: 0;
  font-size: 13px;
}
tr:hover .delete-var-btn {
  opacity: 0.5;
}
.delete-var-btn:hover {
  background: var(--vscode-toolbar-hoverBackground);
  color: var(--vscode-errorForeground);
  opacity: 1 !important;
}

.vars-empty {
  padding: 48px 24px;
  text-align: center;
  font-size: 13px;
  opacity: 0.5;
}

.no-env-selected {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  opacity: 0.5;
}
.no-env-selected p {
  font-size: 13px;
}
`;

export const HTML = `
<div class="layout">
  <div class="sidebar">
    <div class="sidebar-header">
      <span class="sidebar-title">환경</span>
      <button class="icon-btn" id="addEnvBtn" title="새 환경 추가">＋</button>
    </div>
    <div class="env-list" id="envList"></div>
  </div>
  <div class="vars-area" id="varsArea">
    <div class="no-env-selected" id="noEnvSelected">
      <p>환경을 선택하거나 새로 만드세요.</p>
    </div>
  </div>
</div>
`;

export const JS = `
const vscode = acquireVsCodeApi();

let envs = [];
let activeEnvId = null;
let selectedEnvId = null;
let isDirty = false;

window.addEventListener('message', (e) => {
  const { type, payload } = e.data;
  if (type === 'update') {
    envs = payload.environments;
    activeEnvId = payload.activeEnvironmentId;
    if (!envs.find(e => e.id === selectedEnvId)) {
      selectedEnvId = envs[0]?.id ?? null;
    }
    isDirty = false;
    render();
  }
});

document.getElementById('addEnvBtn').addEventListener('click', () => {
  if (isDirty) flushSave();
  vscode.postMessage({ type: 'createEnv' });
});

function render() {
  renderEnvList();
  renderVarsArea();
}

function markDirty() {
  if (isDirty) return;
  isDirty = true;
  const btn = document.getElementById('saveVarsBtn');
  const dot = document.getElementById('dirtyDot');
  if (btn) btn.disabled = false;
  if (dot) dot.classList.remove('hidden');
}

function markClean() {
  isDirty = false;
  const btn = document.getElementById('saveVarsBtn');
  const dot = document.getElementById('dirtyDot');
  if (btn) btn.disabled = true;
  if (dot) dot.classList.add('hidden');
}

function flushSave() {
  if (!isDirty || !selectedEnvId) return;
  saveVars(selectedEnvId);
  markClean();
}

function renderEnvList() {
  const list = document.getElementById('envList');
  if (envs.length === 0) {
    list.innerHTML = '<div class="env-empty">환경이 없습니다.</div>';
    return;
  }
  list.innerHTML = envs.map(env => {
    const isActive = env.id === activeEnvId;
    const isSelected = env.id === selectedEnvId;
    return \`<div class="env-item \${isSelected ? 'selected' : ''}" data-id="\${env.id}">
      <span class="env-active-dot \${isActive ? '' : 'hidden'}"></span>
      <span class="env-name">\${escHtml(env.name)}</span>
      <span class="env-actions">
        \${!isActive ? \`<button class="env-action-btn activate-btn" data-id="\${env.id}" title="활성으로 설정">▶</button>\` : ''}
        <button class="env-action-btn rename-btn" data-id="\${env.id}" title="이름 변경">✎</button>
        <button class="env-action-btn danger delete-env-btn" data-id="\${env.id}" title="삭제">✕</button>
      </span>
    </div>\`;
  }).join('');

  list.querySelectorAll('.env-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      if (isDirty) flushSave();
      selectedEnvId = item.dataset.id;
      isDirty = false;
      render();
    });
  });

  list.querySelectorAll('.activate-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isDirty) flushSave();
      vscode.postMessage({ type: 'activateEnv', payload: { envId: btn.dataset.id } });
    });
  });

  list.querySelectorAll('.rename-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isDirty) flushSave();
      vscode.postMessage({ type: 'renameEnv', payload: { envId: btn.dataset.id } });
    });
  });

  list.querySelectorAll('.delete-env-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      vscode.postMessage({ type: 'deleteEnv', payload: { envId: btn.dataset.id } });
    });
  });
}

function renderVarsArea() {
  const area = document.getElementById('varsArea');
  const env = envs.find(e => e.id === selectedEnvId);

  if (!env) {
    area.innerHTML = '<div class="no-env-selected" id="noEnvSelected"><p>환경을 선택하거나 새로 만드세요.</p></div>';
    return;
  }

  const isActive = env.id === activeEnvId;
  const entries = Object.entries(env.variables);

  area.innerHTML = \`
    <div class="vars-header">
      <span class="vars-title">\${escHtml(env.name)}<span class="vars-env-label">\${isActive ? '활성' : ''}</span></span>
      <div class="vars-header-actions">
        <span class="dirty-dot hidden" id="dirtyDot"></span>
        <button class="add-var-btn" id="addVarBtn">+ 변수 추가</button>
        <button class="save-btn" id="saveVarsBtn" disabled>저장</button>
      </div>
    </div>
    <div class="vars-table-wrap">
      <table class="vars-table">
        <thead>
          <tr>
            <th style="width:40%">KEY</th>
            <th>VALUE</th>
            <th style="width:36px"></th>
          </tr>
        </thead>
        <tbody id="varsTbody">
          \${entries.length === 0 ? \`<tr><td colspan="3"><div class="vars-empty">변수가 없습니다. 위의 버튼으로 추가하세요.</div></td></tr>\` :
            entries.map(([k, v]) => varRow(k, v)).join('')}
        </tbody>
      </table>
    </div>
    <div class="usage-guide">
      <p>요청의 URL, 헤더, 바디에서 <code>{{변수명}}</code> 형식으로 참조합니다. 예) <code>{{base_url}}/api/users</code></p>
    </div>
  \`;

  document.getElementById('addVarBtn').addEventListener('click', () => {
    addVarRow(env.id);
  });

  document.getElementById('saveVarsBtn').addEventListener('click', () => {
    saveVars(env.id);
    markClean();
  });

  attachVarRowListeners(env.id);
}

function varRow(key, value) {
  return \`<tr>
    <td><input class="var-input key-input" value="\${escAttr(key)}" placeholder="변수 이름" spellcheck="false"></td>
    <td><input class="var-input val-input" value="\${escAttr(value)}" placeholder="값" spellcheck="false"></td>
    <td><button class="delete-var-btn" title="삭제">✕</button></td>
  </tr>\`;
}

function addVarRow(envId) {
  const tbody = document.getElementById('varsTbody');
  if (!tbody) return;

  const emptyRow = tbody.querySelector('td[colspan]');
  if (emptyRow) {
    emptyRow.closest('tr').remove();
  }

  const tr = document.createElement('tr');
  tr.innerHTML = \`
    <td><input class="var-input key-input" value="" placeholder="변수 이름" spellcheck="false"></td>
    <td><input class="var-input val-input" value="" placeholder="값" spellcheck="false"></td>
    <td><button class="delete-var-btn" title="삭제">✕</button></td>
  \`;
  tbody.appendChild(tr);

  tr.querySelector('.key-input').focus();

  tr.querySelector('.key-input').addEventListener('input', markDirty);
  tr.querySelector('.val-input').addEventListener('input', markDirty);
  tr.querySelector('.delete-var-btn').addEventListener('click', () => {
    tr.remove();
    markDirty();
    if (document.getElementById('varsTbody').rows.length === 0) {
      saveVars(envId);
      markClean();
      renderVarsArea();
    }
  });
}

function attachVarRowListeners(envId) {
  const tbody = document.getElementById('varsTbody');
  if (!tbody) return;

  tbody.querySelectorAll('tr').forEach(tr => {
    const keyInput = tr.querySelector('.key-input');
    const valInput = tr.querySelector('.val-input');
    const delBtn = tr.querySelector('.delete-var-btn');

    if (keyInput) keyInput.addEventListener('input', markDirty);
    if (valInput) valInput.addEventListener('input', markDirty);
    if (delBtn) delBtn.addEventListener('click', () => {
      tr.remove();
      markDirty();
      if (tbody.rows.length === 0) {
        saveVars(envId);
        markClean();
        renderVarsArea();
      }
    });
  });
}

function saveVars(envId) {
  const tbody = document.getElementById('varsTbody');
  if (!tbody) return;
  const vars = {};
  tbody.querySelectorAll('tr').forEach(tr => {
    const key = tr.querySelector('.key-input')?.value?.trim();
    const val = tr.querySelector('.val-input')?.value ?? '';
    if (key) vars[key] = val;
  });
  vscode.postMessage({ type: 'updateVars', payload: { envId, vars } });
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

vscode.postMessage({ type: 'ready' });
`;
