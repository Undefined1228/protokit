# Phase 4.5 — QA 버그픽스 & 누락 기능 보완

> Phase 4 구현 완료 후 전체 코드 QA에서 발견된 버그와 누락 기능을 수정한다.

---

## 발견된 문제 목록

### 버그 (Bug)

#### B-1. 저장된 요청 업데이트 불가
- **위치**: `store.ts`, `RequestEditorPanel.ts`
- **증상**: 컬렉션에서 요청을 열고 수정 후 저장 버튼을 누르면 항상 새 요청이 생성됨. 원본이 업데이트되지 않아 중복 항목이 쌓임.
- **원인**: `store.ts`에 `updateRequest()` 메서드가 없음. `handleSaveRequest()`가 `initialRequest` 유무에 관계없이 항상 `store.saveRequest()`(신규 생성)를 호출함.
- **수정**: `store.updateRequest()` 구현 → `handleSaveRequest()`에서 `initialRequest` 존재 시 업데이트 플로우 선택 옵션 제공.

#### B-2. Collection Runner에서 form-data body 미처리
- **위치**: `CollectionRunnerPanel.ts` — `runCollection()` 내 body 빌드 로직
- **증상**: form-data 타입으로 저장된 요청을 Collection Runner로 실행하면 body 없이 전송됨.
- **원인**: body 빌드 분기가 `json`과 `urlencoded`만 처리하고 `form-data` 케이스가 없음.
- **수정**: `form-data` 분기 추가 — `RequestEditorPanel`의 `collectBody()` 로직과 동일하게 multipart 형식으로 직렬화.

#### B-3. Collection Runner timeout · sslIgnore 고정값 사용
- **위치**: `CollectionRunnerPanel.ts` — `sendHttpRequest()` 호출부
- **증상**: 모든 Runner 요청이 `timeout: 30, sslIgnore: false`로 고정됨. RequestEditor에서 설정한 값이 무시됨.
- **원인**: `SavedRequest` 인터페이스에 `timeout`, `sslIgnore` 필드가 없음.
- **수정**: `SavedRequest`에 `timeout?: number`, `sslIgnore?: boolean` 추가 → RequestEditor 저장 시 포함 → Runner 실행 시 저장값 사용 (없으면 기본값 30 / false).

---

### UX 개선 (UX)

#### U-1. 저장 버튼 — 기존 요청 vs 신규 요청 구분 없음
- **위치**: `RequestEditorPanel.ts` — `handleSaveRequest()`
- **증상**: 기존 저장 요청을 열어 수정 후 저장 시 "새로 저장" 또는 "기존 업데이트" 선택 옵션이 없어 중복 항목이 생성됨.
- **수정**: B-1 수정의 일환으로, `initialRequest`가 있을 때 QuickPick으로 "현재 요청 업데이트 / 새 요청으로 저장" 선택지 제공.

#### U-2. Assertion `id` 저장 시 미포함
- **위치**: `RequestEditorPanel.ts` webview JS — `save-req-btn` 핸들러
- **증상**: Assertion 배열 저장 시 `id` 필드가 누락됨. `store.ts`의 `Assertion.id?`가 실제로 저장되지 않아 인터페이스와 저장 포맷 불일치.
- **수정**: `Assertion.id?`를 인터페이스에서 제거 (저장 포맷 기준으로 통일). 웹뷰 내부 id는 별도 관리.

---

## 구현 범위 요약

| ID  | 유형 | 내용                               | 파일                               |
|-----|------|------------------------------------|------------------------------------|
| B-1 | Bug  | `store.updateRequest()` 구현        | `store.ts`                         |
| B-1 | Bug  | 저장 플로우: 업데이트 vs 신규 선택  | `RequestEditorPanel.ts`            |
| B-2 | Bug  | Runner form-data body 처리          | `CollectionRunnerPanel.ts`         |
| B-3 | Bug  | `SavedRequest`에 timeout/sslIgnore  | `store.ts`, `RequestEditorPanel.ts`, `CollectionRunnerPanel.ts` |
| U-1 | UX   | 업데이트 vs 신규 QuickPick          | `RequestEditorPanel.ts`            |
| U-2 | UX   | `Assertion.id?` 인터페이스 정리     | `store.ts`                         |
