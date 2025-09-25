export const ChromeTabMessageEvent = {
  getTabs: (
    message: { action: 'getTabs' },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: T;
            tabs: chrome.tabs.Tab[];
          }
        : {
            isSuccess: T;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({
          isSuccess: true,
          tabs,
        });
      }
    });

    return true;
  },
  openTab: (
    message: { action: 'openTab'; payload: { tabId: number } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? { isSuccess: T }
        : { isSuccess: T; error: chrome.runtime.LastError },
    ) => void,
  ) => {
    chrome.tabs.update(message.payload.tabId, { active: true }, (tab) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({
          isSuccess: true,
        });
      }
    });

    return true;
  },
  closeTab: (
    message: { action: 'closeTab'; payload: { tabId: number } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? { isSuccess: T }
        : { isSuccess: T; error: chrome.runtime.LastError },
    ) => void,
  ) => {
    chrome.tabs.remove(message.payload.tabId, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({
          isSuccess: true,
        });
      }
    });

    return true;
  },
  moveTab: (
    message: { action: 'moveTab'; payload: { tabId: number; index: number } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? { isSuccess: T }
        : { isSuccess: T; error: chrome.runtime.LastError },
    ) => void,
  ) => {
    chrome.tabs.move(
      message.payload.tabId,
      {
        index: message.payload.index,
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError,
          });
        } else {
          sendResponse({
            isSuccess: true,
          });
        }
      },
    );

    return true;
  },
  addChromeTab: (
    message: {
      action: 'addChromeTab';
      payload: { url: string; index: number };
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? { isSuccess: T }
        : { isSuccess: T; error: chrome.runtime.LastError },
    ) => void,
  ) => {
    chrome.tabs.create(
      { index: message.payload.index, url: message.payload.url },
      (tab) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError,
          });
        } else {
          sendResponse({
            isSuccess: true,
          });
        }
      },
    );
    return true;
  },
} as const;
