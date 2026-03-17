import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { transcribeWithWhisper } from '../services/whisper';
import { analyzePresentation } from '../services/analyzer';

const router = Router();
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.webm';
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(webm|mp4|mp3|m4a|wav|ogg|mov)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error('오디오/영상 파일만 업로드 가능합니다.'));
  },
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: '파일이 없습니다.' });
    }

    const transcript = await transcribeWithWhisper(file.path);
    const analysis = await analyzePresentation(transcript);

    res.json({
      jobId: path.basename(file.path, path.extname(file.path)),
      transcript,
      analysis,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '처리 중 오류';
    console.error('Upload/analyze error:', err);
    res.status(500).json({ error: message });
  }
});

export { router as uploadRouter };
