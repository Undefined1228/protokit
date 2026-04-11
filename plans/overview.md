# ProtoKit — 프로젝트 개요

## 개념

VS Code 내에서 REST API를 비롯한 다양한 네트워크 프로토콜을 테스트할 수 있는 확장 프로그램.
에디터를 벗어나지 않고 요청을 작성·전송·확인하는 워크플로우를 제공한다.

---

## 목표

- REST API 테스트를 1순위 기능으로 제공
- WebSocket, Socket.IO 등 다른 프로토콜로 점진적으로 확장
- VS Code의 UI 패턴(Webview, TreeView, StatusBar 등)을 활용해 네이티브한 사용감 제공

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

## 핵심 기능 (REST 기준)

- 요청 편집기: URL, Method, Headers, Body 입력
- 응답 뷰어: Status, Headers, Body(JSON 포맷팅 포함)
- 요청 히스토리: 최근 요청 목록 저장
- 컬렉션: 요청을 그룹으로 저장·관리
- 환경변수: `{{baseUrl}}` 형태의 변수 치환

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
  extension.ts        # 진입점, 커맨드 등록
  panels/             # Webview 패널 관련
  providers/          # TreeView provider 등
  protocols/          # 프로토콜별 클라이언트 로직
    http/
    websocket/
  storage/            # 컬렉션·히스토리 영속성
webview-ui/           # Webview 프론트엔드 소스
plans/                # 기획 문서
```

---

## 개발 단계

1. **Phase 1** — REST API 테스트 기본 기능 (요청 편집기 + 응답 뷰어)
2. **Phase 2** — 컬렉션·히스토리·환경변수
3. **Phase 3** — WebSocket 지원
4. **Phase 4** — 추가 프로토콜 확장
