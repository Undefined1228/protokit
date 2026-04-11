# Phase 3 — 인증 (Auth)

## 목표

주요 인증 방식을 요청 편집기에서 바로 설정.

---

## 기능 범위

### Auth 탭

- **Bearer Token**: Authorization 헤더에 `Bearer <token>` 자동 삽입
- **Basic Auth**: username / password 입력 → Base64 인코딩 후 헤더 삽입
- **API Key**: 헤더 또는 쿼리 파라미터에 key/value 삽입

---

## 제외 범위 (추후 검토)

- OAuth 2.0
- AWS Signature
