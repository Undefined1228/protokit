# Phase 3 체크리스트 — 인증 (Auth)

> 참고 플랜: `plans/phase/phase3.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## Auth 탭 확장

- [ ] Basic Auth: username / password 입력
- [ ] Basic Auth: Base64 인코딩 후 Authorization 헤더 자동 삽입
- [ ] API Key: 헤더에 key/value 삽입
- [ ] API Key: 쿼리 파라미터에 key/value 삽입
