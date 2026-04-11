# Phase 3 — 인증 (Auth)

## 참고 Phase

| 구분 | Phase |
|------|-------|
| 선행 | Phase 1 — Auth 탭이 Phase 1에서 Bearer Token으로 시작, 여기서 확장 |
| 병행 가능 | Phase 2와 독립적으로 진행 가능 |

---

## 목표

Bearer Token 외 추가 인증 방식을 요청 편집기에서 바로 설정.

---

## 체크리스트

### Auth 탭 확장

- [ ] Basic Auth: username / password 입력 → Base64 인코딩 후 Authorization 헤더 삽입
- [ ] API Key: 헤더 또는 쿼리 파라미터에 key/value 삽입

---

## 제외 범위 (추후 검토)

- OAuth 2.0
- AWS Signature
