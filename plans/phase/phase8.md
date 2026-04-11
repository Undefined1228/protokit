# Phase 8 — Socket.IO

## 목표

Socket.IO 이벤트 기반 소켓 통신을 클라이언트·서버 양쪽에서 테스트.

---

## 체크리스트

### 클라이언트

- [ ] URL 입력 + 네임스페이스(namespace) 설정
- [ ] 연결 옵션: transport (websocket / polling), auth payload
- [ ] Connect / Disconnect 버튼
- [ ] 연결 상태 표시
- [ ] 이벤트 전송: event name · payload (JSON)
- [ ] 이벤트 수신 스트림 뷰어: timestamp · event name · payload 표시
- [ ] 이벤트 리스너 등록 (수신할 이벤트 목록 정의)
- [ ] Room join / leave

### 서버

- [ ] 포트 설정 후 로컬 Socket.IO 서버 시작 / 중지
- [ ] 네임스페이스 정의
- [ ] 연결된 클라이언트 목록 (socket id · namespace)
- [ ] 수신 이벤트 로그
- [ ] 이벤트 전송: 특정 클라이언트 / Room / 전체 broadcast
- [ ] 이벤트 핸들러 정의 (이벤트 수신 시 자동 응답 규칙)

---

## 비고

WebSocket과 다른 핸드셰이크·프레임 포맷을 사용하므로 Phase 5와 별도 구현.
