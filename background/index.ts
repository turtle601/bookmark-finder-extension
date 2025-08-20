import { bookmarkUtils } from '@/utils/bookmark';
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

      sendResponse({
        isSuccess: true,
        data: result,
      });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getBookmarks') {
    chrome.bookmarks.getTree((tree) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        bookmarkUtils.initialize(tree);

        sendResponse({
          isSuccess: true,
          data: bookmarkUtils.getBookmarks(),
        });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleBookmarks') {
    const { nodeId } = message.payload;

    bookmarkUtils.toggleSelection(nodeId);

    sendResponse({
      isSuccess: true,
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'moveBookmark') {
    const destination = {
      parentId: message.payload.parentId,
      index: message.payload.index,
    };

    chrome.bookmarks.move(
      message.payload.id,
      { ...destination },
      (bookmarkList) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          sendResponse({ isSuccess: true });
        }
      },
    );

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'selectBookmarks') {
    const { id } = message.payload;

    bookmarkUtils.selectNode(id);

    sendResponse({ isSuccess: true });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'deselectBookmarks') {
    const { id } = message.payload;

    bookmarkUtils.deselectNode(id);

    sendResponse({ isSuccess: true });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'selectAllBookmarks') {
    bookmarkUtils.selectAll();

    sendResponse({ isSuccess: true });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'deselectAllBookmarks') {
    bookmarkUtils.deselectAll();

    sendResponse({ isSuccess: true });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'hasSelectedBookmarks') {
    const hasSelected = bookmarkUtils.hasSelectedNodes();

    sendResponse({ isSuccess: true, data: { hasSelected } });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getTopLevelSelectedNodes') {
    const selectedNodes = bookmarkUtils.getTopLevelSelectedNodes();
    sendResponse({ isSuccess: true, data: selectedNodes });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'resetBookmarks') {
    chrome.bookmarks.getTree((tree) => {
      bookmarkUtils.reset(tree);
      sendResponse({ isSuccess: true });
    });
    return true;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo, 'changeInfo');

  if (changeInfo.status === 'complete') {
    chrome.bookmarks.getTree((tree) => {
      bookmarkUtils.reset(tree);
    });

    return true;
  }
});

ContentScriptToggleSingleton.addListener();
