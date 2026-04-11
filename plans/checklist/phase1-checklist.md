# Phase 1 체크리스트 — REST API 기본 테스트

> 참고 플랜: `plans/phase/phase1.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## 요청 편집기

- [x] Method 선택 (GET, POST, PUT, DELETE, PATCH)
- [x] URL 입력
- [x] Params: 쿼리 파라미터 key/value 입력
- [x] Headers: 헤더 key/value 입력
- [x] Body: raw(JSON), form-data, x-www-form-urlencoded
- [x] Body 타입 선택 시 Content-Type 헤더 자동 설정
- [x] Auth: Bearer Token 입력 → Authorization 헤더 자동 삽입

## 요청 전송

- [x] `Ctrl+Enter` 단축키로 요청 전송
- [x] 요청 취소 (전송 중 취소 버튼)
- [x] Timeout 설정 (기본값 30초)
- [x] SSL 인증서 검증 무시 옵션 (개발 환경용)
- [x] Proxy 설정 (HTTP/HTTPS)
- [x] Redirect 자동 추적 + 리다이렉트 체인 표시

## Cookie

- [ ] 요청/응답 쿠키 자동 관리
- [ ] 쿠키 목록 조회 · 수동 편집 · 삭제

## 요청 내보내기

- [ ] 현재 요청을 cURL 커맨드로 복사
- [ ] 코드 스니펫 생성 (fetch, axios, Python requests)

## 응답 뷰어

- [ ] Status code / 응답 시간 / 응답 크기 표시
- [ ] Body: JSON 포맷팅 + 구문 강조
- [ ] Body: Pretty / Raw 토글
- [ ] Body: 잘못된 JSON 경고
- [ ] Headers: 응답 헤더 목록
- [ ] 응답 body 파일로 저장

## 히스토리

- [ ] 요청 전송 시 자동 저장
- [ ] 최근 N건 목록 표시
- [ ] 클릭 시 요청 편집기에 복원
