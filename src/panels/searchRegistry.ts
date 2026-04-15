import * as vscode from 'vscode';

const panels = new Set<vscode.WebviewPanel>();

export function registerPanel(panel: vscode.WebviewPanel): void {
  panels.add(panel);
  panel.onDidDispose(() => panels.delete(panel));
}

export function triggerSearch(): void {
  for (const p of panels) {
    if (p.active) {
      p.webview.postMessage({ type: 'openSearch' });
      return;
    }
  }
}
