# ProtoKit

VS Code 내에서 REST API를 비롯한 다양한 네트워크 프로토콜을 테스트할 수 있는 확장 프로그램.
에디터를 벗어나지 않고 요청 작성·전송·확인은 물론, 로컬 서버까지 띄워 클라이언트·서버 양쪽을 모두 테스트할 수 있다.

---

## 기능

### REST API (Phase 1)

- Method 선택 (GET, POST, PUT, DELETE, PATCH)
- URL · Params · Headers · Body (JSON, form-data, x-www-form-urlencoded) 편집
- Bearer Token 인증
- Content-Type 자동 설정
- `Ctrl+Enter` 단축키로 요청 전송 · 취소
- Timeout · SSL 검증 무시 · Proxy 설정
- Redirect 체인 추적
- Cookie 자동 관리
- 응답 뷰어: Status · 응답 시간 · 크기 · Body (Pretty/Raw) · Headers
- cURL 복사 · 코드 스니펫 생성 (fetch, axios, Python requests)
- 응답 body 파일 저장
- 요청 히스토리 자동 저장

### 프로젝트 · 컬렉션 (Phase 2)

- 프로젝트 > 컬렉션 > 요청 계층 구조
- 환경변수 (`{{변수명}}` 치환) · 환경 전환 (dev, staging, prod)
- 요청 복제 · 검색
- 컬렉션 import / export (JSON)

### 인증 확장 (Phase 3)

- Basic Auth
- API Key (헤더 / 쿼리 파라미터)

### 응답 검증 · 자동화 (Phase 4)

- Assertions: status code · body 필드 · 응답 시간 조건 정의
- Collection Runner: 컬렉션 일괄 실행 · 결과 대시보드

### WebSocket (Phase 5)

- 클라이언트: 연결 · 메시지 송수신 스트림
- 서버: 로컬 WS 서버 · 클라이언트 관리 · broadcast

### GraphQL (Phase 6)

- 클라이언트: Query · Mutation · Subscription · Schema introspection
- 서버: Schema · Resolver 정의 · 로컬 서버 · Playground

### SSE (Phase 7)

- 클라이언트: 이벤트 스트림 수신 · 필터링
- 서버: 로컬 SSE 서버 · 이벤트 수동 발행 · 반복 스케줄

### Socket.IO (Phase 8)

- 클라이언트: 이벤트 송수신 · 네임스페이스 · Room
- 서버: 로컬 Socket.IO 서버 · broadcast · 자동 응답 규칙

### TCP · UDP (Phase 9)

- 클라이언트: 데이터 송수신 (text, hex, binary)
- 서버: 로컬 TCP · UDP 서버 · 자동 응답 규칙

---

## 사용법

좌측 Activity Bar에서 ProtoKit 아이콘 클릭 → 사이드바에서 프로젝트·컬렉션 관리, 요청 클릭 시 에디터 탭으로 열림.

---

## 라이센스

[MIT](LICENSE)
