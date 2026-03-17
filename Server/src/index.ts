import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { uploadRouter } from './routes/upload';
import { analysisRouter } from './routes/analysis';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/upload', uploadRouter);
app.use('/api/analysis', analysisRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Presentation Feedback API' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
