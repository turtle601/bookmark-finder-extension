export interface IGenericError<T extends string> {
  errorType: T;
  explanation: string;
}

export const CHROME = 'CHROME' as const;
export interface IChromeError extends IGenericError<typeof CHROME> {
  isSuccess: boolean;
  error: chrome.runtime.LastError;
}

export const GEMINI = 'GEMINI' as const;
export interface IGeminiError extends IGenericError<typeof GEMINI> {
  error: unknown;
}
