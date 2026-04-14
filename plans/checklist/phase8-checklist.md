# Phase 8 체크리스트 — Socket.IO

> 참고 플랜: `plans/phase/phase8.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## 클라이언트

- [x] URL 입력
- [x] 네임스페이스(namespace) 설정
- [x] 연결 옵션: transport (websocket / polling)
- [x] 연결 옵션: auth payload
- [x] Connect 버튼
- [x] Disconnect 버튼
- [x] 연결 상태 표시
- [x] 이벤트 전송: event name 입력
- [x] 이벤트 전송: payload (JSON)
- [x] 이벤트 수신 스트림 뷰어: timestamp 표시
- [x] 이벤트 수신 스트림 뷰어: event name 표시
- [x] 이벤트 수신 스트림 뷰어: payload 표시
- [x] 이벤트 리스너 등록 (수신할 이벤트 목록 정의)
- [x] Room join
- [x] Room leave

## 서버

- [x] 포트 설정
- [x] 로컬 Socket.IO 서버 시작 / 중지
- [x] 네임스페이스 정의
- [x] 연결된 클라이언트 목록 표시 (socket id · namespace)
- [x] 수신 이벤트 로그
- [x] 이벤트 전송: 특정 클라이언트
- [x] 이벤트 전송: Room 단위
- [x] 이벤트 전송: 전체 broadcast
- [x] 이벤트 핸들러 정의 (이벤트 수신 시 자동 응답 규칙)

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
