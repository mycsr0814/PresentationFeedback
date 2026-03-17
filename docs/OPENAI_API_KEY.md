# OpenAI API 키 발급 (Whisper 사용)

이 프로젝트의 **음성 인식(STT)** 은 **OpenAI의 Whisper API**를 사용합니다.  
그래서 **OpenAI API 키**가 필요합니다. (Whisper는 별도 서비스가 아니라 OpenAI API 하나로 사용합니다.)

---

## 1. API 키 발급

1. **OpenAI 사이트 접속**  
   → https://platform.openai.com/

2. **로그인 또는 회원가입**  
   - Google/Apple 계정으로 로그인 가능

3. **API 키 만들기**
   - 왼쪽 메뉴에서 **API keys** (또는 **API Keys**) 클릭  
   - **Create new secret key** 클릭  
   - 이름 입력(예: `presentation-feedback`) 후 생성  
   - **키가 한 번만 표시**되므로 반드시 복사해서 안전한 곳에 저장

4. **크레딧(결제) 설정**  
   - 처음 사용 시 **Billing**에서 결제 수단을 등록해야 API 사용 가능  
   - Whisper는 사용한 음성 길이만큼 과금 (저렴한 편)

---

## 2. 프로젝트에 키 넣기

1. **Server 폴더**에 `.env` 파일이 있는지 확인  
   - 없으면 `Server\.env.example` 내용을 복사해 `Server\.env` 파일 생성

2. **`.env` 파일을 열고** 다음 한 줄 추가 또는 수정:

   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
   ```

   `sk-proj-...` 부분을 본인이 복사한 API 키로 바꿉니다.

3. 저장한 뒤 **서버를 다시 실행**:

   ```powershell
   cd C:\PresentationFeedback\Server
   npm run dev
   ```

이제 **파일 업로드 → 음성 인식**을 하면 Whisper API가 호출됩니다.

---

## 3. API 키 없이 서버만 켜두고 싶을 때

- API 키가 없어도 **서버는 실행**됩니다. (키는 실제로 음성 파일을 업로드할 때만 검사합니다.)
- 키 없이 **업로드**를 하면 그때 `OPENAI_API_KEY가 설정되지 않았습니다` 오류가 나옵니다.
- 나중에 키를 발급해 `.env`에 넣고 서버만 다시 실행하면 됩니다.

---

## 4. 다른 선택지 (참고)

- **OpenAI API를 쓰지 않으려면**  
  - Whisper를 **직접 PC에 설치**해서 쓰는 방법이 있습니다. (무료지만 설정이 필요하고, GPU가 있으면 더 빠름)  
  - 그 경우 서버 코드에서 `whisper.ts`를 로컬 Whisper를 호출하도록 바꿔야 합니다.
- 지금 구조는 **OpenAI Whisper API** 기준이므로, 키 발급이 가장 빠릅니다.
