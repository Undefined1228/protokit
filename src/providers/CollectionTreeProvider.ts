import * as vscode from 'vscode';
import type { Collection, SavedRequest, ProtoKitStore } from '../storage/store';

export class CollectionItem extends vscode.TreeItem {
  constructor(
    public readonly collection: Collection,
  ) {
    super(collection.name, vscode.TreeItemCollapsibleState.Expanded);
    this.contextValue = 'collection';
    this.iconPath = new vscode.ThemeIcon('folder');
    this.id = collection.id;
    const activeEnv = collection.environments.find(e => e.id === collection.activeEnvironmentId);
    this.description = activeEnv?.name ?? '';
  }
}

export class RequestItem extends vscode.TreeItem {
  constructor(
    public readonly request: SavedRequest,
    public readonly collectionId: string,
  ) {
    super(request.name, vscode.TreeItemCollapsibleState.None);
    this.contextValue = 'request';
    this.iconPath = new vscode.ThemeIcon('file');
    this.id = request.id;
    this.description = request.method;
    this.command = {
      command: 'protokit.openSavedRequest',
      title: '요청 열기',
      arguments: [this],
    };
  }
}

export type CollectionTreeNode = CollectionItem | RequestItem;

export class CollectionTreeProvider implements vscode.TreeDataProvider<CollectionTreeNode> {
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<CollectionTreeNode | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private readonly store: ProtoKitStore) {
    store.onDidChange(() => this._onDidChangeTreeData.fire());
  }

  getTreeItem(element: CollectionTreeNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CollectionTreeNode): CollectionTreeNode[] {
    if (!element) {
      return this.store.getCollections().map(c => new CollectionItem(c));
    }
    if (element instanceof CollectionItem) {
      return element.collection.requests.map(
        r => new RequestItem(r, element.collection.id),
      );
    }
    return [];
  }
}
