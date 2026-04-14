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
