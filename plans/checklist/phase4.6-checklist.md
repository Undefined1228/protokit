# Phase 4.6 체크리스트 — RequestEditorPanel 파일 분리

> 참고 플랜: `plans/phase/phase4.6.md`

---

## 분리 작업

### 신규 파일: `panels/requestEditorWebview.ts`

- [x] `CSS` 상수 이동 및 `export const CSS` 선언
- [x] `HTML` 상수 이동 및 `export const HTML` 선언
- [x] `JS` 상수 이동 및 `export const JS` 선언

### 기존 파일: `panels/RequestEditorPanel.ts`

- [x] `requestEditorWebview.ts`에서 `CSS`, `HTML`, `JS` import
- [x] `buildWebviewHtml()` — import한 상수를 사용하도록 수정
- [x] 이동된 상수 블록 제거 후 파일 정리

---

## 검증

- [ ] 요청 전송 정상 동작 확인
- [ ] 저장 요청 불러오기 정상 동작 확인
- [ ] Assertion 동작 정상 확인
- [x] `tree.txt` 갱신

---

## 완료 후 처리

- [x] `CHANGELOG.md`에 해당 페이즈 변경 내용 추가
