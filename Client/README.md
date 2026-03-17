# 발표 피드백 — 클라이언트 (Expo)

웹·iOS·Android 동시 지원. 토스 스타일 UI + 빨간 포인트 컬러.

## 실행

1. Node 18+ 설치 후:
   ```bash
   cd Client
   npm install
   ```
2. 서버 주소 설정(선택):
   - `Client/.env`에 `EXPO_PUBLIC_API_URL=http://실제서버주소:4000` 추가
   - 로컬: 웹은 `http://localhost:4000`, 앱은 PC IP 사용 (예: `http://192.168.0.10:4000`)
3. 개발 서버:
   ```bash
   npm start
   ```
   - 웹: 터미널에서 `w` 입력
   - Android/iOS: Expo Go로 QR 스캔

## 화면

- **홈**: 안내 + "녹화/업로드" 진입
- **녹화/업로드**: 파일 선택 후 서버 업로드 → 분석 결과로 이동
- **결과**: 분당 단어 수, 추임새 횟수·비율, 제안, 인식 텍스트

## 환경 변수

- `EXPO_PUBLIC_API_URL`: API 서버 URL (기본 `http://localhost:4000`)

---

## 설치 오류 나올 때

### 1. `bob` 명령을 찾을 수 없음 / react-native-screens 설치 실패

- **원인**: `react-native-screens`의 설치 후 스크립트가 `bob`을 사용하는데, 이 도구가 PATH에 없어서 발생합니다.
- **해결 1**: 프로젝트에 `react-native-builder-bob`을 넣어 두었으므로, **한 번 실패한 뒤** 아래처럼 `node_modules`를 지우고 다시 설치해 보세요.
  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```
- **해결 2**: 그래도 실패하면 스크립트 없이 설치한 뒤 웹으로만 실행해 보세요.
  ```powershell
  npm install --ignore-scripts
  npx expo start --web
  ```
  (웹 빌드에는 `bob`이 필요 없어서 대부분 동작합니다.)

### 2. `EBUSY` / `EPERM` / cleanup Failed

- **원인**: 다른 프로그램(예: Cursor, 백신)이 `node_modules` 안 파일을 잡고 있어서 삭제·정리가 안 되는 경우입니다.
- **해결**:
  1. Cursor(또는 사용 중인 에디터)를 완전히 종료합니다.
  2. 새 PowerShell 창을 열고 `Client` 폴더로 이동한 뒤:
     ```powershell
     Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
     npm install
     ```
  3. 다시 Cursor를 열고 `npm start` 후 `w`로 웹 실행합니다.

### 3. deprecated 경고 (inflight, glob 등)

- 의존성 패키지들이 쓰는 오래된 라이브러리에 대한 경고입니다. **설치는 완료된 것**이면 무시해도 되고, 나중에 Expo/React Native를 올리면 줄어드는 경우가 많습니다.
