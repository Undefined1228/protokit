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
}

export interface Project {
  id: string;
  name: string;
  collections: Collection[];
  environments: Environment[];
  activeEnvironmentId: string | null;
}

export interface Assertion {
  id?: string;
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

const STATE_KEY = 'protokit.v2';
const MAX_HISTORY = 100;

interface StoreData {
  projects: Project[];
  activeProjectId: string | null;
  history: HistoryEntry[];
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

export class ProtoKitStore {
  private data: StoreData;
  private readonly _onChange = new vscode.EventEmitter<void>();
  readonly onDidChange = this._onChange.event;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.data = context.globalState.get<StoreData>(STATE_KEY) ?? {
      projects: [],
      activeProjectId: null,
      history: [],
    };
  }

  private persist(): void {
    this.context.globalState.update(STATE_KEY, this.data);
    this._onChange.fire();
  }

  // ── Projects ───────────────────────────────────────────────

  getProjects(): Project[] {
    return this.data.projects;
  }

  getActiveProject(): Project | undefined {
    return this.data.projects.find(p => p.id === this.data.activeProjectId);
  }

  getActiveProjectId(): string | null {
    return this.data.activeProjectId;
  }

  createProject(name: string): Project {
    const project: Project = {
      id: generateId(),
      name,
      collections: [],
      environments: [],
      activeEnvironmentId: null,
    };
    this.data.projects.push(project);
    if (!this.data.activeProjectId) {
      this.data.activeProjectId = project.id;
    }
    this.persist();
    return project;
  }

  renameProject(id: string, name: string): void {
    const p = this.data.projects.find(p => p.id === id);
    if (p) { p.name = name; this.persist(); }
  }

  deleteProject(id: string): void {
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.activeProjectId === id) {
      this.data.activeProjectId = this.data.projects[0]?.id ?? null;
    }
    this.persist();
  }

  switchProject(id: string): void {
    this.data.activeProjectId = id;
    this.persist();
  }

  // ── Collections ────────────────────────────────────────────

  createCollection(projectId: string, name: string): Collection {
    const p = this.data.projects.find(p => p.id === projectId);
    if (!p) throw new Error('프로젝트를 찾을 수 없습니다.');
    const col: Collection = { id: generateId(), name, requests: [] };
    p.collections.push(col);
    this.persist();
    return col;
  }

  renameCollection(projectId: string, collId: string, name: string): void {
    const col = this.findCollection(projectId, collId);
    if (col) { col.name = name; this.persist(); }
  }

  deleteCollection(projectId: string, collId: string): void {
    const p = this.data.projects.find(p => p.id === projectId);
    if (p) { p.collections = p.collections.filter(c => c.id !== collId); this.persist(); }
  }

  // ── Requests ───────────────────────────────────────────────

  saveRequest(projectId: string, collId: string, req: Omit<SavedRequest, 'id'>): SavedRequest {
    const col = this.findCollection(projectId, collId);
    if (!col) throw new Error('컬렉션을 찾을 수 없습니다.');
    const saved: SavedRequest = { id: generateId(), ...req };
    col.requests.push(saved);
    this.persist();
    return saved;
  }

  renameRequest(projectId: string, collId: string, reqId: string, name: string): void {
    const req = this.findRequest(projectId, collId, reqId);
    if (req) { req.name = name; this.persist(); }
  }

  deleteRequest(projectId: string, collId: string, reqId: string): void {
    const col = this.findCollection(projectId, collId);
    if (col) { col.requests = col.requests.filter(r => r.id !== reqId); this.persist(); }
  }

  duplicateRequest(projectId: string, collId: string, reqId: string): void {
    const col = this.findCollection(projectId, collId);
    const req = col?.requests.find(r => r.id === reqId);
    if (!col || !req) return;
    const idx = col.requests.indexOf(req);
    const dupe: SavedRequest = { ...req, id: generateId(), name: req.name + ' 복사본' };
    col.requests.splice(idx + 1, 0, dupe);
    this.persist();
  }

  moveRequest(projectId: string, collId: string, reqId: string, dir: 'up' | 'down'): void {
    const col = this.findCollection(projectId, collId);
    if (!col) return;
    const idx = col.requests.findIndex(r => r.id === reqId);
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || newIdx < 0 || newIdx >= col.requests.length) return;
    [col.requests[idx], col.requests[newIdx]] = [col.requests[newIdx], col.requests[idx]];
    this.persist();
  }

  // ── Environments ───────────────────────────────────────────

  createEnvironment(projectId: string, name: string): Environment {
    const p = this.data.projects.find(p => p.id === projectId);
    if (!p) throw new Error('프로젝트를 찾을 수 없습니다.');
    const env: Environment = { id: generateId(), name, variables: {} };
    p.environments.push(env);
    if (!p.activeEnvironmentId) p.activeEnvironmentId = env.id;
    this.persist();
    return env;
  }

  renameEnvironment(projectId: string, envId: string, name: string): void {
    const env = this.findEnvironment(projectId, envId);
    if (env) { env.name = name; this.persist(); }
  }

  deleteEnvironment(projectId: string, envId: string): void {
    const p = this.data.projects.find(p => p.id === projectId);
    if (!p) return;
    p.environments = p.environments.filter(e => e.id !== envId);
    if (p.activeEnvironmentId === envId) {
      p.activeEnvironmentId = p.environments[0]?.id ?? null;
    }
    this.persist();
  }

  switchEnvironment(projectId: string, envId: string | null): void {
    const p = this.data.projects.find(p => p.id === projectId);
    if (p) { p.activeEnvironmentId = envId; this.persist(); }
  }

  updateEnvironmentVariables(projectId: string, envId: string, vars: Record<string, string>): void {
    const env = this.findEnvironment(projectId, envId);
    if (env) { env.variables = vars; this.persist(); }
  }

  getActiveEnvironmentVariables(): Record<string, string> {
    const p = this.getActiveProject();
    if (!p || !p.activeEnvironmentId) return {};
    return p.environments.find(e => e.id === p.activeEnvironmentId)?.variables ?? {};
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

  private findCollection(projectId: string, collId: string): Collection | undefined {
    return this.data.projects.find(p => p.id === projectId)?.collections.find(c => c.id === collId);
  }

  private findRequest(projectId: string, collId: string, reqId: string): SavedRequest | undefined {
    return this.findCollection(projectId, collId)?.requests.find(r => r.id === reqId);
  }

  private findEnvironment(projectId: string, envId: string): Environment | undefined {
    return this.data.projects.find(p => p.id === projectId)?.environments.find(e => e.id === envId);
  }
}
