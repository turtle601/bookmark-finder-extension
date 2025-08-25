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

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'moveTab') {
        chrome.tabs.move(
          message.payload.tabId,
          {
            index: message.payload.index,
          },
          () => {
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
          },
        );

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'addChromeTab') {
        chrome.tabs.create(
          { index: message.payload.index, url: message.payload.url },
          (tab) => {
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
          },
        );
      }
    });
  }
}

export default ChromeTabListener;
