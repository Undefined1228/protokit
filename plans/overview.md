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
│ ▼ My Project │                                       │
│   ▼ Auth API │         요청 편집기                    │
│     GET /me  │  Method  URL               [전송]     │
│     POST /.. │  ─────────────────────────────────── │
│              │  Params  Headers  Body  Auth          │
│ ▼ 히스토리   │                                       │
│   GET /users │  ─────────────────────────────────── │
│   POST /...  │         응답 뷰어                     │
│              │  200 OK  123ms  1.2KB                │
└──────────────┴──────────────────────────────────────┘
```

- 좌측 Activity Bar 아이콘으로 진입
- 사이드바: 프로젝트·컬렉션·요청 트리 + 히스토리
- 요청 클릭 시 VS Code 에디터 탭으로 열림 → 다중 탭은 VS Code가 자연스럽게 처리

---

## 지원 예정 프로토콜

| 우선순위 | 프로토콜 | 설명 |
|---------|----------|------|
| 1 | HTTP/HTTPS (REST) | GET, POST, PUT, DELETE, PATCH 등 |
| 2 | WebSocket | 연결 유지·메시지 송수신 |
| 3 | Socket.IO | 이벤트 기반 소켓 통신 |
| 4 | GraphQL | Query, Mutation, Subscription |
| 추후 검토 | gRPC | Protobuf 기반 RPC |
| 추후 검토 | SSE | Server-Sent Events |

---

## 개발 단계

| Phase | 내용 |
|-------|------|
| 1 | REST API 기본 테스트 (요청 편집기 + 응답 뷰어 + 히스토리 + Cookie + Proxy + Redirect) |
| 2 | 프로젝트 · 컬렉션 · 환경변수 · 검색 |
| 3 | 인증 확장 (Basic Auth, API Key) |
| 4 | 응답 검증 (Assertions) · Collection Runner |
| 5 | WebSocket 클라이언트 · 서버 |
| 6 | GraphQL 클라이언트 · 서버 |
| 7 | SSE 클라이언트 · 서버 |

---

## 기술 스택

- **언어**: TypeScript
- **플랫폼**: VS Code Extension API (^1.96.0)
- **UI**: Webview (React 또는 Vanilla TS — 추후 결정)
- **빌드**: esbuild

---

## 프로젝트 구조 방향

```
src/
  extension.ts        # 진입점, Activity Bar 등록
  panels/             # Webview 패널 (요청 편집기 + 응답 뷰어)
  providers/          # TreeView provider (사이드바)
  protocols/          # 프로토콜별 클라이언트 로직
    http/
    websocket/
  storage/            # 프로젝트·컬렉션·히스토리 영속성
webview-ui/           # Webview 프론트엔드 소스
plans/                # 기획 문서
```
