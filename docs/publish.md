# 퍼블리시 가이드

## 사전 준비

### Personal Access Token 발급

1. [Azure DevOps](https://dev.azure.com) 접속 → 우상단 프로필 → **Personal access tokens**
2. **New Token** 클릭
3. Organization: **All accessible organizations**
4. Scopes: **Marketplace** → **Manage** 체크
5. 토큰 복사 (창 닫으면 재확인 불가)

### vsce 로그인

```bash
npx vsce login ach9948
```

프롬프트에 발급한 토큰 붙여넣기. 로그인 정보는 로컬에 저장되므로 이후 생략 가능.

---

## 퍼블리시 절차

### 1. 버전 업

`package.json`의 `version` 필드를 직접 수정한다. `npm version minor`는 1씩만 증가하므로 여러 릴리스가 쌓인 경우 직접 지정.

```bash
# 예: 0.7.0 → 0.8.0
npm version 0.8.0 --no-git-tag-version
```

### 2. CHANGELOG 업데이트

`CHANGELOG.md`에 새 버전 항목 추가.

### 3. 빌드 확인

```bash
npm run package
```

타입 체크 + 린트 + esbuild 번들링. 오류 없으면 진행.

### 4. 배포

```bash
npm run deploy
```

내부적으로 `vsce publish` 실행. 성공 시 아래 두 URL 출력:

- **Extension URL**: `https://marketplace.visualstudio.com/items?itemName=ach9948.protokit`
- **Hub URL**: `https://marketplace.visualstudio.com/manage/publishers/ach9948/extensions/protokit/hub`

마켓플레이스 반영까지 수 분 소요.

---

## 빌드에서 제외되는 항목

`.vscodeignore`에 명시된 파일/폴더는 VSIX에 포함되지 않는다.

```
src/**        # 소스 — dist/만 포함
plans/**      # 개발 계획 문서
docs/**       # 이 가이드 포함
tree.txt
```
