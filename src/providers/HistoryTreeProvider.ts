import * as vscode from 'vscode';
import type { HistoryEntry, ProtoKitStore } from '../storage/store';

function formatTimeAgo(timestamp: number): string {
  const d = Date.now() - timestamp;
  if (d < 60000) {return '방금 전';}
  if (d < 3600000) {return Math.floor(d / 60000) + '분 전';}
  if (d < 86400000) {return Math.floor(d / 3600000) + '시간 전';}
  return Math.floor(d / 86400000) + '일 전';
}

export class HistoryItem extends vscode.TreeItem {
  constructor(public readonly entry: HistoryEntry) {
    super(entry.method + '  ' + entry.url, vscode.TreeItemCollapsibleState.None);
    const status = entry.status ? ` · ${entry.status}` : '';
    this.description = formatTimeAgo(entry.timestamp) + status;
    this.contextValue = 'historyEntry';
    this.iconPath = new vscode.ThemeIcon('history');
    this.tooltip = entry.url;
    this.command = {
      command: 'protokit.openHistoryEntry',
      title: '요청 열기',
      arguments: [this],
    };
  }
}

export class HistoryTreeProvider implements vscode.TreeDataProvider<HistoryItem> {
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private readonly store: ProtoKitStore) {
    store.onDidChange(() => this._onDidChangeTreeData.fire());
  }

  getTreeItem(element: HistoryItem): vscode.TreeItem {
    return element;
  }

  getChildren(): HistoryItem[] {
    return this.store.getHistory().map(e => new HistoryItem(e));
  }
}
