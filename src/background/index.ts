chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getBookmarks') {
    chrome.bookmarks.getTree((tree) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({
          isSuccess: true,
          data: tree,
        });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'createBookmark') {
    const { url, title, parentId } = message.payload;

    chrome.bookmarks.create({ parentId, title, url }, (bookmark) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({
          isSuccess: true,
          bookmark,
        });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateBookmark') {
    const { id, title, url } = message.payload;

    chrome.bookmarks.update(id, { title, url }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({ isSuccess: true });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'deleteBookmark') {
    const bookmarkId = message.bookmarkId;

    chrome.bookmarks.remove(bookmarkId, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({ isSuccess: true });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'searchBookmarks') {
    const text = message.payload.text;

    chrome.bookmarks.search(text, (bookmarkList) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({ isSuccess: true, data: bookmarkList });
      }
    });

    return true;
  }
});
