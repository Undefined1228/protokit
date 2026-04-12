# Phase 4 체크리스트 — 응답 검증 & Collection Runner

> 참고 플랜: `plans/phase/phase4.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## 응답 검증 (Assertions)

- [x] Status code 조건 정의 (예: `=== 200`, `< 400`)
- [x] 응답 body 필드 존재 여부 조건 (예: `body.id exists`)
- [x] 응답 body 값 비교 조건 (예: `body.status === "ok"`)
- [x] 응답 시간 조건 (예: `< 500ms`)
- [x] 요청 전송 후 검증 결과 표시 (pass / fail)

## Collection Runner

- [x] 컬렉션 내 요청 순서대로 자동 실행
- [x] 실행 결과 대시보드: 요청별 status 표시
- [x] 실행 결과 대시보드: 응답 시간 표시
- [x] 실행 결과 대시보드: Assertions 결과 표시
- [x] 실패한 요청 강조 표시
- [x] 실행 결과 저장 (JSON)
- [x] 실행 결과 내보내기 (JSON)

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
