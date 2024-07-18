import { chromeError } from '@/shared/lib/fetch/fetch.error';

interface IConfig {
  action: string;
  payload?: Record<string, unknown>;
}

export const createChromeRequest = <T>(config: IConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ ...config }, (response) => {
      if (response.isSuccess) {
        resolve(response);
      } else {
        reject(chromeError(response));
      }
    });
  });
};
