# Phase QA — 환경변수 자동완성

## 목표

`{{` 입력 시 현재 활성 환경의 변수 목록을 드롭다운으로 제안한다.
자동완성 로직은 공유 모듈로 분리해 모든 에디터에서 재사용한다.

---

## 공유 자동완성 모듈

`src/panels/autocomplete.ts`를 신규 작성한다.

- `{{` 입력 감지
- 현재 커서 위치 기준 `{{` 이후 입력한 접두어로 변수 목록 필터링
- 변수 목록 드롭다운 렌더링 (입력 필드 하단 위치)
- 키보드 탐색: `ArrowUp`, `ArrowDown`, `Enter`, `Escape`
- 항목 선택 시 `{{변수명}}` 삽입 후 드롭다운 닫기
- 입력 필드 포커스 해제 시 드롭다운 닫기
- webview HTML에 인라인으로 삽입할 수 있는 JS 문자열로 export

---

## REST API 에디터 적용

`requestEditorWebview.ts`에 자동완성 드롭다운을 추가한다.

- URL 입력창
- 파라미터 값 입력창
- 헤더 값 입력창
- 바디 입력창 (텍스트 에디터 영역)

---

## WebSocket 패널 환경변수 지원

### Panel (`WebSocketPanel.ts`)

- `store` 인스턴스 연동
- `ready` 메시지 수신 시 `setEnvVars` 전송
- `store.onDidChange` 구독 — 환경변수 변경 시 자동 갱신

### Webview (`webSocketWebview.ts`)

- `setEnvVars` 메시지 수신 처리
- URL 입력창에 자동완성 적용

---

## GraphQL 패널 환경변수 지원

### Panel (`GraphQLPanel.ts`)

- `store` 인스턴스 연동
- `ready` 메시지 수신 시 `setEnvVars` 전송
- `store.onDidChange` 구독 — 환경변수 변경 시 자동 갱신

### Webview (`graphqlWebview.ts`)

- `setEnvVars` 메시지 수신 처리
- URL 입력창에 자동완성 적용

---

## SSE 패널 환경변수 지원

### Panel (`SSEPanel.ts`)

- `store` 인스턴스 연동
- `ready` 메시지 수신 시 `setEnvVars` 전송
- `store.onDidChange` 구독 — 환경변수 변경 시 자동 갱신

### Webview (`sseWebview.ts`)

- `setEnvVars` 메시지 수신 처리
- URL 입력창에 자동완성 적용

---

## Socket.IO 패널 환경변수 지원

### Panel (`SocketIOPanel.ts`)

- `store` 인스턴스 연동
- `ready` 메시지 수신 시 `setEnvVars` 전송
- `store.onDidChange` 구독 — 환경변수 변경 시 자동 갱신

### Webview (`socketioWebview.ts`)

- `setEnvVars` 메시지 수신 처리
- URL 입력창에 자동완성 적용

---

## 비고

- `RequestEditorPanel.ts`의 `pushEnvVars()` 패턴을 레퍼런스로 활용한다.
- 패널에 `store`가 없는 경우, 전역 활성 환경변수를 가져오는 fallback 로직(`RequestEditorPanel.ts` 참고)을 동일하게 적용한다.
- TCP / UDP 패널은 URL 입력 개념이 없으므로 이번 페이즈 대상에서 제외한다.
