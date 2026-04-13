# Phase 4.6 — RequestEditorPanel 파일 분리

> Phase 4 ~ 4.5 구현 후 `RequestEditorPanel.ts`가 2,962줄에 달해 유지보수가 어려워진 상태.
> TypeScript 패널 로직과 webview UI 코드(HTML/CSS/JS)가 혼재된 구조를 분리한다.

---

## 목표

단일 파일에 혼재된 두 가지 기능 단위를 분리해 응집도를 높이고 향후 변경 범위를 명확히 한다.

---

## 현황 분석

| 파일 | 줄 수 | 문제 |
|------|-------|------|
| `panels/RequestEditorPanel.ts` | 2,962줄 | 패널 로직 ~280줄 + webview HTML/CSS/JS ~2,680줄 혼재 |
| `panels/CollectionRunnerPanel.ts` | 761줄 | 동일한 패턴이나 규모상 허용 범위 |

---

## 분리 범위

### `panels/RequestEditorPanel.ts` → 두 파일로 분리

**`panels/RequestEditorPanel.ts`** (패널 로직만 유지)
- 클래스 `RequestEditorPanel`
- 메시지 핸들링 (`handleMessage`, `executeSend`, `handleSaveRequest`, 등)
- `buildWebviewHtml()` 함수 — webview 파일에서 상수를 import해 조립

**`panels/requestEditorWebview.ts`** (신규 — webview UI 코드)
- `CSS` 상수
- `HTML` 상수
- `JS` 상수
- 세 상수를 named export로 내보냄

---

## 변경하지 않는 것

- `CollectionRunnerPanel.ts` — 761줄로 허용 범위, 이번 페이즈에서 건드리지 않음
- `extension.ts`, `store.ts`, `providers/`, `protocols/` — 변경 없음
- 기능 동작 — 리팩터링이므로 외부 동작 변경 없음

---

## 완료 조건

- `RequestEditorPanel.ts`의 실제 패널 로직이 한눈에 보이는 수준으로 줄어듦
- `requestEditorWebview.ts`가 HTML/CSS/JS 상수만 담고 있음
- 기존 기능 전체 정상 동작
