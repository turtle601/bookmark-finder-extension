import type { IChromeError } from '@/v3/shared/request/type';

function chromeError(response: {
  isSuccess: boolean;
  error: chrome.runtime.LastError | unknown;
}): IChromeError {
  return {
    ...response,
    errorType: 'CHROME',
    explanation: 'Request was failed due to chrome API problems',
  };
}

interface IConfig {
  action: string;
  payload?: Record<string, unknown>;
}

export const createChromeRequest = <T>(config: IConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ ...config }, (response) => {
      console.log('🟢 response', response);
      if (response.isSuccess) {
        resolve(response);
      } else {
        reject(chromeError(response));
      }
    });
  });
};
