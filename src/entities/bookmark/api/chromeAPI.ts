export const requestChromeBookmark = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getBookmarks') {
      chrome.bookmarks.getTree((tree) => {
        sendResponse(tree);
      });

      return true;
    }
  });
};

export const requestUpdateChromeBookmark = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'deleteBookmark') {
      const bookmarkId = message.bookmarkId;

      chrome.bookmarks.remove(bookmarkId, function () {
        if (chrome.runtime.lastError) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          sendResponse({ success: true });
        }
      });

      return true;
    }
  });
};

export const requestDeleteChromeBookmark = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateBookmark') {
      const { id, title } = message;

      chrome.bookmarks.update(id, { title }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          sendResponse({ success: true });
        }
      });

      return true;
    }
  });
};
