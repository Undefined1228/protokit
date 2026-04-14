# Phase 9 체크리스트 — TCP / UDP 소켓

> 참고 플랜: `plans/phase/phase9.md`

---

## 구현 원칙

- 파일 하나가 여러 기능 단위를 담당하면 즉시 분리를 검토한다. 줄 수가 아닌 기능 응집도 기준으로 판단한다.
- 기능이 늘어날수록 webview HTML/CSS/JS도 비대해지므로, 독립적인 관심사(응답 뷰어, 히스토리 등)는 별도 파일·모듈로 분리한다.
- 분리 전 반드시 사용자에게 확인한다.

---

## TCP 클라이언트

- [x] Host 입력
- [x] Port 입력
- [x] Connect 버튼
- [x] Disconnect 버튼
- [x] 연결 상태 표시
- [x] 데이터 전송: raw text
- [x] 데이터 전송: hex
- [x] 데이터 전송: binary (base64)
- [x] 수신 스트림 뷰어: timestamp 표시
- [x] 수신 스트림 뷰어: 방향(송신/수신) 표시
- [x] 수신 스트림 뷰어: payload 표시
- [x] 인코딩 선택 (UTF-8, hex, base64)

## TCP 서버

- [x] 포트 설정
- [x] 로컬 TCP 서버 시작 / 중지
- [x] 연결된 클라이언트 목록
- [x] 수신 데이터 로그
- [x] 데이터 전송: 특정 클라이언트
- [x] 데이터 전송: 전체 broadcast
- [x] 수신 데이터 기반 자동 응답 규칙 정의

## UDP 클라이언트

- [x] Host 입력
- [x] Port 입력
- [x] 데이터 전송: raw text
- [x] 데이터 전송: hex
- [x] 데이터 전송: binary (base64)
- [x] 수신 패킷 뷰어: timestamp 표시
- [x] 수신 패킷 뷰어: 송신지 표시
- [x] 수신 패킷 뷰어: payload 표시
- [x] 인코딩 선택 (UTF-8, hex, base64)

## UDP 서버

- [x] 포트 바인딩
- [x] 로컬 UDP 서버 시작 / 중지
- [x] 수신 패킷 로그 (송신지 주소 포함)
- [x] 패킷 전송: 특정 주소
- [x] 패킷 전송: broadcast
- [x] 수신 패킷 기반 자동 응답 규칙 정의

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
