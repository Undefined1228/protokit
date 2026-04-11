# Phase 4 — 응답 검증 & Collection Runner

## 목표

단순 요청·응답 확인을 넘어, 자동화된 API 테스트 도구로 확장.

---

## 기능 범위

### 응답 검증 (Assertions)

- 요청별 검증 조건 정의
  - Status code 조건 (예: `=== 200`, `< 400`)
  - 응답 body 필드 존재 여부 (예: `body.id exists`)
  - 응답 body 값 비교 (예: `body.status === "ok"`)
  - 응답 시간 조건 (예: `< 500ms`)
- 요청 전송 후 검증 결과 표시 (pass / fail)

### Collection Runner

- 컬렉션 내 요청을 순서대로 자동 실행
- 실행 결과 대시보드: 요청별 status / 응답 시간 / Assertions 결과
- 실패한 요청 강조 표시
- 실행 결과 저장 및 내보내기 (JSON)

---

## 비고

Assertions와 Collection Runner는 함께 쓸 때 의미가 있으므로 같은 Phase로 묶음.
API smoke test · 회귀 테스트 용도로 활용 가능.
