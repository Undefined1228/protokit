# Phase QA 체크리스트 — 환경변수 자동완성

> 참고 플랜: `plans/phase/phaseqa.md`

---

## 공유 자동완성 모듈

- [x] `src/panels/autocomplete.ts` 작성
  - [x] `{{` 입력 감지
  - [x] 접두어 기반 변수 목록 필터링
  - [x] 드롭다운 렌더링 (입력 필드 하단 위치)
  - [x] 키보드 탐색: `ArrowUp`, `ArrowDown`, `Enter`, `Escape`
  - [x] 항목 선택 시 `{{변수명}}` 삽입 + 드롭다운 닫기
  - [x] 포커스 해제 시 드롭다운 닫기

---

## REST API 에디터

- [x] URL 입력창 자동완성 적용
- [x] 파라미터 값 입력창 자동완성 적용
- [x] 헤더 값 입력창 자동완성 적용
- [x] 바디 입력창 자동완성 적용

---

## WebSocket 패널

- [x] `WebSocketPanel.ts`: `store` 연동 + `ready` 수신 시 `setEnvVars` 전송
- [x] `WebSocketPanel.ts`: `store.onDidChange` 구독으로 자동 갱신
- [x] `webSocketWebview.ts`: `setEnvVars` 메시지 수신 처리
- [x] `webSocketWebview.ts`: URL 입력창 자동완성 적용

---

## GraphQL 패널

- [x] `GraphQLPanel.ts`: `store` 연동 + `ready` 수신 시 `setEnvVars` 전송
- [x] `GraphQLPanel.ts`: `store.onDidChange` 구독으로 자동 갱신
- [x] `graphqlWebview.ts`: `setEnvVars` 메시지 수신 처리
- [x] `graphqlWebview.ts`: URL 입력창 자동완성 적용

---

## SSE 패널

- [x] `SSEPanel.ts`: `store` 연동 + `ready` 수신 시 `setEnvVars` 전송
- [x] `SSEPanel.ts`: `store.onDidChange` 구독으로 자동 갱신
- [x] `sseWebview.ts`: `setEnvVars` 메시지 수신 처리
- [x] `sseWebview.ts`: URL 입력창 자동완성 적용

---

## Socket.IO 패널

- [x] `SocketIOPanel.ts`: `store` 연동 + `ready` 수신 시 `setEnvVars` 전송
- [x] `SocketIOPanel.ts`: `store.onDidChange` 구독으로 자동 갱신
- [x] `socketioWebview.ts`: `setEnvVars` 메시지 수신 처리
- [x] `socketioWebview.ts`: URL 입력창 자동완성 적용

---

## 결과창 인라인 검색

- [x] `src/panels/search.ts` 작성
  - [x] `Ctrl+F` / `Cmd+F` 트리거
  - [x] 플로팅 오버레이 UI (입력창, 매치 카운트, 이전/다음 버튼, 닫기)
  - [x] 실시간 텍스트 하이라이트 (`<mark>` 삽입)
  - [x] `Enter` / `Shift+Enter` 로 다음·이전 이동
  - [x] `Escape` / 닫기 시 하이라이트 제거
  - [x] 가시성 기준 컨테이너 필터 (`offsetParent`)
- [x] REST API: `response-body-pre` 적용
- [x] WebSocket: `client-stream`, `server-stream` 적용
- [x] GraphQL: `responseBody`, `streamList`, `reqLog` 적용
- [x] SSE: `client-stream`, `server-stream` 적용
- [x] Socket.IO: `client-stream` 적용
- [x] TCP: `c-log`, `s-log` 적용
- [x] UDP: `c-log`, `s-log` 적용

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
