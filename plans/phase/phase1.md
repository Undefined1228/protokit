# Phase 1 — REST API 기본 테스트

## 목표

에디터를 벗어나지 않고 HTTP 요청을 보내고 응답을 확인할 수 있는 최소 완성 도구.

---

## 기능 범위

### 요청 편집기

- Method 선택 (GET, POST, PUT, DELETE, PATCH)
- URL 입력
- 탭 구성
  - Params: 쿼리 파라미터 key/value 입력
  - Headers: 헤더 key/value 입력
  - Body: raw(JSON), form-data, x-www-form-urlencoded

### 응답 뷰어

- Status code / 응답 시간 / 응답 크기 표시
- 탭 구성
  - Body: JSON 포맷팅 + 구문 강조
  - Headers: 응답 헤더 목록

### 히스토리

- 요청 전송 시 자동 저장
- 최근 N건 목록 표시
- 클릭 시 요청 편집기에 복원

---

## 제외 범위 (다음 Phase)

- 컬렉션 저장·관리
- 환경변수
- 인증 (Auth 탭)
