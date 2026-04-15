# ProtoKit — 프로젝트 개요

## 개념

VS Code 내에서 REST API를 비롯한 다양한 네트워크 프로토콜을 테스트할 수 있는 확장 프로그램.
에디터를 벗어나지 않고 요청을 작성·전송·확인하는 워크플로우를 제공한다.

---

## 목표

- REST API 테스트를 1순위 기능으로 제공
- WebSocket, Socket.IO 등 다른 프로토콜로 점진적으로 확장
- VS Code의 UI 패턴을 활용해 네이티브한 사용감 제공

---

## UI 구조

```
[Activity Bar 아이콘]
        │
        ▼
┌──────────────┬──────────────────────────────────────┐
│ 사이드바      │  [GET /users] [POST /orders] [×]      │  ← VS Code 에디터 탭
│              │ ────────────────────────────────────  │
│ ▼ Auth API   │                                       │
│   GET /me    │         요청 편집기                    │
│   POST /...  │  Method  URL               [전송]     │
│              │  ─────────────────────────────────── │
│ ▼ Orders API │  Params  Headers  Body  Auth          │
│   GET /ord.. │                                       │
│              │  ─────────────────────────────────── │
│ ▼ 히스토리   │         응답 뷰어                     │
│   GET /users │  200 OK  123ms  1.2KB                │
└──────────────┴──────────────────────────────────────┘
```

- 좌측 Activity Bar 아이콘으로 진입
- 사이드바: 컬렉션·요청 트리 (Collection > Request 2단계) + 히스토리
- 환경변수는 컬렉션 단위로 관리 (우클릭 컨텍스트 메뉴)
- 요청 클릭 시 VS Code 에디터 탭으로 열림 → 다중 탭은 VS Code가 자연스럽게 처리

---

## 지원 프로토콜

| 상태 | 프로토콜 | 설명 |
|------|----------|------|
| ✅ 완료 | HTTP/HTTPS (REST) | GET, POST, PUT, DELETE, PATCH 등 |
| ✅ 완료 | WebSocket | 연결 유지·메시지 송수신 |
| ✅ 완료 | Socket.IO | 이벤트 기반 소켓 통신 |
| ✅ 완료 | GraphQL | Query, Mutation, Subscription |
| ✅ 완료 | SSE | Server-Sent Events |
| ✅ 완료 | TCP | Raw TCP 클라이언트 · 서버 |
| ✅ 완료 | UDP | Raw UDP 클라이언트 · 서버 |
| 🔜 예정 | Modbus TCP | 산업용 Modbus TCP 클라이언트 |
| 추후 검토 | gRPC | Protobuf 기반 RPC |

---

## 개발 단계

| Phase | 상태 | 내용 |
|-------|------|------|
| 1 | ✅ 완료 | REST API 기본 테스트 (요청 편집기 + 응답 뷰어 + 히스토리 + Cookie + Proxy + Redirect) |
| 2 | ✅ 완료 | 프로젝트 · 컬렉션 · 환경변수 · 검색 |
| 3 | ✅ 완료 | 인증 확장 (Basic Auth, API Key) |
| 4 | ✅ 완료 | 응답 검증 (Assertions) · Collection Runner |
| 4.5 | ✅ 완료 | QA 버그픽스 & 누락 기능 보완 (요청 업데이트, form-data, timeout/sslIgnore) |
| 4.6 | ✅ 완료 | RequestEditorPanel 파일 분리 (패널 로직 / webview UI 분리) |
| 4.7 | ✅ 완료 | Project 레이어 제거 & 환경변수 Collection 단위화 (v3 스키마 마이그레이션) |
| 5 | ✅ 완료 | WebSocket 클라이언트 · 서버 |
| 6 | ✅ 완료 | GraphQL 클라이언트 · 서버 |
| 7 | ✅ 완료 | SSE 클라이언트 · 서버 |
| 8 | ✅ 완료 | Socket.IO 클라이언트 · 서버 |
| 9 | ✅ 완료 | TCP · UDP 소켓 클라이언트 · 서버 |
| 10 | ✅ 완료 | 편의성 강화 (환경변수 자동완성 `{{` + 결과창 인라인 검색 `Cmd+F`) |
| 11 | 🔜 예정 | Modbus TCP 클라이언트 |

---

## 기술 스택

- **언어**: TypeScript
- **플랫폼**: VS Code Extension API (^1.96.0)
- **UI**: Webview (Vanilla TypeScript — HTML/CSS/JS 상수로 패널 파일과 분리)
- **빌드**: esbuild

---

## 프로젝트 구조

```
src/
  extension.ts              # 진입점, Activity Bar · 커맨드 등록
  panels/                   # Webview 패널 (에디터 + 응답 뷰어)
    RequestEditorPanel.ts   # REST API 패널 로직
    requestEditorWebview.ts # REST API 웹뷰 HTML/CSS/JS
    CollectionRunnerPanel.ts
    EnvironmentPanel.ts / environmentWebview.ts
    WebSocketPanel.ts / webSocketWebview.ts
    GraphQLPanel.ts / graphqlWebview.ts
    SSEPanel.ts / sseWebview.ts
    SocketIOPanel.ts / socketioWebview.ts
    TCPPanel.ts / tcpWebview.ts
    UDPPanel.ts / udpWebview.ts
    search.ts               # 결과창 인라인 검색 공유 모듈
    searchRegistry.ts       # 패널별 검색 컨테이너 레지스트리
    autocomplete.ts         # 환경변수 자동완성 공유 모듈
  providers/                # TreeView provider (사이드바)
    CollectionTreeProvider.ts
    HistoryTreeProvider.ts
  protocols/                # 프로토콜별 클라이언트·서버 로직
    http/
    ws/
    graphql/
    sse/
    socketio/
    tcp/
    udp/
  storage/
    store.ts                # Collection · Request · 환경변수 영속성 (v3 스키마)
plans/                      # 기획 문서
```
