chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});

class ChromeTabListener {
  public static init() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getTabs') {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
          if (chrome.runtime.lastError) {
            sendResponse({
              isSuccess: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            sendResponse({
              isSuccess: true,
              tabs,
            });
          }
        });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'openTab') {
        chrome.tabs.update(message.payload.tabId, { active: true }, (tab) => {
          if (chrome.runtime.lastError) {
            sendResponse({
              isSuccess: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            sendResponse({
              isSuccess: true,
            });
          }
        });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'closeTab') {
        chrome.tabs.remove(message.payload.tabId, () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              isSuccess: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            sendResponse({
              isSuccess: true,
            });
          }
        });

        return true;
      }
    });
  }
}

export default ChromeTabListener;
