# 변경 이력

## [0.4.0] - 2026-04-14

### 추가 — Phase 8: Socket.IO 클라이언트 & 서버

- `protocols/socketio/client.ts` 신규 — `socket.io-client` 기반 Socket.IO 클라이언트 (`SioClient`), 네임스페이스·transport·auth 설정, 이벤트 리스너 동적 등록, Room join/leave
- `protocols/socketio/server.ts` 신규 — `socket.io` 기반 로컬 Socket.IO 서버 (`SioServer`), 다중 네임스페이스 정의, 연결 클라이언트 추적, 자동 응답 핸들러 (이벤트명·정규식 매칭·응답 이벤트)
- `panels/SocketIOPanel.ts` 신규 — 클라이언트/서버 연결 관리 및 webview 메시지 라우팅
- `panels/socketioWebview.ts` 신규 — Socket.IO UI (CSS · HTML · JS)
- **클라이언트 탭**: URL 입력, Namespace 설정, Transport 선택 (websocket / polling), Auth payload (JSON), Connect/Disconnect 버튼, 연결 상태 뱃지, 이벤트 리스너 등록 (태그 방식), 이벤트 수신 스트림 (timestamp · event name · payload), 이벤트 emit (event name · payload), Room join/leave, 로그 저장
- **서버 탭**: 포트 설정, Namespace 정의 (쉼표 구분 다중 입력), 서버 시작/중지, 연결된 클라이언트 목록 (socket id · namespace), 이벤트 전송 — 특정 클라이언트 / Room / 전체 broadcast, 자동 응답 핸들러 (이벤트명 + 정규식 match → 응답 이벤트 + 페이로드)
- `protokit.newSocketIO` 커맨드 추가 — `protokit.newConnectionMenu` 서브메뉴에 등록
- `socket.io`, `socket.io-client` npm 패키지 의존성 추가
- `tsconfig.json`에 `skipLibCheck: true` 추가 (socket.io-client 브라우저 타입 참조 해소)

## [0.3.0] - 2026-04-14

### 추가 — Phase 7: SSE (Server-Sent Events) 클라이언트 & 서버

- `protocols/sse/client.ts` 신규 — Node.js 내장 `http`/`https` 기반 SSE 클라이언트 (`SseClient`), SSE 스트림 파싱, Last-Event-ID 추적, 자동 재연결 (retry 지원)
- `protocols/sse/server.ts` 신규 — 로컬 SSE HTTP 서버 (`SseServer`), `text/event-stream` 응답, 연결된 클라이언트 관리, 반복 전송 스케줄
- `panels/SSEPanel.ts` 신규 — 클라이언트/서버 연결 관리 및 webview 메시지 라우팅
- `panels/sseWebview.ts` 신규 — SSE UI (CSS · HTML · JS)
- **클라이언트 탭**: URL 입력, 연결 헤더 설정, Connect/Disconnect 버튼, 연결 상태 뱃지, 수신 이벤트 스트림 뷰어 (timestamp · event type · data · id), 이벤트 타입별 필터링, Last-Event-ID 표시, 로그 저장
- **서버 탭**: 포트 설정, 로컬 SSE 서버 시작/중지, 연결된 클라이언트 목록, 이벤트 수동 전송 (event type · data · id), 전체 클라이언트 broadcast, 반복 전송 스케줄 (N초 간격 자동 발행)
- `protokit.newSSE` 커맨드 추가 — 컬렉션 뷰 툴바에서 접근 가능

## [0.2.0] - 2026-04-14

### 추가 — Phase 6: GraphQL 클라이언트 & 서버

- `protocols/graphql/client.ts` 신규 — HTTP(Query/Mutation) 및 `graphql-ws` 기반 Subscription 클라이언트 (`GqlClient`), Schema Introspection 지원
- `protocols/graphql/server.ts` 신규 — 로컬 GraphQL HTTP 서버 (`GqlServer`), SDL 기반 스키마 빌드, Resolver 정의, WebSocket Subscription 지원
- `panels/GraphQLPanel.ts` 신규 — 클라이언트/서버 연결 관리 및 webview 메시지 라우팅, 내장 Playground 창 열기
- `panels/graphqlWebview.ts` 신규 — GraphQL UI (CSS · HTML · JS)
- **클라이언트 탭**: Endpoint URL, Operation 선택(Query/Mutation/Subscription), Query 편집기, Variables 편집기(JSON), 요청 헤더 설정, Schema Introspection(스키마 트리 뷰), 응답 JSON 뷰어, Subscription 실시간 스트림 뷰
- **서버 탭**: 포트 설정, 로컬 GraphQL 서버 시작/중지, SDL 스키마 편집기, Resolver 정의(필드·반환값), Subscription 이벤트 수동 발행, 내장 Playground UI(별도 webview 패널)
- `protokit.newGraphQL` 커맨드 추가 — 컬렉션 뷰 툴바에서 접근 가능
- `graphql`, `graphql-ws` npm 패키지 의존성 추가

## [0.1.0] - 2026-04-13

### 추가 — Phase 5: WebSocket 클라이언트 & 서버

