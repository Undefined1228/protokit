# Phase 10 — 편의성 강화

## 목표

개발 워크플로우에서 자주 쓰이는 기능의 사용성을 개선한다.
새로운 프로토콜 추가 없이 기존 기능의 완성도를 높이는 데 집중한다.

---

## 환경변수 자동완성

`{{` 입력 시 현재 활성 환경의 변수 목록을 드롭다운으로 제안.

- 적용 대상: 모든 에디터의 URL 입력창, 헤더, 바디 등 텍스트 입력 필드
  - REST API 에디터 (URL, 헤더, 바디, 파라미터)
  - WebSocket 에디터 (URL)
  - GraphQL 에디터 (URL)
  - SSE 에디터 (URL)
  - Socket.IO 에디터 (URL)
- 자동완성 로직은 공유 모듈(`autocomplete.ts`)로 분리해 각 웹뷰에서 재사용
- WebSocket / GraphQL / SSE / Socket.IO 패널은 `setEnvVars` 메시지 수신 지원 추가 필요

---

## 결과창 인라인 검색

`Ctrl+F` (Windows/Linux) / `Cmd+F` (macOS) 로 결과 영역 내 텍스트 검색.

- 공유 모듈 (`search.ts`) 로 분리해 각 webview에서 재사용
- 검색 UI는 화면 우상단에 플로팅 오버레이로 표시 (상시 노출 검색바 아님)
- 입력 중 실시간 하이라이트, `Enter` / `Shift+Enter` 로 다음·이전 이동
- `Escape` 또는 닫기 버튼으로 해제, 해제 시 하이라이트 제거
- 매치 카운트 표시 (예: `3 / 12`)
- 현재 탭에서 보이는 컨테이너만 검색 대상으로 적용

### 적용 대상

| webview | 컨테이너 ID |
|---------|------------|
| REST API | `response-body-pre` |
| WebSocket | `client-stream`, `server-stream` |
| GraphQL | `responseBody`, `streamList`, `reqLog` |
| SSE | `client-stream`, `server-stream` |
| Socket.IO | `client-stream` |
| TCP | `c-log`, `s-log` |
| UDP | `c-log`, `s-log` |

---

## 비고

- `RequestEditorPanel.ts`의 `pushEnvVars()` 패턴을 레퍼런스로 활용한다.
- 패널에 `store`가 없는 경우, 전역 활성 환경변수를 가져오는 fallback 로직(`RequestEditorPanel.ts` 참고)을 동일하게 적용한다.
- TCP / UDP 패널은 URL 입력 개념이 없으므로 환경변수 자동완성 대상에서 제외한다.
