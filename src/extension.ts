import * as vscode from 'vscode';
import { RequestEditorPanel } from './panels/RequestEditorPanel';
import { CollectionRunnerPanel } from './panels/CollectionRunnerPanel';
import { WebSocketPanel } from './panels/WebSocketPanel';
import { GraphQLPanel } from './panels/GraphQLPanel';
import { SSEPanel } from './panels/SSEPanel';
import { SocketIOPanel } from './panels/SocketIOPanel';
import { TCPPanel } from './panels/TCPPanel';
import { UDPPanel } from './panels/UDPPanel';
import { EnvironmentPanel } from './panels/EnvironmentPanel';
import { ProtoKitStore } from './storage/store';
import { CollectionTreeProvider, CollectionItem, RequestItem } from './providers/CollectionTreeProvider';
import { HistoryTreeProvider, HistoryItem } from './providers/HistoryTreeProvider';
import type { SavedRequest } from './storage/store';
import { triggerSearch } from './panels/searchRegistry';

export function activate(context: vscode.ExtensionContext) {
  const store = new ProtoKitStore(context);
  const collectionProvider = new CollectionTreeProvider(store);
  const historyProvider = new HistoryTreeProvider(store);

  vscode.window.createTreeView('protokit.collections', {
    treeDataProvider: collectionProvider,
    showCollapseAll: true,
  });

  vscode.window.createTreeView('protokit.history', {
    treeDataProvider: historyProvider,
  });

  context.subscriptions.push(
    // ── 컬렉션 ───────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.newCollection', async () => {
      const name = await vscode.window.showInputBox({ prompt: '새 컬렉션 이름' });
      if (!name?.trim()) {return;}
      store.createCollection(name.trim());
    }),

    vscode.commands.registerCommand('protokit.renameCollection', async (item: CollectionItem) => {
      const name = await vscode.window.showInputBox({
        prompt: '컬렉션 이름 변경',
        value: item.collection.name,
      });
      if (!name?.trim() || name.trim() === item.collection.name) {return;}
      store.renameCollection(item.collection.id, name.trim());
    }),

    vscode.commands.registerCommand('protokit.deleteCollection', async (item: CollectionItem) => {
      const confirmed = await vscode.window.showWarningMessage(
        `"${item.collection.name}" 컬렉션을 삭제하시겠습니까?`,
        { modal: true },
        '삭제',
      );
      if (confirmed !== '삭제') {return;}
      store.deleteCollection(item.collection.id);
    }),

    vscode.commands.registerCommand('protokit.runCollection', (item: CollectionItem) => {
      CollectionRunnerPanel.create(context, store, item.collection.id);
    }),

    // ── 요청 ─────────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.newRequest', () => {
      RequestEditorPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.newWebSocket', () => {
      WebSocketPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.newGraphQL', () => {
      GraphQLPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.newSSE', () => {
      SSEPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.newSocketIO', () => {
      SocketIOPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.newTCP', () => {
      TCPPanel.create(context);
    }),

    vscode.commands.registerCommand('protokit.newUDP', () => {
      UDPPanel.create(context);
    }),

    vscode.commands.registerCommand('protokit.openSavedRequest', (item: RequestItem) => {
      RequestEditorPanel.create(context, store, item.request, item.collectionId);
    }),

    vscode.commands.registerCommand('protokit.renameRequest', async (item: RequestItem) => {
      const name = await vscode.window.showInputBox({
        prompt: '요청 이름 변경',
        value: item.request.name,
      });
      if (!name?.trim() || name.trim() === item.request.name) {return;}
      store.renameRequest(item.collectionId, item.request.id, name.trim());
    }),

    vscode.commands.registerCommand('protokit.deleteRequest', async (item: RequestItem) => {
      const confirmed = await vscode.window.showWarningMessage(
        `"${item.request.name}" 요청을 삭제하시겠습니까?`,
        { modal: true },
        '삭제',
      );
      if (confirmed !== '삭제') {return;}
      store.deleteRequest(item.collectionId, item.request.id);
    }),

    vscode.commands.registerCommand('protokit.duplicateRequest', (item: RequestItem) => {
      store.duplicateRequest(item.collectionId, item.request.id);
    }),

    vscode.commands.registerCommand('protokit.moveRequestUp', (item: RequestItem) => {
      store.moveRequest(item.collectionId, item.request.id, 'up');
    }),

    vscode.commands.registerCommand('protokit.moveRequestDown', (item: RequestItem) => {
      store.moveRequest(item.collectionId, item.request.id, 'down');
    }),

    // ── 히스토리 ──────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.openHistoryEntry', (item: HistoryItem) => {
      const entry = item.entry;
      const req: SavedRequest = {
        id: entry.id,
        name: entry.method + '  ' + entry.url,
        method: entry.method,
        url: entry.url,
        params: entry.params,
        headers: entry.headers,
        bodyType: entry.bodyType,
        body: entry.body,
        bodyFormData: entry.bodyFormData,
        bodyUrlEncoded: entry.bodyUrlEncoded,
        authType: entry.authType,
        authToken: entry.authToken,
        authBasicUsername: entry.authBasicUsername,
        authBasicPassword: entry.authBasicPassword,
        authApiKeyKey: entry.authApiKeyKey,
        authApiKeyValue: entry.authApiKeyValue,
        authApiKeyIn: entry.authApiKeyIn,
      };
      RequestEditorPanel.create(context, store, req);
    }),

    vscode.commands.registerCommand('protokit.clearHistory', async () => {
      const confirmed = await vscode.window.showWarningMessage(
        '히스토리를 전체 삭제하시겠습니까?',
        { modal: true },
        '삭제',
      );
      if (confirmed === '삭제') {store.clearHistory();}
    }),

    // ── 환경변수 ──────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.manageEnvironments', (item: CollectionItem) => {
      EnvironmentPanel.create(context, store, item.collection.id);
    }),

    // ── 검색 ─────────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.search', () => {
      searchCollections(store, context);
    }),

    vscode.commands.registerCommand('protokit.openInlineSearch', triggerSearch),
  );
}

async function searchCollections(store: ProtoKitStore, context: vscode.ExtensionContext): Promise<void> {
  const items: (vscode.QuickPickItem & { req: SavedRequest })[] = [];
  for (const col of store.getCollections()) {
    for (const req of col.requests) {
      items.push({
        label: req.name,
        description: req.method,
        detail: req.url + '  ·  ' + col.name,
        req,
      });
    }
  }

  if (!items.length) {
    vscode.window.showInformationMessage('저장된 요청이 없습니다.');
    return;
  }

  const pick = await vscode.window.showQuickPick(items, {
    placeHolder: '요청 이름 또는 URL 검색...',
    matchOnDescription: true,
    matchOnDetail: true,
  });

  if (pick) {
    RequestEditorPanel.create(context, store, pick.req);
  }
}

export function deactivate() {}
