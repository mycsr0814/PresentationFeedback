# Node.js 설치 가이드 (Windows)

발표 피드백 프로젝트를 실행하려면 Node.js가 필요합니다. 아래 순서대로 진행하세요.

---

## 1단계: 설치 파일 다운로드

1. 브라우저에서 **Node.js 공식 사이트**를 엽니다.  
   → https://nodejs.org/ko

2. **LTS(장기 지원) 버전**을 선택합니다.  
   - 초록색 버튼 예: `20.x.x LTS` 권장  
   - "LTS"가 붙은 쪽을 선택하면 안정적입니다.

3. **Windows Installer (.msi)** 를 다운로드합니다.  
   - 64비트 PC가 보통이면 `Windows Installer (.msi) 64-bit`  
   - 32비트면 32-bit 선택

---

## 2단계: 설치 실행

1. 다운로드한 **.msi** 파일을 더블클릭해 설치를 시작합니다.

2. **Next**를 눌러 진행하다가 다음 화면에서 확인합니다.  
   - **"Automatically install the necessary tools..."** (체크되어 있으면)  
     - 체크 해제해도 됩니다. (나중에 필요하면 따로 설치 가능)  
   - **"Add to PATH"** 는 반드시 포함된 상태로 두고 설치합니다.

3. **Install** → 관리자 권한 요청 시 **예** → 설치가 끝날 때까지 기다립니다.

4. **Finish**로 설치를 마칩니다.

---

## 3단계: 터미널 다시 열기

설치 후에는 **새 터미널**을 열어야 PATH가 적용됩니다.

- Cursor/VS Code를 쓰는 경우:  
  **터미널을 모두 닫았다가 다시 열거나**, Cursor를 한 번 종료했다가 다시 실행합니다.
- Windows 명령 프롬프트나 PowerShell을 쓰는 경우:  
  창을 닫고 새로 엽니다.

---

## 4단계: 설치 확인

새 터미널에서 아래 명령을 입력합니다.

```powershell
node -v
```

- 예: `v20.10.0` 처럼 버전 번호가 나오면 **Node.js 설치 성공**입니다.

```powershell
npm -v
```

- 예: `10.2.0` 처럼 번호가 나오면 **npm(패키지 매니저)도 사용 가능**입니다.

두 명령 모두 버전이 출력되면 다음 단계로 진행하면 됩니다.

---

## 5단계: 프로젝트에서 사용하기

1. **서버 실행**
   ```powershell
   cd c:\PresentationFeedback\Server
   npm install
   copy .env.example .env
   ```
   - `.env` 파일을 열어 `OPENAI_API_KEY=sk-...` 를 본인 API 키로 채운 뒤 저장합니다.

   ```powershell
   npm run dev
   ```
   - `Server running at http://localhost:4000` 이 보이면 서버가 떠 있는 것입니다.

2. **클라이언트 실행** (새 터미널에서)
   ```powershell
   cd c:\PresentationFeedback\Client
   npm install
   npm start
   ```
   - 안내에 따라 **w** 를 누르면 웹 브라우저에서 앱이 열립니다.

---

## 문제 해결

| 증상 | 확인/해결 |
|------|-----------|
| `node` 를 찾을 수 없다고 나옴 | 터미널과 Cursor를 완전히 종료 후 다시 실행한 뒤 `node -v` 재확인 |
| 권한 오류로 설치 실패 | 설치 파일을 **우클릭 → 관리자 권한으로 실행** |
| 이전 버전이 이미 있음 | 새 LTS 설치 시 "Repair" 또는 기존 제거 후 재설치 (제어판 → 프로그램 제거) |

설치가 끝나면 [README](../README.md)와 각 폴더의 README를 보고 서버·클라이언트를 순서대로 실행하면 됩니다.
