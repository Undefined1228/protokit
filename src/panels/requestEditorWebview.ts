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
.auth-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.auth-inline-select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}
.auth-inline-select:focus {
  border-color: var(--vscode-focusBorder);
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

/* ── Export dropdown ───────────────────────────────────────── */
.export-dropdown {
  position: relative;
}
.export-btn {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
  border: none;
  border-radius: 3px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.export-btn:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}
.export-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--vscode-menu-background, var(--vscode-editor-background));
  border: 1px solid var(--vscode-menu-border, var(--vscode-panel-border));
  border-radius: 4px;
  padding: 4px 0;
  z-index: 100;
  min-width: 190px;
  box-shadow: 0 4px 12px rgba(0,0,0,.3);
}
.export-menu button {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 6px 14px;
  font-size: 12px;
  color: var(--vscode-menu-foreground, var(--vscode-editor-foreground));
  cursor: pointer;
}
.export-menu button:hover {
  background: var(--vscode-menu-selectionBackground, var(--vscode-list-hoverBackground));
}

/* ── Response viewer tabs ──────────────────────────────────── */
.res-tab-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--vscode-panel-border);
  padding: 0 12px;
  flex-shrink: 0;
}
.res-tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--vscode-tab-inactiveForeground, var(--vscode-foreground));
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: -1px;
  white-space: nowrap;
}
.res-tab-btn:hover { color: var(--vscode-tab-activeForeground, var(--vscode-foreground)); }
.res-tab-btn.active {
  color: var(--vscode-tab-activeForeground, var(--vscode-foreground));
  border-bottom-color: var(--vscode-focusBorder, #007acc);
}
.res-tab-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
}
.res-pane {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 120px;
}
.res-pane[hidden] { display: none; }

.toggle-btn {
  background: none;
  border: 1px solid var(--vscode-panel-border);
  color: var(--vscode-descriptionForeground);
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 11px;
  cursor: pointer;
}
.toggle-btn:hover { color: var(--vscode-editor-foreground); }
.toggle-btn.active {
  background: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border-color: var(--vscode-button-background);
}

