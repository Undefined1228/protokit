import * as vscode from 'vscode';
import type { Collection, SavedRequest, ProtoKitStore } from '../storage/store';

export class CollectionItem extends vscode.TreeItem {
  constructor(
    public readonly collection: Collection,
    public readonly projectId: string,
  ) {
    super(collection.name, vscode.TreeItemCollapsibleState.Expanded);
    this.contextValue = 'collection';
    this.iconPath = new vscode.ThemeIcon('folder');
    this.id = collection.id;
  }
}

export class RequestItem extends vscode.TreeItem {
  constructor(
    public readonly request: SavedRequest,
    public readonly collectionId: string,
    public readonly projectId: string,
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
      const project = this.store.getActiveProject();
      if (!project) return [];
      return project.collections.map(c => new CollectionItem(c, project.id));
    }
    if (element instanceof CollectionItem) {
      return element.collection.requests.map(
        r => new RequestItem(r, element.collection.id, element.projectId),
      );
    }
    return [];
  }
}
