import type { IChromeError, IGeminiError } from '@/shared/lib/fetch/fetch.type';

export function chromeError(response: {
  isSuccess: boolean;
  error: chrome.runtime.LastError;
}): IChromeError {
  return {
    ...response,
    errorType: 'CHROME',
    explanation: 'Request was failed due to chrome API problems',
  };
}

export function geminiError(response: { error: unknown }): IGeminiError {
  return {
    ...response,
    errorType: 'GEMINI',
    explanation: 'Request was failed due to gemini API problems',
  };
}
