export interface IGenericError<T extends string> {
  errorType: T;
  explanation: string;
}

export interface IGenericResponse {
  isSuccess: boolean;
}

export const CHROME = 'CHROME' as const;
export interface IChromeError extends IGenericError<typeof CHROME> {
  isSuccess: boolean;
  error: chrome.runtime.LastError | unknown;
}
