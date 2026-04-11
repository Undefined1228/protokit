# Phase 6 — GraphQL

## 목표

GraphQL Query · Mutation · Subscription을 클라이언트·서버 양쪽에서 테스트.

---

## 체크리스트

### 클라이언트

- [ ] Endpoint URL 입력
- [ ] Operation 선택: Query / Mutation / Subscription
- [ ] Query 편집기: SDL 구문 강조
- [ ] Variables 편집기: JSON 입력
- [ ] Headers 설정
- [ ] Schema Introspection: 엔드포인트에서 스키마 자동 조회 → 필드 자동완성
- [ ] 응답 뷰어: JSON 포맷팅
- [ ] Subscription: 실시간 이벤트 스트림 표시

### 서버

- [ ] 포트 설정 후 로컬 GraphQL 서버 시작 / 중지
- [ ] Schema 정의 (SDL 편집기)
- [ ] Resolver 정의 (필드별 반환값 설정)
- [ ] Subscription 이벤트 수동 발행 (테스트용)
- [ ] 내장 Playground UI (브라우저 없이 쿼리 테스트 가능)

---

## 제외 범위 (추후 검토)

- Persisted Queries
- Federation / Subgraph
