import { Transcript } from './whisper';

// 한국어 추임새/군더더기 패턴 (정규식 + 단어)
const FILLER_PATTERNS: RegExp[] = [
  /\b(음|어|그|저기|막|약간|뭐|그래서|그러니까|이제|네|음음|어어)\b/gi,
  /\b(같은|같이|이런|그런)\s*(거?|것?)\s*(요?|예요?|입니다)?/gi,
  /\b(아|에|으)\s*(\.\.\.|…)/gi,
];

const FILLER_WORDS = new Set([
  '음', '어', '그', '저기', '막', '약간', '뭐', '그래서', '그러니까', '이제',
  '네', '같은', '같이', '이런', '그런', '아', '에', '으',
]);

export interface AnalysisResult {
  summary: {
    totalDurationSeconds: number;
    wordCount: number;
    sentenceCount: number;
    wordsPerMinute: number;
    fillerCount: number;
    fillerRatio: number;
  };
  fillers: { word: string; count: number }[];
  suggestions: string[];
}

function extractFillers(text: string): { word: string; count: number }[] {
  const counts: Record<string, number> = {};
  const lower = text;

  for (const pattern of FILLER_PATTERNS) {
    let m: RegExpExecArray | null;
    pattern.lastIndex = 0;
    while ((m = pattern.exec(lower)) !== null) {
      const w = m[0].toLowerCase().replace(/\s+/g, '').slice(0, 10);
      if (w) counts[w] = (counts[w] || 0) + 1;
    }
  }

  const words = lower.split(/\s+/);
  for (const w of words) {
    const normalized = w.replace(/[^\uAC00-\uD7A3a-zA-Z]/g, '');
    if (FILLER_WORDS.has(normalized)) {
      counts[normalized] = (counts[normalized] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}

function estimateDuration(transcript: Transcript): number {
  if (transcript.segments?.length) {
    const last = transcript.segments[transcript.segments.length - 1];
    return last ? last.end : 0;
  }
  const wpm = 150;
  const words = (transcript.text || '').trim().split(/\s+/).filter(Boolean).length;
  return (words / wpm) * 60;
}

export function analyzePresentation(transcript: Transcript): AnalysisResult {
  const text = (transcript.text || '').trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sentenceCount = (text.match(/[.!?。.!?]\s*|$/g) || []).length || 1;
  const durationSec = estimateDuration(transcript);
  const durationMin = durationSec / 60 || 0.1;
  const wordsPerMinute = Math.round(wordCount / durationMin);
  const fillers = extractFillers(text);
  const fillerCount = fillers.reduce((s, f) => s + f.count, 0);
  const fillerRatio = wordCount > 0 ? Math.round((fillerCount / wordCount) * 1000) / 10 : 0;

  const suggestions: string[] = [];
  if (fillerRatio > 5) {
    suggestions.push('추임새(음, 어, 그…) 사용이 많아요. 짧은 멈춤으로 대체해 보세요.');
  }
  if (wordsPerMinute > 200) {
    suggestions.push('말하기 속도가 빠른 편이에요. 핵심 문장에서만 속도를 낮추면 이해도가 올라갑니다.');
  }
  if (wordsPerMinute < 100 && wordCount > 50) {
    suggestions.push('속도를 조금 올리면 집중도가 좋아질 수 있어요.');
  }
  if (suggestions.length === 0) {
    suggestions.push('전체적으로 안정적인 말하기 속도와 표현이에요.');
  }

  return {
    summary: {
      totalDurationSeconds: Math.round(durationSec),
      wordCount,
      sentenceCount,
      wordsPerMinute,
      fillerCount,
      fillerRatio,
    },
    fillers,
    suggestions,
  };
}
