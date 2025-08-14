import Bookmark, { IBookmarkLink } from '@background/bookmark';
import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    console.log('tab.id is undefined');
    return;
  }

  if (tab.url && tab.url.startsWith('chrome://')) {
    // 이 조건일 때는 popup html 수정
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js'],
    });
  } catch (error) {
    console.error('❌ Failed to execute script:', error);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTabs') {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      sendResponse({
        success: true,
        tabs,
      });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'switchTab') {
    chrome.tabs.update(message.tabId, { active: true }, (tab) => {
      sendResponse({
        success: true,
        tab,
      });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'closeTab') {
    chrome.tabs.remove(message.tabId, () => {
      sendResponse({
        success: true,
      });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'searchBookmarks') {
    chrome.bookmarks.search(message.text, (bookmarks) => {
      sendResponse({ success: true, bookmarks });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'searchBookmarks') {
    const text = message.payload.text;

    chrome.bookmarks.search(text, (nodes) => {
      const stack = [...nodes];
      const links: IBookmarkLink[] = [];

      while (stack.length > 0) {
        const node = stack.pop()!;

        if (node.url) {
          links.push({
            id: node.id,
            title: node.title,
            url: node.url,
            faviconUrl: `${new URL(node.url).origin}/favicon.ico`,
          });
        }

        if (node.children) {
          stack.push(...node.children);
        }
      }

      sendResponse({
        isSuccess: true,
        data: links,
      });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'searchAIBookmarks') {
    const text = message.payload.text;

    chrome.bookmarks.getTree(async (nodes) => {
      const result = await Bookmark.searchBookmarksWithAI(nodes, text);

      console.log(result, "Rest");

      sendResponse({
        isSuccess: true,
        data: result,
      });
    });

    return true;
  }
});

ContentScriptToggleSingleton.addListener();
