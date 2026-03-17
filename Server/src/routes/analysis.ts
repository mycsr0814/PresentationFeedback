import { Router } from 'express';
import { analyzePresentation } from '../services/analyzer';

const router = Router();

interface Body {
  text?: string;
  segments?: { start: number; end: number; text: string }[];
}

router.post('/', (req, res) => {
  try {
    const { text = '', segments }: Body = req.body;
    const analysis = analyzePresentation({ text, segments });
    res.json(analysis);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '분석 오류';
    res.status(500).json({ error: message });
  }
});

export { router as analysisRouter };
