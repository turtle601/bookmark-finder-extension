import { ChromeTabListener } from '@/v3/background/chromeTab';
import { BookmarkListener } from '@/v3/background/bookmark';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});

ChromeTabListener.init();
BookmarkListener.init();
