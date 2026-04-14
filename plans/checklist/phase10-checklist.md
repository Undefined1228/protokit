# Phase 10 체크리스트 — 편의성 강화

> 참고 플랜: `plans/phase/phase10.md`

---

## 환경변수 자동완성

- [x] 자동완성 공유 모듈 (`src/panels/autocomplete.ts`) 작성
  - [x] `{{` 입력 감지
  - [x] 변수 목록 드롭다운 렌더링 (키보드 탐색 지원)
  - [x] 선택 시 `{{변수명}}` 삽입 및 드롭다운 닫기
- [x] REST API 에디터 적용 (URL, 파라미터, 헤더, 바디)
- [x] WebSocket 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [x] GraphQL 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [x] SSE 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [x] Socket.IO 패널: `setEnvVars` 지원 추가 + URL 입력창 적용

---

## 결과창 인라인 검색

- [x] 검색 공유 모듈 (`src/panels/search.ts`) 작성
  - [x] `Ctrl+F` / `Cmd+F` 트리거
  - [x] 플로팅 오버레이 UI
  - [x] 실시간 하이라이트 + 매치 카운트
  - [x] `Enter` / `Shift+Enter` 이전·다음, `Escape` 닫기
- [x] REST API, WebSocket, GraphQL, SSE, Socket.IO, TCP, UDP 전 패널 적용

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
