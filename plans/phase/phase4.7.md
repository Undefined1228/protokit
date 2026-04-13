# Phase 4.7 — Project 레이어 제거 & 환경변수 Collection 단위화

> `Project > Collection > Request` 3단계 구조에서 Project 레이어를 제거.
> `Collection > Request` 2단계로 단순화하고, 환경변수를 Collection 단위로 내린다.

---

## 목표

- Project 개념 제거 — UI도, 데이터도
- 환경변수(Environment)를 Collection에 직접 귀속
- 컬렉션 우클릭 메뉴에서 해당 컬렉션의 환경변수 관리

---

## 현황

| 항목 | 현재 | 변경 후 |
|------|------|---------|
| 계층 구조 | Project > Collection > Request | Collection > Request |
| 환경변수 소유 | Project | Collection |
| 환경변수 관리 UI | 뷰 상단 툴바 (전체 공통) | 컬렉션 우클릭 컨텍스트 메뉴 |
| 활성 환경 표시 | 없음 | CollectionItem description에 환경 이름 표시 |

---

## 변경 파일 및 내용

### 1. `storage/store.ts`

- `Project` 인터페이스 제거
- `Collection`에 `environments: Environment[]`, `activeEnvironmentId: string | null` 추가
- `StoreData`: `projects: Project[]` → `collections: Collection[]`, `activeProjectId` 제거
- `STATE_KEY`: `'protokit.v2'` → `'protokit.v3'`
- v2 데이터 마이그레이션: 기존 프로젝트의 컬렉션들을 평탄화, 부모 프로젝트의 environments 복사
- 제거 메서드: `getProjects`, `getActiveProject`, `getActiveProjectId`, `createProject`, `renameProject`, `deleteProject`, `switchProject`
- 수정 메서드: `createCollection(name)` — projectId 제거, `renameCollection(collId, name)`, `deleteCollection(collId)`, `saveRequest(collId, req)`, `updateRequest(collId, reqId, data)`, `renameRequest`, `deleteRequest`, `duplicateRequest`, `moveRequest` — 모두 projectId 제거
- 환경변수 메서드: `createEnvironment(collId, name)`, `renameEnvironment(collId, envId, name)`, `deleteEnvironment(collId, envId)`, `switchEnvironment(collId, envId)`, `updateEnvironmentVariables(collId, envId, vars)`, `getActiveEnvironmentVariables(collId?: string)`

### 2. `providers/CollectionTreeProvider.ts`

- `CollectionItem`: `projectId` 필드 제거, `description`에 활성 환경 이름 표시
- `RequestItem`: `projectId` 필드 제거
- `getChildren()` 루트: `store.getCollections()` 직접 사용

### 3. `extension.ts`

- 제거 커맨드: `newProject`, `renameProject`, `deleteProject`, `switchProject`
- 제거: `syncTreeViewTitle`, `collectionView.description` 동기화
- `newCollection`: `store.createCollection(name)` — projectId 없이
- `renameCollection(item)`: `store.renameCollection(item.collection.id, name)`
- `deleteCollection(item)`: `store.deleteCollection(item.collection.id)`
- `runCollection(item)`: `CollectionRunnerPanel.create(context, store, item.collection.id)`
- `openSavedRequest(item)`: `RequestEditorPanel.create(context, store, item.request, item.collectionId)`
- `renameRequest`, `deleteRequest`, `duplicateRequest`, `moveRequest*`: projectId 제거
- `manageEnvironments`: 전역 → `manageEnvironments(store, item: CollectionItem)` — 해당 컬렉션 대상
- `editEnvironmentVariables`: projectId → collId
- `searchCollections`: `store.getCollections()` 직접 순회

### 4. `panels/RequestEditorPanel.ts`

- `initialProjectId` 필드·파라미터 제거
- `static create(...)`: `projectId` 파라미터 제거
- `handleMessage` `ready` 케이스: `store.getActiveEnvironmentVariables(this.initialCollId)`
- `executeSend`: 동일하게 `getActiveEnvironmentVariables(this.initialCollId)`
- `handleSaveRequest`: `initialProjectId` 참조 제거
- `saveAsNew`: `store.getActiveProject()` → `store.getCollections()` 직접 사용

### 5. `panels/CollectionRunnerPanel.ts`

- `projectId` 필드·파라미터 제거
- `static create(collId)`: `store.getProjects().find(...)` → `store.getCollections().find(c => c.id === collId)`
- `sendCollectionInfo`, `runCollection`: 동일하게 직접 탐색
- `getActiveEnvironmentVariables()` → `getActiveEnvironmentVariables(this.collId)`

### 6. `package.json`

- 커맨드 제거: `newProject`, `renameProject`, `deleteProject`, `switchProject`
- `viewsWelcome`: "프로젝트를 만들어..." → "컬렉션을 만들어..." + `newCollection` 링크
- `view/title` 메뉴: `switchProject` 제거, `manageEnvironments` 제거 (컨텍스트 메뉴로 이동)
- `view/item/context` 컬렉션 그룹에 `manageEnvironments` 추가

---

## 데이터 마이그레이션 (v2 → v3)

```
v2: { projects: [{ id, name, collections: [...], environments: [...], activeEnvironmentId }], activeProjectId, history }
v3: { collections: [{ id, name, requests, environments, activeEnvironmentId }], history }
```

- 각 프로젝트의 컬렉션을 평탄화
- 각 컬렉션에 부모 프로젝트의 `environments`, `activeEnvironmentId` 복사
- `history` 그대로 유지

---

## 완료 조건

- 트리뷰가 Collection > Request 2단계로 동작
- 컬렉션 우클릭 → 환경변수 관리 가능
- CollectionItem description에 활성 환경 이름 표시
- 환경변수 `{{치환}}` 정상 동작 (컬렉션 단위)
- `tsc --noEmit` 오류 없음
