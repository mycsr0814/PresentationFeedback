# Presentation Feedback — Server

## 설정

1. Node.js 18+ 설치 후:
   ```bash
   cd Server
   npm install
   ```
2. `.env.example`를 복사해 `.env` 생성 후 `OPENAI_API_KEY` 입력:
   ```bash
   copy .env.example .env
   ```
3. 개발 실행:
   ```bash
   npm run dev
   ```
4. 빌드 후 실행:
   ```bash
   npm run build
   npm start
   ```

## API

- `POST /api/upload` — `file` (multipart) 업로드 → Whisper 음성인식 → 분석 결과 JSON 반환
- `POST /api/analysis` — Body: `{ text, segments? }` → 분석만 수행
- `GET /api/health` — 상태 확인

## 환경 변수

- `PORT` (기본 4000)
- `OPENAI_API_KEY` (Whisper 사용)
- `UPLOAD_DIR` (업로드 저장 경로, 기본 `./uploads`)
