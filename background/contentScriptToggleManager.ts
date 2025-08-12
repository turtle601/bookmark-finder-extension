/* eslint-disable @typescript-eslint/no-explicit-any */
class ContentScriptToggleManager {
  public handler(
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: { success: boolean; isVisible: boolean }) => void,
  ) {
    switch (message.action) {
      case 'toggleShowContentScript':
        chrome.storage.local.get(['isVisible'], (result) => {
          const currentState = result.isVisible || false;
          const newState = !currentState;

          // 🔥 Storage에 새 상태 저장
          chrome.storage.local.set({ isVisible: newState });

          sendResponse({
            success: true,
            isVisible: newState,
          });
        });
        return true;

      case 'showContentScript':
        chrome.storage.local.get(['isVisible'], (result) => {
          sendResponse({
            success: true,
            isVisible: result.isVisible || false,
          });
        });

        return true;
    }
  }

  public addListener() {
    chrome.runtime.onMessage.addListener(this.handler);
  }

  public removeListener() {
    chrome.runtime.onMessage.removeListener(this.handler);
  }

  public async sendMessage(message: {
    action: 'toggleShowContentScript' | 'showContentScript';
  }): Promise<{ success: boolean; isVisible: boolean }> {
    return await chrome.runtime.sendMessage(message);
  }

  public invalidateQueries() {
    chrome.runtime.sendMessage({
      action: 'invalidateToggleQueries',
    });
  }
}

const ContentScriptToggleSingleton: ContentScriptToggleManager =
  new ContentScriptToggleManager();

export default ContentScriptToggleSingleton;