.json-warn {
  font-size: 11px;
  color: var(--vscode-editorWarning-foreground, #cca700);
}

.res-save-btn {
  margin-left: auto;
  background: none;
  border: 1px solid var(--vscode-panel-border);
  color: var(--vscode-descriptionForeground);
  border-radius: 3px;
  padding: 2px 10px;
  font-size: 11px;
  cursor: pointer;
}
.res-save-btn:hover {
  color: var(--vscode-editor-foreground);
  border-color: var(--vscode-focusBorder);
}
.res-save-btn:disabled { opacity: 0.4; cursor: default; }

/* JSON syntax tokens */
.json-key  { color: #9cdcfe; }
.json-str  { color: #ce9178; }
.json-num  { color: #b5cea8; }
.json-bool { color: #569cd6; }
.json-null { color: #569cd6; opacity: .7; }

/* Save request button */
.save-req-btn {
  background: var(--vscode-button-secondaryBackground);
  color: var(--vscode-button-secondaryForeground);
  border: none;
  border-radius: 3px;
  padding: 5px 12px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}
.save-req-btn:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}

/* Response headers table */
.res-headers-table thead th:first-child { width: 220px; }

/* ── History panel ─────────────────────────────────────────── */
.history-toggle-btn {
  background: none;
  border: 1px solid var(--vscode-panel-border);
  color: var(--vscode-descriptionForeground);
  border-radius: 3px;
  padding: 2px 10px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
}
.history-toggle-btn:hover { color: var(--vscode-editor-foreground); }
.history-toggle-btn.active {
  color: var(--vscode-editor-foreground);
  border-color: var(--vscode-focusBorder);
  background: var(--vscode-list-activeSelectionBackground, rgba(255,255,255,.05));
}

.history-panel {
  flex-shrink: 0;
  border-bottom: 2px solid var(--vscode-panel-border);
  background: var(--vscode-sideBar-background, var(--vscode-editor-background));
  max-height: 240px;
  display: flex;
  flex-direction: column;
}
.history-panel[hidden] { display: none; }

.history-header {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.history-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--vscode-descriptionForeground);
}
.history-clear-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--vscode-descriptionForeground);
  font-size: 11px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 2px;
}
.history-clear-btn:hover {
  color: var(--vscode-errorForeground);
  background: var(--vscode-inputValidation-errorBackground);
}
.history-list { overflow-y: auto; flex: 1; }
.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.history-item:last-child { border-bottom: none; }
.history-item:hover { background: var(--vscode-list-hoverBackground); }
.hist-method {
  font-size: 11px;
  font-weight: 700;
  min-width: 56px;
  text-align: right;
}
.hist-method.GET    { color: #61affe; }
.hist-method.POST   { color: #49cc90; }
.hist-method.PUT    { color: #fca130; }
.hist-method.DELETE { color: #f93e3e; }
.hist-method.PATCH  { color: #50e3c2; }
.hist-url {
  flex: 1;
  color: var(--vscode-editor-foreground);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 11px;
}
.hist-status {
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  min-width: 36px;
  text-align: center;
}
.hist-time {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  white-space: nowrap;
  min-width: 50px;
  text-align: right;
}
.history-empty {
  padding: 14px 12px;
  font-size: 12px;
  color: var(--vscode-descriptionForeground);
}

/* ── Assertion selects ─────────────────────────────────────── */
.assertion-select {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 3px 4px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  max-width: 150px;
  width: 100%;
}
.assertion-select:focus { border-color: var(--vscode-focusBorder); }
.assertion-select:disabled { color: var(--vscode-disabledForeground); cursor: default; }

/* ── Assertion results ─────────────────────────────────────── */
.assert-results {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
.assert-summary {
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.assert-summary.all-pass { color: #49cc90; }
.assert-summary.some-fail { color: #f93e3e; }
.assert-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  font-size: 12px;
  border-bottom: 1px solid var(--vscode-panel-border);
}
.assert-row:last-child { border-bottom: none; }
.assert-icon { font-size: 13px; min-width: 14px; }
.assert-row.pass .assert-icon { color: #49cc90; }
.assert-row.fail .assert-icon { color: #f93e3e; }
.assert-desc { flex: 1; font-family: var(--vscode-editor-font-family, monospace); }
.assert-actual {
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
}
.assert-empty {
  padding: 16px 12px;
  color: var(--vscode-descriptionForeground);
  font-size: 12px;
}
.assert-res-badge {
  font-size: 10px;
  border-radius: 10px;
  padding: 0 5px;
  line-height: 16px;
  margin-left: 4px;
  display: none;
}
.assert-res-badge.visible { display: inline-block; }
.assert-res-badge.pass { background: rgba(73,204,144,.2); color: #49cc90; }
.assert-res-badge.fail { background: rgba(249,62,62,.2); color: #f93e3e; }

/* ── Response cookies indicator ────────────────────────────── */
.res-cookies {
  padding: 5px 12px;
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  border-bottom: 1px solid var(--vscode-panel-border);
  flex-shrink: 0;
}
.res-cookies span {
  color: var(--vscode-editor-foreground);
  font-family: var(--vscode-editor-font-family, monospace);
}
${AUTOCOMPLETE_CSS}${SEARCH_CSS}`;

export const HTML = `
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
  <button class="save-req-btn" id="save-req-btn">저장</button>
  <button class="cancel-btn" id="cancel-btn" hidden>취소</button>
  <div class="export-dropdown" id="export-dropdown">
    <button class="export-btn" id="export-btn">내보내기 ▾</button>
    <div class="export-menu" id="export-menu" hidden>
      <button data-fmt="curl">cURL 복사</button>
      <button data-fmt="fetch">fetch 스니펫 복사</button>
      <button data-fmt="axios">axios 스니펫 복사</button>
      <button data-fmt="python">Python requests 스니펫 복사</button>
      <button data-fmt="java">Java 11+ HttpClient 스니펫 복사</button>
      <button data-fmt="java8">Java 8 Apache HttpClient 스니펫 복사</button>
    </div>
  </div>
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
  <div class="setting-sep"></div>
  <button class="history-toggle-btn" id="history-toggle-btn">기록</button>
</div>

<div class="history-panel" id="history-panel" hidden>
  <div class="history-header">
    <span class="history-title">요청 기록</span>
    <button class="history-clear-btn" id="history-clear-btn">전체 삭제</button>
  </div>
  <div class="history-list" id="history-list">
    <p class="history-empty">기록이 없습니다.</p>
  </div>
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
  <button class="tab-btn" data-tab="cookies">
    Cookies <span class="badge" id="badge-cookies"></span>
  </button>
  <button class="tab-btn" data-tab="assertions">
    Assertions <span class="badge" id="badge-assertions"></span>
  </button>
  <div class="tab-bar-actions">
    <button class="tab-action-btn visible" id="add-param"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-header"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-body-field"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-cookie"><span class="plus">+</span> 추가</button>
    <button class="tab-action-btn" id="add-assertion"><span class="plus">+</span> 추가</button>
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

  <!-- Auth (hidden by default) -->
  <div class="tab-pane" id="tab-auth" hidden>
    <div class="auth-form">
      <div class="auth-field">
        <label for="auth-type-select">유형</label>
        <select class="auth-select" id="auth-type-select">
          <option value="none">없음</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
          <option value="apikey">API Key</option>
        </select>
      </div>
      <div id="auth-bearer-section" class="auth-section" hidden>
        <div class="auth-field">
          <label for="auth-token-input">Token</label>
          <input type="text" class="auth-token-input" id="auth-token-input" placeholder="토큰을 입력하세요..." />
        </div>
        <p class="auth-hint">Authorization: Bearer &lt;token&gt; 헤더가 자동으로 추가됩니다.</p>
      </div>
      <div id="auth-basic-section" class="auth-section" hidden>
        <div class="auth-field">
          <label for="auth-basic-username">Username</label>
          <input type="text" class="auth-token-input" id="auth-basic-username" placeholder="사용자 이름..." />
        </div>
        <div class="auth-field">
          <label for="auth-basic-password">Password</label>
          <input type="password" class="auth-token-input" id="auth-basic-password" placeholder="비밀번호..." />
        </div>
        <p class="auth-hint">Authorization: Basic &lt;base64(username:password)&gt; 헤더가 자동으로 추가됩니다.</p>
      </div>
      <div id="auth-apikey-section" class="auth-section" hidden>
        <div class="auth-field">
          <label for="auth-apikey-key">Key</label>
          <input type="text" class="auth-token-input" id="auth-apikey-key" placeholder="헤더/파라미터 이름..." />
        </div>
        <div class="auth-field">
          <label for="auth-apikey-value">Value</label>
          <input type="text" class="auth-token-input" id="auth-apikey-value" placeholder="값..." />
        </div>
        <div class="auth-field">
          <label>위치</label>
          <select class="auth-inline-select" id="auth-apikey-in">
            <option value="header">Header</option>
            <option value="query">Query Param</option>
          </select>
        </div>
        <p class="auth-hint" id="auth-apikey-hint">지정한 헤더에 key: value가 자동으로 추가됩니다.</p>
      </div>
      <p class="auth-none-hint" id="auth-none-hint">인증 없음. 유형을 선택하세요.</p>
    </div>
  </div>

  <!-- Cookies -->
  <div class="tab-pane" id="tab-cookies" hidden>
    <div class="kv-table-container">
      <table class="kv-table">
        <thead>
          <tr><th></th><th>Name</th><th>Value</th><th>Domain</th><th></th></tr>
        </thead>
        <tbody id="cookies-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Assertions -->
  <div class="tab-pane" id="tab-assertions" hidden>
    <div class="kv-table-container">
      <table class="kv-table">
        <thead>
          <tr><th></th><th>유형</th><th>경로</th><th>조건</th><th>값</th><th></th></tr>
        </thead>
        <tbody id="assertions-tbody"></tbody>
      </table>
    </div>
  </div>
</div>

<div class="response-area" id="response-area" hidden>
  <div class="response-header">
    <span class="response-title">응답</span>
    <span class="res-status" id="res-status"></span>
    <span class="res-meta-item" id="res-time"></span>
    <span class="res-meta-item" id="res-size"></span>
    <button class="res-save-btn" id="res-save-btn" disabled>저장</button>
  </div>
  <div class="redirect-chain" id="redirect-chain" hidden></div>
  <div class="res-cookies" id="res-cookies" hidden></div>
  <div class="res-tab-bar">
    <button class="res-tab-btn active" data-res-tab="body">Body</button>
    <button class="res-tab-btn" data-res-tab="headers">Headers</button>
    <button class="res-tab-btn" data-res-tab="assertions">Assertions<span id="assert-res-badge" class="assert-res-badge"></span></button>
    <div class="res-tab-actions" id="res-body-actions">
      <span class="json-warn" id="json-warn" hidden>⚠ JSON 파싱 오류</span>
      <button class="toggle-btn active" id="pretty-btn">Pretty</button>
      <button class="toggle-btn" id="raw-btn">Raw</button>
    </div>
  </div>
  <div class="res-pane" id="res-pane-body">
    <pre class="response-body-pre" id="response-body-pre"></pre>
  </div>
  <div class="res-pane" id="res-pane-headers" hidden>
    <div class="kv-table-container">
      <table class="kv-table res-headers-table">
        <thead><tr><th>Name</th><th>Value</th></tr></thead>
        <tbody id="res-headers-tbody"></tbody>
      </table>
    </div>
  </div>
  <div class="res-pane" id="res-pane-assertions" hidden>
    <div class="assert-results" id="assertion-results">
      <p class="assert-empty">검증 조건을 추가하면 결과가 여기에 표시됩니다.</p>
    </div>
  </div>
</div>
</div>
`;

export const JS = `
${AUTOCOMPLETE_JS}
${SEARCH_JS}
const vscode = acquireVsCodeApi();

/* ── 환경변수 ──────────────────────────────────────────────── */
let envVars = {};

function substituteVars(str) {
  return str.replace(/\{\{([^}]+)\}\}/g, (_, name) => {
    const key = name.trim();
    return key in envVars ? envVars[key] : '{{' + name + '}}';
  });
}

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
    basicUsername: '',
    basicPassword: '',
    apiKeyKey: '',
    apiKeyValue: '',
    apiKeyIn: 'header',
  },
  _nextId: 1,
};

const cookieJar = []; // { id, name, value, domain, path, enabled }
const assertions = []; // { id, enabled, type, operator, target, value }
const MAX_HISTORY = 50;
const reqHistory = []; // { id, ts, method, url, params, headers, body, auth, res }
let currentBodyRaw = '';
let currentBodyMime = '';

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
  document.getElementById('add-cookie').classList.toggle('visible', tab === 'cookies');
  document.getElementById('add-assertion').classList.toggle('visible', tab === 'assertions');
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


/* ── Badge 업데이트 ────────────────────────────────────────── */
function updateBadges() {
  const activeParams = state.params.filter(p => p.enabled && (p.key || p.value));
  const userHeaders = state.headers.filter(h => !h.managed && h.enabled && (h.key || h.value));
  const managedHeaders = state.headers.filter(h => h.managed && h.enabled);

  setBadge('params', activeParams.length);
  setBadge('headers', userHeaders.length + managedHeaders.length);
  setBadge('body', state.body.type !== 'none' ? 1 : 0);
  setBadge('auth', state.auth.type !== 'none' ? 1 : 0);
  setBadge('cookies', cookieJar.filter(c => c.enabled && c.name).length);
  setBadge('assertions', assertions.filter(a => a.enabled).length);
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
    window.__ac.attach(valInput);
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
function setManagedHeader(key, value) {
  const idx = state.headers.findIndex(h => h.managed === 'authorization');
  if (value) {
    if (idx >= 0) {
      state.headers[idx].key = key;
      state.headers[idx].value = value;
    } else {
      const contentTypeIdx = state.headers.findIndex(h => h.managed === 'content-type');
      const insertAt = contentTypeIdx >= 0 ? contentTypeIdx + 1 : 0;
      state.headers.splice(insertAt, 0, {
        id: nextId(),
        enabled: true,
        key,
        value,
        managed: 'authorization',
      });
    }
  } else {
    if (idx >= 0) state.headers.splice(idx, 1);
  }
}

function updateAuthorizationHeader(authType, auth) {
  if (authType === 'bearer') {
    const token = (auth.token ?? '').trim();
    setManagedHeader('Authorization', token ? 'Bearer ' + token : '');
  } else if (authType === 'basic') {
    const u = (auth.basicUsername ?? '').trim();
    const p = (auth.basicPassword ?? '');
    setManagedHeader('Authorization', (u || p) ? 'Basic ' + btoa(u + ':' + p) : '');
  } else if (authType === 'apikey') {
    const k = (auth.apiKeyKey ?? '').trim();
    const v = (auth.apiKeyValue ?? '');
    if (auth.apiKeyIn === 'header') {
      setManagedHeader(k || 'X-API-Key', k ? v : '');
    } else {
      const idx = state.headers.findIndex(h => h.managed === 'authorization');
      if (idx >= 0) state.headers.splice(idx, 1);
    }
  } else {
    const idx = state.headers.findIndex(h => h.managed === 'authorization');
    if (idx >= 0) state.headers.splice(idx, 1);
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
const authNoneHint = document.getElementById('auth-none-hint');
const authTokenInput = document.getElementById('auth-token-input');
const authBasicUsername = document.getElementById('auth-basic-username');
const authBasicPassword = document.getElementById('auth-basic-password');
const authApiKeyKey = document.getElementById('auth-apikey-key');
const authApiKeyValue = document.getElementById('auth-apikey-value');
const authApiKeyIn = document.getElementById('auth-apikey-in');
const authApiKeyHint = document.getElementById('auth-apikey-hint');

function showAuthSection(type) {
  document.getElementById('auth-bearer-section').hidden = type !== 'bearer';
  document.getElementById('auth-basic-section').hidden  = type !== 'basic';
  document.getElementById('auth-apikey-section').hidden = type !== 'apikey';
  authNoneHint.hidden = type !== 'none';
}

function updateApiKeyHint() {
  const inVal = authApiKeyIn.value;
  authApiKeyHint.textContent = inVal === 'query'
    ? '쿼리 파라미터에 key=value가 자동으로 추가됩니다.'
    : '지정한 헤더에 key: value가 자동으로 추가됩니다.';
}

authTypeSelect.addEventListener('change', () => {
  const type = authTypeSelect.value;
  state.auth.type = type;
  showAuthSection(type);
  updateAuthorizationHeader(type, state.auth);
  updateBadges();
});

authTokenInput.addEventListener('input', () => {
  state.auth.token = authTokenInput.value;
  updateAuthorizationHeader(state.auth.type, state.auth);
});

authBasicUsername.addEventListener('input', () => {
  state.auth.basicUsername = authBasicUsername.value;
  updateAuthorizationHeader(state.auth.type, state.auth);
});

authBasicPassword.addEventListener('input', () => {
  state.auth.basicPassword = authBasicPassword.value;
  updateAuthorizationHeader(state.auth.type, state.auth);
});

authApiKeyKey.addEventListener('input', () => {
  state.auth.apiKeyKey = authApiKeyKey.value;
  updateAuthorizationHeader(state.auth.type, state.auth);
});

authApiKeyValue.addEventListener('input', () => {
  state.auth.apiKeyValue = authApiKeyValue.value;
  updateAuthorizationHeader(state.auth.type, state.auth);
});

authApiKeyIn.addEventListener('change', () => {
  state.auth.apiKeyIn = authApiKeyIn.value;
  updateApiKeyHint();
  updateAuthorizationHeader(state.auth.type, state.auth);
});

/* ── 히스토리 ──────────────────────────────────────────────── */
function formatTimeAgo(ts) {
  const d = Date.now() - ts;
  if (d < 60000) return '방금 전';
  if (d < 3600000) return Math.floor(d / 60000) + '분 전';
  if (d < 86400000) return Math.floor(d / 3600000) + '시간 전';
  return Math.floor(d / 86400000) + '일 전';
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!reqHistory.length) {
    list.innerHTML = '<p class="history-empty">기록이 없습니다.</p>';
    return;
  }
  list.innerHTML = '';
  reqHistory.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';

    const mSpan = document.createElement('span');
    mSpan.className = 'hist-method ' + entry.method;
    mSpan.textContent = entry.method;

    const uSpan = document.createElement('span');
    uSpan.className = 'hist-url';
    uSpan.title = entry.url;
    uSpan.textContent = entry.url;

    const tSpan = document.createElement('span');
    tSpan.className = 'hist-time';
    tSpan.textContent = formatTimeAgo(entry.ts);

    item.append(mSpan, uSpan);

    if (entry.res) {
      const sSpan = document.createElement('span');
      sSpan.className = 'hist-status ' + statusClass(entry.res.status);
      sSpan.textContent = String(entry.res.status);
      item.appendChild(sSpan);
    }

    item.appendChild(tSpan);
    item.addEventListener('click', () => restoreHistory(entry));
    list.appendChild(item);
  });
}

function saveToHistory(res) {
  reqHistory.unshift({
    id: nextId(),
    ts: Date.now(),
    method: state.method,
    url: state.url,
    params: JSON.parse(JSON.stringify(state.params)),
    headers: JSON.parse(JSON.stringify(state.headers.filter(h => !h.managed))),
    body: JSON.parse(JSON.stringify(state.body)),
    auth: JSON.parse(JSON.stringify(state.auth)),
    res: res ? { status: res.status, statusText: res.statusText, duration: res.duration, size: res.size } : null,
  });
  if (reqHistory.length > MAX_HISTORY) reqHistory.length = MAX_HISTORY;
  renderHistory();
}

function restoreHistory(entry) {
  state.method = entry.method;
  const methodSel = document.getElementById('method-select');
  methodSel.value = entry.method;
  methodSel.className = 'method-select ' + entry.method;

  state.url = entry.url;
  document.getElementById('url-input').value = entry.url;

  state.params = JSON.parse(JSON.stringify(entry.params));
  renderParams();

  const managed = state.headers.filter(h => h.managed);
  state.headers = [...managed, ...JSON.parse(JSON.stringify(entry.headers))];

  state.auth = JSON.parse(JSON.stringify(entry.auth));
  document.getElementById('auth-type-select').value = state.auth.type;
  document.getElementById('auth-token-input').value = state.auth.token ?? '';
  document.getElementById('auth-basic-username').value = state.auth.basicUsername ?? '';
  document.getElementById('auth-basic-password').value = state.auth.basicPassword ?? '';
  document.getElementById('auth-apikey-key').value = state.auth.apiKeyKey ?? '';
  document.getElementById('auth-apikey-value').value = state.auth.apiKeyValue ?? '';
  document.getElementById('auth-apikey-in').value = state.auth.apiKeyIn ?? 'header';
  showAuthSection(state.auth.type);
  updateApiKeyHint();
  updateAuthorizationHeader(state.auth.type, state.auth);

  state.body = JSON.parse(JSON.stringify(entry.body));
  const radio = document.querySelector('input[name="body-type"][value="' + entry.body.type + '"]');
  if (radio) radio.checked = true;
  switchBodyEditor(entry.body.type);
  document.getElementById('body-json-textarea').value = entry.body.json;
  updateContentTypeHeader(entry.body.type);
  renderFormData();
  renderUrlEncoded();

  renderHeaders();
  updateBadges();

  document.getElementById('history-panel').hidden = true;
  document.getElementById('history-toggle-btn').classList.remove('active');
  switchTab('params');
}

document.getElementById('history-toggle-btn').addEventListener('click', () => {
  const panel = document.getElementById('history-panel');
  const btn = document.getElementById('history-toggle-btn');
  panel.hidden = !panel.hidden;
  btn.classList.toggle('active', !panel.hidden);
});

document.getElementById('history-clear-btn').addEventListener('click', () => {
  reqHistory.length = 0;
  renderHistory();
});

/* ── 응답 뷰어 탭 ───────────────────────────────────────────── */
function switchResTab(tab) {
  document.querySelectorAll('.res-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.resTab === tab);
  });
  document.getElementById('res-pane-body').hidden = tab !== 'body';
  document.getElementById('res-pane-headers').hidden = tab !== 'headers';
  document.getElementById('res-pane-assertions').hidden = tab !== 'assertions';
  document.getElementById('res-body-actions').style.display = tab === 'body' ? 'flex' : 'none';
}

document.querySelectorAll('.res-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchResTab(btn.dataset.resTab));
});

/* ── Pretty / Raw 토글 ─────────────────────────────────────── */
let isPretty = true;

function applyBodyView() {
  const pre = document.getElementById('response-body-pre');
  const warn = document.getElementById('json-warn');
  if (isPretty) {
    const looksJson = currentBodyRaw.trimStart().startsWith('{') || currentBodyRaw.trimStart().startsWith('[');
    if (looksJson) {
      try {
        const formatted = JSON.stringify(JSON.parse(currentBodyRaw), null, 2);
        warn.hidden = true;
        pre.innerHTML = highlightJson(formatted);
        return;
      } catch {
        warn.hidden = false;
      }
    } else {
      warn.hidden = true;
    }
  }
  pre.textContent = currentBodyRaw;
}

function highlightJson(text) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(
    /("(?:[^"\\\\]|\\\\.)*"(?:\\s*:)?|true|false|null|-?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)/g,
    match => {
      if (match.endsWith(':')) {
        return '<span class="json-key">' + match.slice(0, -1) + '</span>:';
      }
      if (match.startsWith('"')) return '<span class="json-str">' + match + '</span>';
      if (match === 'true' || match === 'false') return '<span class="json-bool">' + match + '</span>';
      if (match === 'null') return '<span class="json-null">' + match + '</span>';
      return '<span class="json-num">' + match + '</span>';
    }
  );
}

document.getElementById('pretty-btn').addEventListener('click', () => {
  isPretty = true;
  document.getElementById('pretty-btn').classList.add('active');
  document.getElementById('raw-btn').classList.remove('active');
  applyBodyView();
});

document.getElementById('raw-btn').addEventListener('click', () => {
  isPretty = false;
  document.getElementById('raw-btn').classList.add('active');
  document.getElementById('pretty-btn').classList.remove('active');
  applyBodyView();
});

/* ── 응답 body 저장 ────────────────────────────────────────── */
document.getElementById('res-save-btn').addEventListener('click', () => {
  if (!currentBodyRaw) return;
  vscode.postMessage({ type: 'saveBody', payload: { body: currentBodyRaw, mimeType: currentBodyMime } });
});

/* ── Cookies ───────────────────────────────────────────────── */
function renderCookies() {
  const tbody = document.getElementById('cookies-tbody');
  tbody.innerHTML = '';

  cookieJar.forEach(item => {
    const tr = document.createElement('tr');

    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'kv-checkbox';
    checkbox.checked = item.enabled;
    checkbox.addEventListener('change', () => { item.enabled = checkbox.checked; updateBadges(); });
    tdCheck.appendChild(checkbox);

    const tdName = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'kv-input';
    nameInput.placeholder = 'Name';
    nameInput.value = item.name;
    nameInput.addEventListener('input', () => { item.name = nameInput.value; updateBadges(); });
    tdName.appendChild(nameInput);

    const tdVal = document.createElement('td');
    const valInput = document.createElement('input');
    valInput.type = 'text';
    valInput.className = 'kv-input';
    valInput.placeholder = 'Value';
    valInput.value = item.value;
    valInput.addEventListener('input', () => { item.value = valInput.value; });
    tdVal.appendChild(valInput);

    const tdDomain = document.createElement('td');
    const domainInput = document.createElement('input');
    domainInput.type = 'text';
    domainInput.className = 'kv-input';
    domainInput.placeholder = 'Domain';
    domainInput.value = item.domain;
    domainInput.addEventListener('input', () => { item.domain = domainInput.value; });
    tdDomain.appendChild(domainInput);

    const tdDel = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '×';
    delBtn.title = '삭제';
    delBtn.addEventListener('click', () => {
      const idx = cookieJar.indexOf(item);
      if (idx >= 0) cookieJar.splice(idx, 1);
      renderCookies();
      updateBadges();
    });
    tdDel.appendChild(delBtn);

    tr.append(tdCheck, tdName, tdVal, tdDomain, tdDel);
    tbody.appendChild(tr);
  });

  updateBadges();
}

function mergeCookies(setCookies) {
  for (const cookie of setCookies) {
    if (!cookie.name) continue;
    const existing = cookieJar.find(c => c.name === cookie.name && c.domain === cookie.domain);
    if (existing) {
      existing.value = cookie.value;
    } else {
      cookieJar.push({
        id: nextId(),
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        enabled: true,
      });
    }
  }
  renderCookies();
}

function collectCookies(urlStr) {
  if (!cookieJar.length) return {};
  let hostname = '';
  let pathname = '/';
  try {
    const u = new URL(urlStr);
    hostname = u.hostname;
    pathname = u.pathname;
  } catch { return {}; }

  const result = {};
  for (const c of cookieJar) {
    if (!c.enabled || !c.name) continue;
    const domain = c.domain ? c.domain.replace(/^\./, '') : '';
    if (domain && !hostname.endsWith(domain)) continue;
    if (!pathname.startsWith(c.path || '/')) continue;
    result[c.name] = c.value;
  }
  return result;
}

document.getElementById('add-cookie').addEventListener('click', () => {
  cookieJar.push({ id: nextId(), name: '', value: '', domain: '', path: '/', enabled: true });
  renderCookies();
});

/* ── Assertions ──────────────────────────────────────────────── */
function renderAssertions() {
  const tbody = document.getElementById('assertions-tbody');
  tbody.innerHTML = '';
  assertions.forEach(function(a) {
    const tr = document.createElement('tr');

    const tdCheck = document.createElement('td');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'kv-checkbox';
    cb.checked = a.enabled;
    cb.addEventListener('change', function() { a.enabled = cb.checked; updateBadges(); });
    tdCheck.appendChild(cb);

    const tdType = document.createElement('td');
    const typeSelect = document.createElement('select');
    typeSelect.className = 'assertion-select';
    [['status','Status Code'],['body_exists','Body 필드 존재'],['body_eq','Body 필드 값'],['duration','응답 시간']].forEach(function(pair) {
      const opt = document.createElement('option');
      opt.value = pair[0]; opt.textContent = pair[1];
      if (a.type === pair[0]) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', function() {
      a.type = typeSelect.value;
      if (a.type === 'body_exists') { a.operator = 'exists'; }
      else if (a.operator === 'exists') { a.operator = '==='; }
      renderAssertions();
    });
    tdType.appendChild(typeSelect);

    const tdTarget = document.createElement('td');
    const targetInput = document.createElement('input');
    targetInput.type = 'text';
    targetInput.className = 'kv-input';
    targetInput.placeholder = 'user.id';
    targetInput.value = a.target;
    targetInput.disabled = a.type === 'status' || a.type === 'duration';
    targetInput.addEventListener('input', function() { a.target = targetInput.value; });
    tdTarget.appendChild(targetInput);

    const tdOp = document.createElement('td');
    const opSelect = document.createElement('select');
    opSelect.className = 'assertion-select';
    if (a.type === 'body_exists') {
      const opt = document.createElement('option');
      opt.value = 'exists'; opt.textContent = 'exists';
      opSelect.appendChild(opt);
      opSelect.disabled = true;
    } else {
      ['===','!==','<','<=','>','>='].forEach(function(op) {
        const opt = document.createElement('option');
        opt.value = op; opt.textContent = op;
        if (a.operator === op) opt.selected = true;
        opSelect.appendChild(opt);
      });
      opSelect.addEventListener('change', function() { a.operator = opSelect.value; });
    }
    tdOp.appendChild(opSelect);

    const tdVal = document.createElement('td');
    const valInput = document.createElement('input');
    valInput.type = 'text';
    valInput.className = 'kv-input';
    valInput.placeholder = a.type === 'status' ? '200' : a.type === 'duration' ? '500' : '기대값';
    valInput.value = a.value;
    valInput.disabled = a.type === 'body_exists';
    valInput.addEventListener('input', function() { a.value = valInput.value; });
    tdVal.appendChild(valInput);

    const tdDel = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '×';
    delBtn.title = '삭제';
    delBtn.addEventListener('click', function() {
      const idx = assertions.indexOf(a);
      if (idx >= 0) assertions.splice(idx, 1);
      renderAssertions();
    });
    tdDel.appendChild(delBtn);

    tr.append(tdCheck, tdType, tdTarget, tdOp, tdVal, tdDel);
    tbody.appendChild(tr);
  });
  updateBadges();
}

document.getElementById('add-assertion').addEventListener('click', function() {
  assertions.push({ id: nextId(), enabled: true, type: 'status', operator: '===', target: '', value: '200' });
  renderAssertions();
});

function getBodyPath(obj, path) {
  if (obj === null || obj === undefined || !path) return undefined;
  return path.split('.').reduce(function(o, k) {
    return (o && typeof o === 'object' && k in o) ? o[k] : undefined;
  }, obj);
}

function compareNum(actual, op, expected) {
  if (op === '===') return actual === expected;
  if (op === '!==') return actual !== expected;
  if (op === '<') return actual < expected;
  if (op === '<=') return actual <= expected;
  if (op === '>') return actual > expected;
  if (op === '>=') return actual >= expected;
  return false;
}

function compareStr(actual, op, expected) {
  if (op === '===') return actual === expected;
  if (op === '!==') return actual !== expected;
  return false;
}

function evaluateAssertions(res) {
  var results = [];
  var parsedBody = null;
  try { parsedBody = JSON.parse(res.body || ''); } catch (e) {}

  assertions.filter(function(a) { return a.enabled; }).forEach(function(a) {
    var pass = false;
    var actual = '';
    var description = '';

    if (a.type === 'status') {
      var expected = parseInt(a.value, 10);
      actual = String(res.status);
      pass = compareNum(res.status, a.operator, expected);
      description = 'Status ' + a.operator + ' ' + a.value;
    } else if (a.type === 'body_exists') {
      var val = getBodyPath(parsedBody, a.target);
      actual = val === undefined ? 'undefined' : JSON.stringify(val);
      pass = val !== undefined && val !== null;
      description = 'body.' + a.target + ' exists';
    } else if (a.type === 'body_eq') {
      var val2 = getBodyPath(parsedBody, a.target);
      actual = val2 === undefined ? 'undefined' : String(val2);
      pass = compareStr(val2 !== undefined ? String(val2) : '', a.operator, a.value);
      description = 'body.' + a.target + ' ' + a.operator + ' "' + a.value + '"';
    } else if (a.type === 'duration') {
      var exp2 = parseInt(a.value, 10);
      actual = String(res.duration) + 'ms';
      pass = compareNum(res.duration, a.operator, exp2);
      description = '응답 시간 ' + a.operator + ' ' + a.value + 'ms';
    }

    results.push({ pass: pass, actual: actual, description: description });
  });
  return results;
}

function showAssertionResults(results) {
  var container = document.getElementById('assertion-results');
  var badge = document.getElementById('assert-res-badge');

  if (!results.length) {
    container.innerHTML = '<p class="assert-empty">검증 조건을 추가하면 결과가 여기에 표시됩니다.</p>';
    badge.className = 'assert-res-badge';
    return;
  }

  var passed = results.filter(function(r) { return r.pass; }).length;
  var total = results.length;
  var failed = total - passed;

  var html = '<div class="assert-summary ' + (failed > 0 ? 'some-fail' : 'all-pass') + '">' +
    (failed > 0 ? '✗ ' + failed + '개 실패  ·  ' : '✓ ') + passed + '/' + total + ' 통과</div>';

  results.forEach(function(r) {
    html += '<div class="assert-row ' + (r.pass ? 'pass' : 'fail') + '">' +
      '<span class="assert-icon">' + (r.pass ? '✓' : '✗') + '</span>' +
      '<span class="assert-desc">' + escHtml(r.description) + '</span>' +
      '<span class="assert-actual">실제: ' + escHtml(r.actual) + '</span>' +
      '</div>';
  });

  container.innerHTML = html;

  badge.className = 'assert-res-badge visible ' + (failed > 0 ? 'fail' : 'pass');
  badge.textContent = failed > 0 ? failed + ' 실패' : passed + '/' + total;
}

/* ── 초기화 ────────────────────────────────────────────────── */
renderParams();
renderHeaders();
renderFormData();
renderUrlEncoded();
renderCookies();
renderAssertions();
updateBadges();
window.__ac.init(['url-input']);
window.__ac.attach(document.getElementById('body-json-textarea'));
window.__search.setTargets(['response-body-pre']);
vscode.postMessage({ type: 'ready' });

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
  const rawUrl = buildUrl();
  if (!rawUrl) {
    document.getElementById('url-input').focus();
    return;
  }

  const url = substituteVars(rawUrl);
  let { body, contentType } = collectBody();
  const headers = collectHeaders();
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  if (body) body = substituteVars(body);
  for (const k of Object.keys(headers)) {
    headers[k] = substituteVars(headers[k]);
  }

  setSending(true);

  const cookies = collectCookies(url);

  vscode.postMessage({
    type: 'sendRequest',
    payload: {
      method: state.method,
      url,
      headers,
      body,
      cookies: Object.keys(cookies).length ? cookies : undefined,
      timeout: settings.timeout,
      sslIgnore: settings.sslIgnore,
      proxyHttp: settings.proxyHttp || undefined,
      proxyHttps: settings.proxyHttps || undefined,
      rawUrl: state.url,
      params: state.params.filter(p => !p.managed).map(p => ({ enabled: p.enabled, key: p.key, value: p.value })),
      rawHeaders: state.headers.filter(h => !h.managed).map(h => ({ enabled: h.enabled, key: h.key, value: h.value })),
      bodyType: state.body.type,
      rawBody: state.body.json,
      bodyFormData: state.body.formData.map(f => ({ enabled: f.enabled, key: f.key, value: f.value })),
      bodyUrlEncoded: state.body.urlEncoded.map(f => ({ enabled: f.enabled, key: f.key, value: f.value })),
      authType: state.auth.type,
      authToken: state.auth.token,
      authBasicUsername: state.auth.basicUsername,
      authBasicPassword: state.auth.basicPassword,
      authApiKeyKey: state.auth.apiKeyKey,
      authApiKeyValue: state.auth.apiKeyValue,
      authApiKeyIn: state.auth.apiKeyIn,
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

  const cookiesEl = document.getElementById('res-cookies');
  if (res.setCookies && res.setCookies.length) {
    cookiesEl.hidden = false;
    cookiesEl.innerHTML = '쿠키 수신: ' +
      res.setCookies.map(c => '<span>' + escHtml(c.name) + '=' + escHtml(c.value) + '</span>').join(', ');
    mergeCookies(res.setCookies);
  } else {
    cookiesEl.hidden = true;
  }

  // 응답 헤더 테이블
  const headersTbody = document.getElementById('res-headers-tbody');
  headersTbody.innerHTML = '';
  if (res.headers) {
    Object.entries(res.headers).forEach(([k, v]) => {
      const tr = document.createElement('tr');
      const tdK = document.createElement('td');
      tdK.className = 'kv-input';
      tdK.style.cssText = 'padding:3px 8px; font-size:12px; font-family:var(--vscode-editor-font-family,monospace);';
      tdK.textContent = k;
      const tdV = document.createElement('td');
      tdV.style.cssText = 'padding:3px 8px; font-size:12px; word-break:break-all;';
      tdV.textContent = v;
      tr.append(tdK, tdV);
      headersTbody.appendChild(tr);
    });
  }

  // body 상태 업데이트
  currentBodyRaw = res.body ?? '';
  currentBodyMime = (res.headers && res.headers['content-type']) || '';

  isPretty = true;
  document.getElementById('pretty-btn').classList.add('active');
  document.getElementById('raw-btn').classList.remove('active');
  applyBodyView();

  document.getElementById('res-save-btn').disabled = !currentBodyRaw;

  const assertResults = evaluateAssertions(res);
  showAssertionResults(assertResults);

  switchResTab('body');
  saveToHistory(res);
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
  document.getElementById('res-cookies').hidden = true;
  document.getElementById('json-warn').hidden = true;
  document.getElementById('res-save-btn').disabled = true;
  document.getElementById('res-headers-tbody').innerHTML = '';
  document.getElementById('assertion-results').innerHTML = '<p class="assert-empty">요청 오류로 검증을 실행할 수 없습니다.</p>';
  document.getElementById('assert-res-badge').className = 'assert-res-badge';
  currentBodyRaw = message;
  currentBodyMime = '';
  document.getElementById('response-body-pre').textContent = message;
  switchResTab('body');
  saveToHistory(null);
}

window.addEventListener('message', event => {
  const msg = event.data;
  if (msg.type === 'response') {
    showResponse(msg.payload);
  } else if (msg.type === 'requestError') {
    showError(msg.payload.message);
  } else if (msg.type === 'loadRequest') {
    loadRequest(msg.payload);
  } else if (msg.type === 'setEnvVars') {
    envVars = msg.payload ?? {};
    window.__ac.setVars(envVars);
  }
});

/* ── 요청 불러오기 ──────────────────────────────────────────── */
function loadRequest(req) {
  state.method = req.method;
  const methodSel = document.getElementById('method-select');
  methodSel.value = req.method;
  methodSel.className = 'method-select ' + req.method;

  state.url = req.url;
  document.getElementById('url-input').value = req.url;

  state.params = (req.params ?? []).map(p => ({ ...p, id: nextId(), managed: null }));
  renderParams();

  const managed = state.headers.filter(h => h.managed);
  state.headers = [...managed, ...(req.headers ?? []).map(h => ({ ...h, id: nextId(), managed: null }))];

  state.auth = {
    type: req.authType ?? 'none',
    token: req.authToken ?? '',
    basicUsername: req.authBasicUsername ?? '',
    basicPassword: req.authBasicPassword ?? '',
    apiKeyKey: req.authApiKeyKey ?? '',
    apiKeyValue: req.authApiKeyValue ?? '',
    apiKeyIn: req.authApiKeyIn ?? 'header',
  };
  document.getElementById('auth-type-select').value = state.auth.type;
  document.getElementById('auth-token-input').value = state.auth.token;
  document.getElementById('auth-basic-username').value = state.auth.basicUsername;
  document.getElementById('auth-basic-password').value = state.auth.basicPassword;
  document.getElementById('auth-apikey-key').value = state.auth.apiKeyKey;
  document.getElementById('auth-apikey-value').value = state.auth.apiKeyValue;
  document.getElementById('auth-apikey-in').value = state.auth.apiKeyIn;
  showAuthSection(state.auth.type);
  updateApiKeyHint();
  updateAuthorizationHeader(state.auth.type, state.auth);

  state.body = {
    type: req.bodyType ?? 'none',
    json: req.body ?? '',
    formData: (req.bodyFormData ?? []).map(f => ({ ...f, id: nextId(), managed: null })),
    urlEncoded: (req.bodyUrlEncoded ?? []).map(f => ({ ...f, id: nextId(), managed: null })),
  };
  const radio = document.querySelector('input[name="body-type"][value="' + state.body.type + '"]');
  if (radio) radio.checked = true;
  switchBodyEditor(state.body.type);
  document.getElementById('body-json-textarea').value = state.body.json;
  updateContentTypeHeader(state.body.type);
  renderFormData();
  renderUrlEncoded();

  assertions.length = 0;
  (req.assertions ?? []).forEach(function(a) {
    assertions.push({ id: nextId(), enabled: a.enabled, type: a.type, operator: a.operator, target: a.target, value: a.value });
  });
  renderAssertions();

  if (req.timeout !== undefined) {
    settings.timeout = req.timeout;
    document.getElementById('timeout-input').value = String(req.timeout);
  }
  if (req.sslIgnore !== undefined) {
    settings.sslIgnore = req.sslIgnore;
    document.getElementById('ssl-ignore').checked = req.sslIgnore;
  }

  renderHeaders();
  updateBadges();
  switchTab('params');
}

/* ── 요청 저장 버튼 ────────────────────────────────────────── */
document.getElementById('save-req-btn').addEventListener('click', () => {
  vscode.postMessage({
    type: 'saveRequest',
    payload: {
      method: state.method,
      url: state.url,
      params: state.params.filter(p => !p.managed).map(p => ({ enabled: p.enabled, key: p.key, value: p.value })),
      headers: state.headers.filter(h => !h.managed).map(h => ({ enabled: h.enabled, key: h.key, value: h.value })),
      bodyType: state.body.type,
      body: state.body.json,
      bodyFormData: state.body.formData.map(f => ({ enabled: f.enabled, key: f.key, value: f.value })),
      bodyUrlEncoded: state.body.urlEncoded.map(f => ({ enabled: f.enabled, key: f.key, value: f.value })),
      authType: state.auth.type,
      authToken: state.auth.token,
      authBasicUsername: state.auth.basicUsername,
      authBasicPassword: state.auth.basicPassword,
      authApiKeyKey: state.auth.apiKeyKey,
      authApiKeyValue: state.auth.apiKeyValue,
      authApiKeyIn: state.auth.apiKeyIn,
      timeout: settings.timeout,
      sslIgnore: settings.sslIgnore,
      assertions: assertions.map(function(a) {
        return { enabled: a.enabled, type: a.type, operator: a.operator, target: a.target, value: a.value };
      }),
    },
  });
});

/* ── 요청 내보내기 ─────────────────────────────────────────── */
function buildCurl(url, headers, body) {
  const lines = ['curl'];
  if (state.method !== 'GET') lines.push(\`-X \${state.method}\`);
  if (settings.sslIgnore) lines.push('-k');
  for (const [k, v] of Object.entries(headers)) {
    lines.push(\`-H \${JSON.stringify(k + ': ' + v)}\`);
  }
  if (body) lines.push(\`-d \${JSON.stringify(body)}\`);
  lines.push(JSON.stringify(url));
  return lines.join(' \\\\\\n  ');
}

function buildFetch(url, headers, body) {
  const opts = { method: state.method };
  if (Object.keys(headers).length) opts.headers = headers;
  if (body) opts.body = body;
  return \`fetch(\${JSON.stringify(url)}, \${JSON.stringify(opts, null, 2)})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);\`;
}

function buildAxios(url, headers, body) {
  const config = { method: state.method.toLowerCase(), url };
  if (Object.keys(headers).length) config.headers = headers;
  if (body) {
    try { config.data = JSON.parse(body); } catch { config.data = body; }
  }
  return \`import axios from 'axios';

axios(\${JSON.stringify(config, null, 2)})
  .then(res => console.log(res.data))
  .catch(console.error);\`;
}

function buildPython(url, headers, body) {
  const lines = ['import requests', ''];
  const hasHeaders = Object.keys(headers).length > 0;
  if (hasHeaders) {
    lines.push(\`headers = \${JSON.stringify(headers, null, 4)}\`, '');
  }
  const method = state.method.toLowerCase();
  const headersArg = hasHeaders ? '\\n    headers=headers,' : '';
  let dataArg = '';
  if (body) {
    const ct = (headers['content-type'] || headers['Content-Type'] || '').toLowerCase();
    if (ct.includes('application/json')) {
      lines.splice(1, 0, 'import json');
      dataArg = \`\\n    json=json.loads(\${JSON.stringify(body)}),\`;
    } else {
      dataArg = \`\\n    data=\${JSON.stringify(body)},\`;
    }
  }
  lines.push(\`response = requests.\${method}(\${JSON.stringify(url)},\${headersArg}\${dataArg}\\n)\`);
  lines.push('print(response.status_code)');
  lines.push('print(response.json())');
  return lines.join('\\n');
}

function buildJava(url, headers, body) {
  const lines = [
    'import java.net.URI;',
    'import java.net.http.HttpClient;',
    'import java.net.http.HttpRequest;',
    'import java.net.http.HttpResponse;',
    '',
    'HttpClient client = HttpClient.newHttpClient();',
    '',
  ];

  const builderLines = [\`HttpRequest request = HttpRequest.newBuilder()\`];
  builderLines.push(\`    .uri(URI.create(\${JSON.stringify(url)}))\`);

  for (const [k, v] of Object.entries(headers)) {
    builderLines.push(\`    .header(\${JSON.stringify(k)}, \${JSON.stringify(v)})\`);
  }

  if (body) {
    builderLines.push(\`    .method(\${JSON.stringify(state.method)}, HttpRequest.BodyPublishers.ofString(\${JSON.stringify(body)}))\`);
  } else if (state.method === 'GET' || state.method === 'DELETE') {
    builderLines.push(\`    .\${state.method.charAt(0) + state.method.slice(1).toLowerCase()}()\`);
  } else {
    builderLines.push(\`    .method(\${JSON.stringify(state.method)}, HttpRequest.BodyPublishers.noBody())\`);
  }

  builderLines.push('    .build();');
  lines.push(builderLines.join('\\n'));
  lines.push('');
  lines.push('HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());');
  lines.push('System.out.println(response.statusCode());');
  lines.push('System.out.println(response.body());');
  return lines.join('\\n');
}

function buildJava8(url, headers, body) {
  const method = state.method;
  const methodClass = {
    GET: 'HttpGet', POST: 'HttpPost', PUT: 'HttpPut',
    DELETE: 'HttpDelete', PATCH: 'HttpPatch',
  }[method] || \`Http\${method.charAt(0) + method.slice(1).toLowerCase()}\`;
  const hasBody = body && ['POST', 'PUT', 'PATCH'].includes(method);

  const lines = [
    '// Apache HttpClient 4.x (Java 8+)',
    '// Maven: org.apache.httpcomponents:httpclient:4.5.14',
    '',
    'import org.apache.http.client.methods.' + methodClass + ';',
  ];
  if (hasBody) {
    lines.push('import org.apache.http.entity.StringEntity;');
  }
  lines.push(
    'import org.apache.http.impl.client.CloseableHttpClient;',
    'import org.apache.http.impl.client.HttpClients;',
    'import org.apache.http.util.EntityUtils;',
    '',
    'CloseableHttpClient client = HttpClients.createDefault();',
    \`\${methodClass} request = new \${methodClass}(\${JSON.stringify(url)});\`,
  );

  for (const [k, v] of Object.entries(headers)) {
    lines.push(\`request.setHeader(\${JSON.stringify(k)}, \${JSON.stringify(v)});\`);
  }

  if (hasBody) {
    lines.push(\`request.setEntity(new StringEntity(\${JSON.stringify(body)}, "UTF-8"));\`);
  }

  lines.push(
    '',
    'try (CloseableHttpResponse response = client.execute(request)) {',
    '    System.out.println(response.getStatusLine().getStatusCode());',
    '    System.out.println(EntityUtils.toString(response.getEntity()));',
    '}',
    'client.close();',
  );
  return lines.join('\\n');
}

function copyExport(fmt) {
  const url = buildUrl();
  if (!url) { document.getElementById('url-input').focus(); return; }

  const { body, contentType } = collectBody();
  const headers = collectHeaders();
  if (contentType) headers['Content-Type'] = contentType;

  let text;
  switch (fmt) {
    case 'curl':   text = buildCurl(url, headers, body);   break;
    case 'fetch':  text = buildFetch(url, headers, body);  break;
    case 'axios':  text = buildAxios(url, headers, body);  break;
    case 'python': text = buildPython(url, headers, body); break;
    case 'java':   text = buildJava(url, headers, body);   break;
    case 'java8':  text = buildJava8(url, headers, body);  break;
    default: return;
  }

  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

const exportBtn = document.getElementById('export-btn');
const exportMenu = document.getElementById('export-menu');

exportBtn.addEventListener('click', e => {
  e.stopPropagation();
  exportMenu.hidden = !exportMenu.hidden;
});

exportMenu.querySelectorAll('button[data-fmt]').forEach(btn => {
  btn.addEventListener('click', () => {
    copyExport(btn.dataset.fmt);
    exportMenu.hidden = true;
  });
});

document.addEventListener('click', () => {
  exportMenu.hidden = true;
});
`;
