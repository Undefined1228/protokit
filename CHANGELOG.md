# 변경 이력

## [Unreleased]

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

### 추가 — Phase 2: 프로젝트 & 컬렉션 & 환경변수

- 프로젝트 생성 · 이름 변경 · 삭제 · 전환
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
  - Phase 1: REST API 기본 테스트
  - Phase 2: 프로젝트 · 컬렉션 · 환경변수
  - Phase 3: 인증 확장 (Basic Auth, API Key)
  - Phase 4: 응답 검증 · Collection Runner
  - Phase 5: WebSocket 클라이언트 · 서버
  - Phase 6: GraphQL 클라이언트 · 서버
  - Phase 7: SSE 클라이언트 · 서버
  - Phase 8: Socket.IO 클라이언트 · 서버
  - Phase 9: TCP · UDP 소켓 클라이언트 · 서버
