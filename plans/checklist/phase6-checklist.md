# Phase 6 체크리스트 — GraphQL

> 참고 플랜: `plans/phase/phase6.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## 클라이언트

- [x] Endpoint URL 입력
- [x] Operation 선택: Query / Mutation / Subscription
- [x] Query 편집기: SDL 구문 강조
- [x] Variables 편집기: JSON 입력
- [x] Headers 설정
- [x] Schema Introspection: 엔드포인트에서 스키마 자동 조회
- [x] Schema Introspection: 필드 자동완성
- [x] 응답 뷰어: JSON 포맷팅
- [x] Subscription: 실시간 이벤트 스트림 표시

## 서버

- [x] 포트 설정
- [x] 로컬 GraphQL 서버 시작 / 중지
- [x] Schema 정의 (SDL 편집기)
- [x] Resolver 정의 (필드별 반환값 설정)
- [x] Subscription 이벤트 수동 발행 (테스트용)
- [x] 내장 Playground UI (브라우저 없이 쿼리 테스트 가능)

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
