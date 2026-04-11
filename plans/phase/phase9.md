# Phase 9 — TCP / UDP 소켓

## 목표

순수 소켓 레벨의 TCP · UDP 통신을 클라이언트·서버 양쪽에서 테스트.

---

## TCP

### 클라이언트

- Host · Port 입력
- Connect / Disconnect 버튼
- 연결 상태 표시
- 데이터 전송: raw text, hex, binary
- 수신 스트림 뷰어: timestamp · 방향(송신/수신) · payload 표시
- 인코딩 선택 (UTF-8, hex, base64)

### 서버

- 포트 설정 후 로컬 TCP 서버 시작 / 중지
- 연결된 클라이언트 목록
- 수신 데이터 로그
- 데이터 전송: 특정 클라이언트 / 전체 broadcast
- 수신 데이터 기반 자동 응답 규칙 정의

---

## UDP

### 클라이언트

- Host · Port 입력
- 데이터 전송: raw text, hex, binary
- 수신 패킷 뷰어: timestamp · 송신지 · payload 표시
- 인코딩 선택 (UTF-8, hex, base64)

### 서버

- 포트 바인딩 후 로컬 UDP 서버 시작 / 중지
- 수신 패킷 로그 (송신지 주소 포함)
- 패킷 전송: 특정 주소 / broadcast
- 수신 패킷 기반 자동 응답 규칙 정의

---

## 비고

TCP는 연결 지향, UDP는 비연결이므로 UI 흐름이 다르게 구성됨.
