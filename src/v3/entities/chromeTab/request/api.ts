import { createChromeRequest } from '@/v3/shared/utils/request';

import type { IGenericResponse } from '@/v3/shared/utils/request/type';

export interface ITabsResponse extends IGenericResponse {
  tabs: chrome.tabs.Tab[];
}

export const requestTabs = async () => {
  return await createChromeRequest<ITabsResponse>({
    action: 'getTabs',
  });
};

export const requestOpenTab = async (tabId: number) => {
  return await createChromeRequest<IGenericResponse>({
    action: 'openTab',
    payload: {
      tabId,
    },
  });
};

export const requestCloseTab = async (tabId: number) => {
  return await createChromeRequest<IGenericResponse>({
    action: 'closeTab',
    payload: {
      tabId,
    },
  });
};

export const requestMoveTab = async (tabId: number, index: number) => {
  return await createChromeRequest<IGenericResponse>({
    action: 'moveTab',
    payload: {
      tabId,
      index,
    },
  });
};
