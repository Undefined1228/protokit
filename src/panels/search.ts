export const SEARCH_CSS = `
.search-overlay {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 10000;
  display: none;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: var(--vscode-editorWidget-background, var(--vscode-input-background));
  border: 1px solid var(--vscode-editorWidget-border, var(--vscode-focusBorder));
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
  font-size: 12px;
}
.search-overlay input {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  border-radius: 2px;
  padding: 2px 6px;
  font-size: 12px;
  width: 180px;
  outline: none;
  font-family: inherit;
}
.search-overlay input:focus {
  border-color: var(--vscode-focusBorder);
}
.search-count {
  font-size: 11px;
  color: var(--vscode-descriptionForeground);
  min-width: 52px;
  text-align: center;
  padding: 0 2px;
}
.search-nav-btn {
  background: none;
  border: none;
  color: var(--vscode-foreground);
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 13px;
  line-height: 1;
  opacity: 0.75;
}
.search-nav-btn:hover { opacity: 1; background: var(--vscode-toolbar-hoverBackground); }
mark.sh {
  background: var(--vscode-editor-findMatchHighlightBackground, rgba(255,200,0,0.35));
  color: inherit;
  border-radius: 2px;
}
mark.sh.active {
  background: var(--vscode-editor-findMatchBackground, rgba(255,140,0,0.65));
  outline: 1px solid var(--vscode-editor-findMatchBorder, rgba(255,140,0,0.9));
}
`;

export const SEARCH_JS = `
(function() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML =
    '<input id="_si" type="text" placeholder="검색..." />' +
    '<span class="search-count" id="_sc"></span>' +
    '<button class="search-nav-btn" id="_sp" title="이전 (Shift+Enter)">↑</button>' +
    '<button class="search-nav-btn" id="_sn" title="다음 (Enter)">↓</button>' +
    '<button class="search-nav-btn" id="_sx" title="닫기 (Esc)">✕</button>';
  document.body.appendChild(overlay);

  let _targets = [];
  let _marks = [];
  let _idx = -1;

  function setTargets(ids) { _targets = ids; }

  function visibleTargets() {
    return _targets.map(id => document.getElementById(id)).filter(el => el && el.offsetParent !== null);
  }

  function open() {
    overlay.style.display = 'flex';
    const input = document.getElementById('_si');
    input.focus();
    input.select();
    doSearch();
  }

  function close() {
    overlay.style.display = 'none';
    clearMarks();
    document.getElementById('_si').value = '';
    document.getElementById('_sc').textContent = '';
    _idx = -1;
  }

  function clearMarks() {
    const parents = new Set();
    _marks.forEach(m => {
      if (!m.parentNode) return;
      parents.add(m.parentNode);
      m.parentNode.replaceChild(document.createTextNode(m.textContent), m);
    });
    parents.forEach(p => p.normalize());
    _marks = [];
  }

  function walkTextNodes(node, term, result) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const lower = text.toLowerCase();
      const tl = term.toLowerCase();
      let i = lower.indexOf(tl);
      if (i === -1) return;
      const frag = document.createDocumentFragment();
      let last = 0;
      while (i !== -1) {
        if (i > last) frag.appendChild(document.createTextNode(text.slice(last, i)));
        const m = document.createElement('mark');
        m.className = 'sh';
        m.textContent = text.slice(i, i + term.length);
        frag.appendChild(m);
        result.push(m);
        last = i + term.length;
        i = lower.indexOf(tl, last);
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'MARK') {
      Array.from(node.childNodes).forEach(c => walkTextNodes(c, term, result));
    }
  }

  function doSearch() {
    clearMarks();
    _idx = -1;
    const term = document.getElementById('_si').value;
    if (!term) { document.getElementById('_sc').textContent = ''; return; }
    visibleTargets().forEach(el => walkTextNodes(el, term, _marks));
    const sc = document.getElementById('_sc');
    if (!_marks.length) { sc.textContent = '없음'; return; }
    _idx = 0;
    activate(0);
    sc.textContent = '1 / ' + _marks.length;
  }

  function activate(i) {
    _marks.forEach((m, j) => m.classList.toggle('active', j === i));
    if (_marks[i]) _marks[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function next() {
    if (!_marks.length) return;
    _idx = (_idx + 1) % _marks.length;
    activate(_idx);
    document.getElementById('_sc').textContent = (_idx + 1) + ' / ' + _marks.length;
  }

  function prev() {
    if (!_marks.length) return;
    _idx = (_idx - 1 + _marks.length) % _marks.length;
    activate(_idx);
    document.getElementById('_sc').textContent = (_idx + 1) + ' / ' + _marks.length;
  }

  document.getElementById('_si').addEventListener('input', doSearch);
  document.getElementById('_si').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); e.shiftKey ? prev() : next(); }
    if (e.key === 'Escape') close();
  });
  document.getElementById('_sn').addEventListener('click', next);
  document.getElementById('_sp').addEventListener('click', prev);
  document.getElementById('_sx').addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      overlay.style.display !== 'none' ? (document.getElementById('_si').focus(), document.getElementById('_si').select()) : open();
    }
    if (e.key === 'Escape' && overlay.style.display !== 'none') close();
  });

  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'openSearch') open();
  });

  window.__search = { setTargets };
})();
`;
