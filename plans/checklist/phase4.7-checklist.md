# Phase 4.7 체크리스트 — Project 제거 & 환경변수 Collection 단위화

> 참고 플랜: `plans/phase/phase4.7.md`

---

## storage/store.ts

- [x] `Collection`에 `environments`, `activeEnvironmentId` 필드 추가
- [x] `Project` 인터페이스 제거
- [x] `StoreData`: `projects[]` → `collections[]`, `activeProjectId` 제거
- [x] `STATE_KEY` → `'protokit.v3'`, v2 마이그레이션 로직 작성
- [x] Project 관련 메서드 제거 (`getProjects`, `getActiveProject`, `getActiveProjectId`, `createProject`, `renameProject`, `deleteProject`, `switchProject`)
- [x] Collection·Request·Environment 메서드에서 `projectId` 파라미터 제거
- [x] `getActiveEnvironmentVariables(collId?: string)` 시그니처 변경

## providers/CollectionTreeProvider.ts

- [x] `CollectionItem`에서 `projectId` 제거, 활성 환경 이름 `description` 표시
- [x] `RequestItem`에서 `projectId` 제거
- [x] `getChildren()` 루트: `store.getCollections()` 사용

## extension.ts

- [x] Project 커맨드 4개 제거 (`newProject`, `renameProject`, `deleteProject`, `switchProject`)
- [x] `syncTreeViewTitle` 및 `collectionView.description` 제거
- [x] Collection·Request 커맨드에서 `projectId` 제거
- [x] `manageEnvironments` → `CollectionItem` 인자 기반으로 변경
- [x] `editEnvironmentVariables` → `collId` 기반으로 변경
- [x] `searchCollections` → `store.getCollections()` 직접 순회

## panels/RequestEditorPanel.ts

- [x] `initialProjectId` 필드·파라미터 제거
- [x] `ready` 메시지: `getActiveEnvironmentVariables(this.initialCollId)`
- [x] `executeSend`: `getActiveEnvironmentVariables(this.initialCollId)`
- [x] `handleSaveRequest`: `initialProjectId` 참조 제거
- [x] `saveAsNew`: `store.getCollections()` 직접 사용

## panels/CollectionRunnerPanel.ts

- [x] `projectId` 필드·파라미터 제거
- [x] `store.getProjects().find(...)` → `store.getCollections().find(...)`
- [x] `getActiveEnvironmentVariables()` → `getActiveEnvironmentVariables(this.collId)`

## package.json

- [x] 커맨드 4개 제거 (`newProject`, `renameProject`, `deleteProject`, `switchProject`)
- [x] `viewsWelcome` 문구 → 컬렉션 중심으로 변경
- [x] `view/title`: `switchProject`, `manageEnvironments` 제거
- [x] `view/item/context` 컬렉션 그룹에 `manageEnvironments` 추가

---

## 검증

- [ ] 트리뷰 Collection > Request 2단계 동작 확인
- [ ] 컬렉션 우클릭 → 환경변수 관리 동작 확인
- [ ] CollectionItem description에 활성 환경 이름 표시 확인
- [ ] `{{변수}}` 치환 정상 동작 확인
- [ ] Collection Runner 환경변수 적용 확인
- [x] `tsc --noEmit` 오류 없음

---

## 완료 후 처리

- [x] `tree.txt` 갱신
- [x] `CHANGELOG.md` 업데이트
