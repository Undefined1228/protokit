# ProtoKit

VS Code 내에서 REST API를 비롯한 다양한 네트워크 프로토콜을 테스트할 수 있는 확장 프로그램.
에디터를 벗어나지 않고 요청 작성·전송·확인은 물론, 로컬 서버까지 띄워 클라이언트·서버 양쪽을 모두 테스트할 수 있다.

---

## 기능

### REST API

- Method 선택 (GET, POST, PUT, DELETE, PATCH)
- URL · Params · Headers · Body (JSON, form-data, x-www-form-urlencoded) 편집
- Bearer Token / Basic Auth / API Key 인증
- Content-Type 자동 설정
- `Ctrl+Enter` 단축키로 요청 전송 · 취소
- Timeout · SSL 검증 무시 · Proxy 설정
- Redirect 체인 추적
- Cookie 자동 관리
- 응답 뷰어: Status · 응답 시간 · 크기 · Body (Pretty/Raw) · Headers
- cURL 복사 · 코드 스니펫 생성 (fetch, axios, Python requests, Java)
- 응답 body 파일 저장
- 요청 히스토리 자동 저장

### 컬렉션 & 환경변수

- 컬렉션 > 요청 계층 구조
- 환경변수 (`{{변수명}}` 치환) · 환경 전환 (dev, staging, prod)
- `{{` 입력 시 현재 환경의 변수 목록 자동완성 드롭다운 (REST API · WebSocket · GraphQL · SSE · Socket.IO URL 입력창 등 전 에디터 지원)
- 요청 복제 · 검색
- 컬렉션 import / export (JSON)

### 응답 검증 · 자동화

- Assertions: status code · body 필드 · 응답 시간 조건 정의
- Collection Runner: 컬렉션 일괄 실행 · 결과 대시보드

### WebSocket

- 클라이언트: 연결 · 메시지 송수신 스트림
- 서버: 로컬 WS 서버 · 클라이언트 관리 · broadcast

### GraphQL

- 클라이언트: Query · Mutation · Subscription 실행
- Variables 편집기 (JSON) · 요청 헤더 설정
- Schema Introspection: 엔드포인트에서 타입 트리 자동 조회
- Subscription 실시간 스트림 뷰
- 서버: 로컬 GraphQL 서버 · SDL 스키마 편집기 · Resolver 정의
- Subscription 이벤트 수동 발행 · 내장 Playground UI

### SSE (Server-Sent Events)

- 클라이언트: 연결 헤더 설정 · 수신 이벤트 스트림 뷰어 · 이벤트 타입 필터 · Last-Event-ID 추적 · 로그 저장
- 서버: 로컬 SSE 서버 · 연결 클라이언트 관리 · 이벤트 수동 전송 · broadcast · 반복 전송 스케줄

### Socket.IO

- 클라이언트: Namespace · Transport · Auth 설정 · 이벤트 리스너 동적 등록 · 이벤트 emit · Room join/leave · 로그 저장
- 서버: 다중 네임스페이스 · 연결 클라이언트 추적 · 이벤트 전송 (특정 클라이언트 / Room / broadcast) · 자동 응답 핸들러

### TCP

- 클라이언트: Host · Port 입력 · Connect/Disconnect · 수신 스트림 뷰어 · 인코딩 선택 (UTF-8 / Hex / Base64) · 로그 저장
- 서버: 로컬 TCP 서버 · 다중 클라이언트 관리 · 특정 클라이언트 전송 / broadcast · 자동 응답 규칙

### UDP

- 클라이언트: 임의 주소로 패킷 전송 · 수신 패킷 뷰어 · 인코딩 선택 · 로그 저장
- 서버: 로컬 UDP 서버 · 수신 패킷 로그 · 특정 주소 전송 / broadcast · 자동 응답 규칙

---

## 사용법

좌측 Activity Bar에서 ProtoKit 아이콘 클릭 → 사이드바에서 컬렉션 관리, 요청 클릭 시 에디터 탭으로 열림.

| 단축키 | 동작 |
|---|---|
| `Ctrl+Enter` / `Cmd+Enter` | 요청 전송 / 취소 |
| `Ctrl+F` / `Cmd+F` | 결과창 인라인 검색 (모든 패널) |

---

## 라이센스

[MIT](LICENSE)
