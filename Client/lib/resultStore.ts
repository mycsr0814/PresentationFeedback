let lastResult: Record<string, unknown> | null = null;

export function setResultData(data: Record<string, unknown>): void {
  lastResult = data;
}

export function getResultData(): Record<string, unknown> | null {
  const r = lastResult;
  lastResult = null;
  return r;
}
