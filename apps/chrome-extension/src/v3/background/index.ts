import { backgroundMessageEvent } from '@/v3/background/bookmark/event';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});

backgroundMessageEvent.init();
