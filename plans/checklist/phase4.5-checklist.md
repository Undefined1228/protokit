# Phase 4.5 체크리스트 — QA 버그픽스 & 누락 기능 보완

> 참고 플랜: `plans/phase/phase4.5.md`

---

## B-1. 저장된 요청 업데이트 불가

- [x] `store.ts` — `updateRequest(projectId, collId, reqId, data)` 메서드 추가
- [x] `RequestEditorPanel.ts` — `handleSaveRequest()`에서 `initialRequest` 존재 시 "현재 요청 업데이트 / 새 요청으로 저장" QuickPick 표시
- [x] `RequestEditorPanel.ts` — "현재 요청 업데이트" 선택 시 `store.updateRequest()` 호출 (컬렉션 선택 및 이름 입력 생략)
- [x] `RequestEditorPanel.ts` — "새 요청으로 저장" 선택 시 기존 신규 저장 플로우 유지

## B-2. Collection Runner form-data body 미처리

- [x] `CollectionRunnerPanel.ts` — `runCollection()` body 빌드 로직에 `form-data` 분기 추가
- [x] `CollectionRunnerPanel.ts` — multipart/form-data body 직렬화 및 `Content-Type` 헤더 설정 (boundary 포함)

## B-3. Collection Runner timeout · sslIgnore 고정값

- [x] `store.ts` — `SavedRequest` 인터페이스에 `timeout?: number`, `sslIgnore?: boolean` 필드 추가
- [x] `RequestEditorPanel.ts` — 요청 저장(`saveRequest` payload) 시 `timeout`, `sslIgnore` 포함
- [x] `RequestEditorPanel.ts` — `loadRequest()` 시 `timeout`, `sslIgnore` 값을 UI에 반영
- [x] `CollectionRunnerPanel.ts` — `sendHttpRequest()` 호출 시 저장된 `timeout`, `sslIgnore` 사용 (미설정 시 기본값 30 / false)

## U-2. Assertion 인터페이스 정리

- [x] `store.ts` — `Assertion` 인터페이스에서 `id?` 필드 제거

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
- [x] `tree.txt` 갱신 (파일 추가 없으면 생략 가능)