- `protocols/ws/client.ts` 신규 — `ws` 패키지 기반 WebSocket 클라이언트 래퍼 (`WsClient`)
- `protocols/ws/server.ts` 신규 — 로컬 WebSocket 서버 래퍼 (`WsServer`), 이벤트 핸들러 규칙 지원
- `panels/WebSocketPanel.ts` 신규 — 클라이언트/서버 연결 관리 및 webview 메시지 라우팅
- `panels/webSocketWebview.ts` 신규 — WebSocket UI (CSS · HTML · JS)
- **클라이언트 탭**: URL 입력 (ws:// / wss://), 연결 헤더, Connect/Disconnect 버튼, 연결 상태 뱃지, 메시지 송수신 (text/JSON), 스트림 뷰어 (방향·타임스탬프·payload), 필터(전체/송신/수신), 로그 저장
- **서버 탭**: 포트 설정, 로컬 WS 서버 시작/중지, 연결된 클라이언트 목록, 수신 메시지 로그, 개별/전체 broadcast 전송, 이벤트 핸들러(연결·메시지·해제 시 자동 응답 규칙)
- `protokit.newWebSocket` 커맨드 추가 — 컬렉션 뷰 툴바에서 접근 가능
- `ws` npm 패키지 의존성 추가

### 리팩터링 — Phase 4.7: Project 레이어 제거 & 환경변수 Collection 단위화

- `Project > Collection > Request` 3단계 구조에서 Project 레이어 제거 → `Collection > Request` 2단계로 단순화
- `Collection`에 `environments`, `activeEnvironmentId` 필드 추가 — 환경변수를 컬렉션 단위로 귀속
- `STATE_KEY` `'protokit.v2'` → `'protokit.v3'` 변경, v2 데이터 자동 마이그레이션 (프로젝트 평탄화 + 부모 환경변수 복사)
- Project 관련 커맨드 4개 제거 (`newProject`, `renameProject`, `deleteProject`, `switchProject`)
- 트리뷰 상단 툴바에서 `switchProject` · `manageEnvironments` 제거, 컬렉션 우클릭 컨텍스트 메뉴에 `환경변수 관리` 추가
- `CollectionItem description`에 활성 환경 이름 표시
- `RequestEditorPanel` · `CollectionRunnerPanel`에서 `projectId` 파라미터 완전 제거
- 환경변수 치환 `{{변수}}`를 컬렉션 단위로 적용
- `viewsWelcome` 문구를 컬렉션 중심으로 변경

### 리팩터링 — Phase 4.6: RequestEditorPanel 파일 분리

- `panels/RequestEditorPanel.ts` (2,962줄) → 패널 로직 파일(297줄)과 webview UI 파일로 분리
- `panels/requestEditorWebview.ts` 신규 생성 — CSS · HTML · JS 상수를 named export로 관리
- 기능 동작 변경 없음

### 수정 — Phase 4.5: QA 버그픽스 & 누락 기능 보완

- **B-1**: 저장된 요청 업데이트 — 컬렉션에서 연 요청 저장 시 "현재 요청 업데이트 / 새 요청으로 저장" QuickPick 제공. `store.updateRequest()` 구현
- **B-2**: Collection Runner form-data body 처리 — multipart/form-data 직렬화 및 `Content-Type` 헤더(boundary 포함) 자동 설정
- **B-3**: Collection Runner timeout · sslIgnore — `SavedRequest`에 `timeout?` · `sslIgnore?` 필드 추가. 요청 저장 시 현재 설정값 포함, Runner 실행 시 저장값 사용(미설정 시 기본값 30s / false)
- **U-2**: `Assertion` 인터페이스에서 미사용 `id?` 필드 제거

### 추가 — Phase 4: 응답 검증 & Collection Runner

- **Assertions 탭**: 요청별 검증 조건 정의 (Status Code · Body 필드 존재/값 · 응답 시간)
- 요청 전송 후 Assertions 결과 표시 (pass/fail) — 응답 뷰어 Assertions 탭
- **Collection Runner**: 컬렉션 내 요청 순서대로 자동 실행 (컬렉션 우클릭 → 컬렉션 실행)
- 실행 대시보드: 요청별 Status · 응답 시간 · Assertions 결과 실시간 표시
- 실패한 요청 강조 표시 (빨간 행)
- 실행 결과 JSON 내보내기

### 추가 — Phase 3: 인증 확장

- Basic Auth: username / password 입력 → Base64 인코딩 후 `Authorization: Basic ...` 헤더 자동 삽입
- API Key: key / value 입력 + 삽입 위치 선택 (Header / Query Param)

### 추가 — Phase 2: 컬렉션 & 환경변수

- 컬렉션 생성 · 이름 변경 · 삭제 · TreeView 표시
- 요청 저장 · 이름 변경 · 삭제 · 순서 변경 · 복제 · 복원
- 컬렉션 / 히스토리 요청 검색
- 환경(Environment) 생성 · 전환 · 변수 편집
- URL · Headers · Body에서 `{{변수명}}` 치환

### 추가 — Phase 1: REST API 기본 테스트

- 요청 편집기: Method · URL · Params · Headers · Body (JSON / form-data / urlencoded)
- Body 타입 선택 시 Content-Type 헤더 자동 설정
- Auth: Bearer Token → `Authorization` 헤더 자동 삽입
- 요청 전송 / 취소, Timeout · SSL 무시 · Proxy · Redirect 설정
- Cookie 자동 관리 · 수동 편집
- cURL 복사 및 코드 스니펫 생성 (fetch · axios · Python · Java)
- 응답 뷰어: status · 시간 · 크기 · Body · Headers · 파일 저장
- 히스토리 자동 저장 · 목록 표시 · 복원

## [0.0.1] - 2026-04-11

### 추가

- 초기 프로젝트 설정
- Activity Bar 기반 UI 구조 설계
- Phase 1~9 개발 로드맵 수립
