import * as vscode from 'vscode';

export interface KVRow {
  enabled: boolean;
  key: string;
  value: string;
}

export interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  params: KVRow[];
  headers: KVRow[];
  bodyType: string;
  body: string;
  bodyFormData: KVRow[];
  bodyUrlEncoded: KVRow[];
  authType: string;
  authToken: string;
  authBasicUsername?: string;
  authBasicPassword?: string;
  authApiKeyKey?: string;
  authApiKeyValue?: string;
  authApiKeyIn?: string;
  timeout?: number;
  sslIgnore?: boolean;
  assertions?: Assertion[];
}

export interface Environment {
  id: string;
  name: string;
  variables: Record<string, string>;
}

export interface Collection {
  id: string;
  name: string;
  requests: SavedRequest[];
  environments: Environment[];
  activeEnvironmentId: string | null;
}

export interface Assertion {
  enabled: boolean;
  type: 'status' | 'body_exists' | 'body_eq' | 'duration';
  operator: string;
  target: string;
  value: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  status?: number;
  duration?: number;
  params: KVRow[];
  headers: KVRow[];
  bodyType: string;
  body: string;
  bodyFormData: KVRow[];
  bodyUrlEncoded: KVRow[];
  authType: string;
  authToken: string;
  authBasicUsername?: string;
  authBasicPassword?: string;
  authApiKeyKey?: string;
  authApiKeyValue?: string;
  authApiKeyIn?: string;
}

const STATE_KEY = 'protokit.v3';
const MAX_HISTORY = 100;

interface StoreData {
  collections: Collection[];
  history: HistoryEntry[];
}

interface V2Collection {
  id: string;
  name: string;
  requests: SavedRequest[];
}
interface V2Project {
  id: string;
  name: string;
  collections: V2Collection[];
  environments: Environment[];
  activeEnvironmentId: string | null;
}
interface V2StoreData {
  projects: V2Project[];
  history: HistoryEntry[];
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function migrateV2(v2: V2StoreData): StoreData {
  const collections: Collection[] = [];
  for (const project of v2.projects ?? []) {
    for (const col of project.collections ?? []) {
      collections.push({
        id: col.id,
        name: col.name,
        requests: col.requests ?? [],
        environments: project.environments ?? [],
        activeEnvironmentId: project.activeEnvironmentId ?? null,
      });
    }
  }
  return { collections, history: v2.history ?? [] };
}

export class ProtoKitStore {
  private data: StoreData;
  private readonly _onChange = new vscode.EventEmitter<void>();
  readonly onDidChange = this._onChange.event;

  constructor(private readonly context: vscode.ExtensionContext) {
    const v3 = context.globalState.get<StoreData>(STATE_KEY);
    if (v3) {
      this.data = v3;
    } else {
      const v2 = context.globalState.get<V2StoreData>('protokit.v2');
      if (v2?.projects) {
        this.data = migrateV2(v2);
        this.context.globalState.update(STATE_KEY, this.data);
      } else {
        this.data = { collections: [], history: [] };
      }
    }
  }

  private persist(): void {
    this.context.globalState.update(STATE_KEY, this.data);
    this._onChange.fire();
  }

  // ── Collections ────────────────────────────────────────────

  getCollections(): Collection[] {
    return this.data.collections;
  }

  createCollection(name: string): Collection {
    const col: Collection = {
      id: generateId(),
      name,
      requests: [],
      environments: [],
      activeEnvironmentId: null,
    };
    this.data.collections.push(col);
    this.persist();
    return col;
  }

  renameCollection(collId: string, name: string): void {
    const col = this.findCollection(collId);
    if (col) { col.name = name; this.persist(); }
  }

  deleteCollection(collId: string): void {
    this.data.collections = this.data.collections.filter(c => c.id !== collId);
    this.persist();
  }

  // ── Requests ───────────────────────────────────────────────

  saveRequest(collId: string, req: Omit<SavedRequest, 'id'>): SavedRequest {
    const col = this.findCollection(collId);
    if (!col) {throw new Error('컬렉션을 찾을 수 없습니다.');}
    const saved: SavedRequest = { id: generateId(), ...req };
    col.requests.push(saved);
    this.persist();
    return saved;
  }

