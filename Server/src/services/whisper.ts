import OpenAI from 'openai';
import fs from 'fs';

function getOpenAIClient(): OpenAI {
  const key = process.env.OPENAI_API_KEY;
  if (!key?.trim()) {
    throw new Error('OPENAI_API_KEY가 설정되지 않았습니다. .env 파일에 OpenAI API 키를 넣어주세요.');
  }
  return new OpenAI({ apiKey: key });
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface Transcript {
  text: string;
  segments?: TranscriptSegment[];
  language?: string;
}

export async function transcribeWithWhisper(filePath: string): Promise<Transcript> {
  const openai = getOpenAIClient();
  const file = fs.createReadStream(filePath);
  const response = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
    language: 'ko',
  });

  const verbose = response as { text: string; segments?: { start: number; end: number; text: string }[] };
  return {
    text: verbose.text || '',
    segments: verbose.segments?.map((s) => ({ start: s.start, end: s.end, text: s.text.trim() })),
    language: 'ko',
  };
}
