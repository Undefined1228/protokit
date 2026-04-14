# Phase 10 체크리스트 — 편의성 강화

> 참고 플랜: `plans/phase/phase10.md`

---

## 환경변수 자동완성

- [ ] 자동완성 공유 모듈 (`src/panels/autocomplete.ts`) 작성
  - `{{` 입력 감지
  - 변수 목록 드롭다운 렌더링 (키보드 탐색 지원)
  - 선택 시 `{{변수명}}` 삽입 및 드롭다운 닫기
- [ ] REST API 에디터 적용 (URL, 파라미터, 헤더, 바디)
- [ ] WebSocket 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [ ] GraphQL 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [ ] SSE 패널: `setEnvVars` 지원 추가 + URL 입력창 적용
- [ ] Socket.IO 패널: `setEnvVars` 지원 추가 + URL 입력창 적용

---

## 완료 후 처리

- [ ] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
