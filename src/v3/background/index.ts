import { ChromeTabListener } from '@/v3/background/chromeTab';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});

ChromeTabListener.init();