  updateRequest(collId: string, reqId: string, data: Omit<SavedRequest, 'id'>): void {
    const req = this.findRequest(collId, reqId);
    if (!req) {return;}
    Object.assign(req, data);
    this.persist();
  }

  renameRequest(collId: string, reqId: string, name: string): void {
    const req = this.findRequest(collId, reqId);
    if (req) { req.name = name; this.persist(); }
  }

  deleteRequest(collId: string, reqId: string): void {
    const col = this.findCollection(collId);
    if (col) { col.requests = col.requests.filter(r => r.id !== reqId); this.persist(); }
  }

  duplicateRequest(collId: string, reqId: string): void {
    const col = this.findCollection(collId);
    const req = col?.requests.find(r => r.id === reqId);
    if (!col || !req) {return;}
    const idx = col.requests.indexOf(req);
    const dupe: SavedRequest = { ...req, id: generateId(), name: req.name + ' 복사본' };
    col.requests.splice(idx + 1, 0, dupe);
    this.persist();
  }

  moveRequest(collId: string, reqId: string, dir: 'up' | 'down'): void {
    const col = this.findCollection(collId);
    if (!col) {return;}
    const idx = col.requests.findIndex(r => r.id === reqId);
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || newIdx < 0 || newIdx >= col.requests.length) {return;}
    [col.requests[idx], col.requests[newIdx]] = [col.requests[newIdx], col.requests[idx]];
    this.persist();
  }

  // ── Environments ───────────────────────────────────────────

  createEnvironment(collId: string, name: string): Environment {
    const col = this.findCollection(collId);
    if (!col) {throw new Error('컬렉션을 찾을 수 없습니다.');}
    const env: Environment = { id: generateId(), name, variables: {} };
    col.environments.push(env);
    if (!col.activeEnvironmentId) {col.activeEnvironmentId = env.id;}
    this.persist();
    return env;
  }

  renameEnvironment(collId: string, envId: string, name: string): void {
    const env = this.findEnvironment(collId, envId);
    if (env) { env.name = name; this.persist(); }
  }

  deleteEnvironment(collId: string, envId: string): void {
    const col = this.findCollection(collId);
    if (!col) {return;}
    col.environments = col.environments.filter(e => e.id !== envId);
    if (col.activeEnvironmentId === envId) {
      col.activeEnvironmentId = col.environments[0]?.id ?? null;
    }
    this.persist();
  }

  switchEnvironment(collId: string, envId: string | null): void {
    const col = this.findCollection(collId);
    if (col) { col.activeEnvironmentId = envId; this.persist(); }
  }

  updateEnvironmentVariables(collId: string, envId: string, vars: Record<string, string>): void {
    const env = this.findEnvironment(collId, envId);
    if (env) { env.variables = vars; this.persist(); }
  }

  getActiveEnvironmentVariables(collId?: string): Record<string, string> {
    if (!collId) {return {};}
    const col = this.findCollection(collId);
    if (!col || !col.activeEnvironmentId) {return {};}
    return col.environments.find(e => e.id === col.activeEnvironmentId)?.variables ?? {};
  }

  // ── History ────────────────────────────────────────────────

  addHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
    const h: HistoryEntry = { id: generateId(), timestamp: Date.now(), ...entry };
    this.data.history.unshift(h);
    if (this.data.history.length > MAX_HISTORY) {
      this.data.history = this.data.history.slice(0, MAX_HISTORY);
    }
    this.persist();
  }

  getHistory(): HistoryEntry[] {
    return this.data.history;
  }

  clearHistory(): void {
    this.data.history = [];
    this.persist();
  }

  // ── Helpers ────────────────────────────────────────────────

  private findCollection(collId: string): Collection | undefined {
    return this.data.collections.find(c => c.id === collId);
  }

  private findRequest(collId: string, reqId: string): SavedRequest | undefined {
    return this.findCollection(collId)?.requests.find(r => r.id === reqId);
  }

  private findEnvironment(collId: string, envId: string): Environment | undefined {
    return this.findCollection(collId)?.environments.find(e => e.id === envId);
  }
}
