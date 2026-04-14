export const AUTOCOMPLETE_CSS = `
.ac-dropdown {
  position: fixed;
  background: var(--vscode-input-background);
  border: 1px solid var(--vscode-focusBorder);
  border-radius: 4px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.ac-item {
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--vscode-editor-font-family, monospace);
  white-space: nowrap;
  color: var(--vscode-input-foreground);
}
.ac-item:hover, .ac-item.active {
  background: var(--vscode-list-activeSelectionBackground);
  color: var(--vscode-list-activeSelectionForeground);
}
`;

export const AUTOCOMPLETE_JS = `
(function() {
  let _vars = {};
  const _dropdown = document.createElement('div');
  _dropdown.className = 'ac-dropdown';
  _dropdown.style.display = 'none';
  document.body.appendChild(_dropdown);

  let _activeEl = null;
  let _items = [];
  let _activeIdx = -1;

  function setVars(vars) { _vars = vars || {}; }

  function getAnchor(el) {
    const val = el.value;
    const pos = el.selectionStart;
    const start = val.lastIndexOf('{{', pos);
    if (start === -1) return null;
    const prefix = val.slice(start + 2, pos);
    if (prefix.includes('}')) return null;
    return { start, prefix };
  }

  function show(el, prefix) {
    const keys = Object.keys(_vars).filter(k => k.toLowerCase().startsWith(prefix.toLowerCase()));
    if (!keys.length) { hide(); return; }
    _activeEl = el;
    _items = keys;
    _activeIdx = -1;
    _dropdown.innerHTML = keys.map((k, i) => '<div class="ac-item" data-i="' + i + '">' + k + '</div>').join('');
    const rect = el.getBoundingClientRect();
    _dropdown.style.left = rect.left + 'px';
    _dropdown.style.top = (rect.bottom + 2) + 'px';
    _dropdown.style.minWidth = Math.max(rect.width, 150) + 'px';
    _dropdown.style.display = '';
  }

  function hide() {
    _dropdown.style.display = 'none';
    _activeEl = null;
    _items = [];
    _activeIdx = -1;
  }

  function highlight(idx) {
    _dropdown.querySelectorAll('.ac-item').forEach((el, i) => el.classList.toggle('active', i === idx));
  }

  function insertVar(el, key) {
    const anchor = getAnchor(el);
    if (!anchor) return;
    const val = el.value;
    const pos = el.selectionStart;
    const before = val.slice(0, anchor.start);
    const after = val.slice(pos);
    el.value = before + '{{' + key + '}}' + after;
    const newPos = before.length + key.length + 4;
    el.setSelectionRange(newPos, newPos);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    hide();
  }

  _dropdown.addEventListener('mousedown', e => {
    const item = e.target.closest('.ac-item');
    if (!item || !_activeEl) return;
    e.preventDefault();
    insertVar(_activeEl, _items[+item.dataset.i]);
  });

  function onInput(e) {
    const anchor = getAnchor(e.target);
    if (!anchor) { hide(); return; }
    show(e.target, anchor.prefix);
  }

  function onKeydown(e) {
    if (_dropdown.style.display === 'none') return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _activeIdx = Math.min(_activeIdx + 1, _items.length - 1);
      highlight(_activeIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _activeIdx = Math.max(_activeIdx - 1, 0);
      highlight(_activeIdx);
    } else if (e.key === 'Enter' && _activeIdx >= 0) {
      e.preventDefault();
      insertVar(_activeEl, _items[_activeIdx]);
    } else if (e.key === 'Escape') {
      hide();
    }
  }

  function attach(el) {
    el.addEventListener('input', onInput);
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', () => setTimeout(hide, 150));
  }

  function init(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) attach(el);
    });
  }

  window.__ac = { setVars, attach, init };
})();
`;
