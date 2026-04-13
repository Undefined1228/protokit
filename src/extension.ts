import * as vscode from 'vscode';
import { RequestEditorPanel } from './panels/RequestEditorPanel';
import { CollectionRunnerPanel } from './panels/CollectionRunnerPanel';
import { ProtoKitStore } from './storage/store';
import { CollectionTreeProvider, CollectionItem, RequestItem } from './providers/CollectionTreeProvider';
import { HistoryTreeProvider, HistoryItem } from './providers/HistoryTreeProvider';
import type { SavedRequest } from './storage/store';

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
      if (!name?.trim()) return;
      store.createCollection(name.trim());
    }),

    vscode.commands.registerCommand('protokit.renameCollection', async (item: CollectionItem) => {
      const name = await vscode.window.showInputBox({
        prompt: '컬렉션 이름 변경',
        value: item.collection.name,
      });
      if (!name?.trim() || name.trim() === item.collection.name) return;
      store.renameCollection(item.collection.id, name.trim());
    }),

    vscode.commands.registerCommand('protokit.deleteCollection', async (item: CollectionItem) => {
      const confirmed = await vscode.window.showWarningMessage(
        `"${item.collection.name}" 컬렉션을 삭제하시겠습니까?`,
        { modal: true },
        '삭제',
      );
      if (confirmed !== '삭제') return;
      store.deleteCollection(item.collection.id);
    }),

    vscode.commands.registerCommand('protokit.runCollection', (item: CollectionItem) => {
      CollectionRunnerPanel.create(context, store, item.collection.id);
    }),

    // ── 요청 ─────────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.newRequest', () => {
      RequestEditorPanel.create(context, store);
    }),

    vscode.commands.registerCommand('protokit.openSavedRequest', (item: RequestItem) => {
      RequestEditorPanel.create(context, store, item.request, item.collectionId);
    }),

    vscode.commands.registerCommand('protokit.renameRequest', async (item: RequestItem) => {
      const name = await vscode.window.showInputBox({
        prompt: '요청 이름 변경',
        value: item.request.name,
      });
      if (!name?.trim() || name.trim() === item.request.name) return;
      store.renameRequest(item.collectionId, item.request.id, name.trim());
    }),

    vscode.commands.registerCommand('protokit.deleteRequest', async (item: RequestItem) => {
      const confirmed = await vscode.window.showWarningMessage(
        `"${item.request.name}" 요청을 삭제하시겠습니까?`,
        { modal: true },
        '삭제',
      );
      if (confirmed !== '삭제') return;
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
      if (confirmed === '삭제') store.clearHistory();
    }),

    // ── 환경변수 ──────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.manageEnvironments', (item: CollectionItem) => {
      manageEnvironments(store, item);
    }),

    // ── 검색 ─────────────────────────────────────────────────

    vscode.commands.registerCommand('protokit.search', () => {
      searchCollections(store, context);
    }),
  );
}

async function manageEnvironments(store: ProtoKitStore, item: CollectionItem): Promise<void> {
  const col = store.getCollections().find(c => c.id === item.collection.id);
  if (!col) return;

  const picks: (vscode.QuickPickItem & { id?: string })[] = [
    ...col.environments.map(e => ({
      label: e.name,
      id: e.id,
      description: e.id === col.activeEnvironmentId ? '현재 활성' : undefined,
      detail: Object.entries(e.variables).slice(0, 3).map(([k, v]) => `${k}=${v}`).join('  ') || '(변수 없음)',
    })),
    { label: '$(add) 새 환경 추가' },
  ];

  const pick = await vscode.window.showQuickPick(picks, { placeHolder: '환경 선택 또는 관리' });
  if (!pick) return;

  if (pick.label === '$(add) 새 환경 추가') {
    const name = await vscode.window.showInputBox({ prompt: '환경 이름 (예: dev, staging, prod)' });
    if (!name?.trim()) return;
    store.createEnvironment(col.id, name.trim());
    return;
  }

  const env = col.environments.find(e => e.id === pick.id);
  if (!env) return;

  const action = await vscode.window.showQuickPick(
    [
      { label: '$(play) 활성으로 설정', id: 'activate' },
      { label: '$(edit) 변수 편집', id: 'edit' },
      { label: '$(pencil) 이름 변경', id: 'rename' },
      { label: '$(trash) 환경 삭제', id: 'delete' },
    ],
    { placeHolder: `"${env.name}" 환경` },
  );

  if (!action) return;

  if (action.id === 'activate') {
    store.switchEnvironment(col.id, env.id);
    vscode.window.showInformationMessage(`"${env.name}" 환경이 활성화되었습니다.`);
  } else if (action.id === 'edit') {
    await editEnvironmentVariables(store, col.id, env.id, env.name);
  } else if (action.id === 'rename') {
    const name = await vscode.window.showInputBox({ prompt: '환경 이름 변경', value: env.name });
    if (!name?.trim() || name.trim() === env.name) return;
    store.renameEnvironment(col.id, env.id, name.trim());
  } else if (action.id === 'delete') {
    const confirmed = await vscode.window.showWarningMessage(
      `"${env.name}" 환경을 삭제하시겠습니까?`,
      { modal: true },
      '삭제',
    );
    if (confirmed === '삭제') store.deleteEnvironment(col.id, env.id);
  }
}

async function editEnvironmentVariables(
  store: ProtoKitStore,
  collId: string,
  envId: string,
  envName: string,
): Promise<void> {
  while (true) {
    const col = store.getCollections().find(c => c.id === collId);
    const env = col?.environments.find(e => e.id === envId);
    if (!env) return;

    const entries = Object.entries(env.variables);
    const items: (vscode.QuickPickItem & { key?: string })[] = [
      ...entries.map(([k, v]) => ({ label: k, description: v, key: k })),
      { label: '$(add) 새 변수 추가' },
      { label: '$(check) 완료' },
    ];

    const pick = await vscode.window.showQuickPick(items, {
      placeHolder: `${envName} — 환경변수 편집`,
    });

    if (!pick || pick.label === '$(check) 완료') return;

    if (pick.label === '$(add) 새 변수 추가') {
      const key = await vscode.window.showInputBox({ prompt: '변수 이름' });
      if (!key?.trim()) continue;
      const value = await vscode.window.showInputBox({ prompt: `"${key.trim()}" 값` });
      if (value === undefined) continue;
      const vars = { ...env.variables, [key.trim()]: value };
      store.updateEnvironmentVariables(collId, envId, vars);
    } else if (pick.key) {
      const varKey = pick.key;
      const action = await vscode.window.showQuickPick(
        [
          { label: '$(edit) 값 수정', id: 'edit' },
          { label: '$(trash) 삭제', id: 'delete' },
        ],
        { placeHolder: `"${varKey}" 변수` },
      );
      if (!action) continue;
      if (action.id === 'edit') {
        const value = await vscode.window.showInputBox({
          prompt: `"${varKey}" 값`,
          value: env.variables[varKey],
        });
        if (value === undefined) continue;
        store.updateEnvironmentVariables(collId, envId, { ...env.variables, [varKey]: value });
      } else if (action.id === 'delete') {
        const vars = { ...env.variables };
        delete vars[varKey];
        store.updateEnvironmentVariables(collId, envId, vars);
      }
    }
  }
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
