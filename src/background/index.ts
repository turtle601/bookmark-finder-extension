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
    chrome.bookmarks.create(message.payload, (bookmark) => {
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

    console.log(message.payload);

    chrome.bookmarks.update(id, { title, url }, (bookmark) => {
      if (chrome.runtime.lastError) {
        console.log('실패');

        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        console.log('성공');
        sendResponse({ isSuccess: true });
      }
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'deleteBookmarkLink') {
    const bookmarkId = message.payload.bookmarkId;

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
  if (message.action === 'deleteBookmarkFolder') {
    const folderId = message.payload.folderId;

    chrome.bookmarks.removeTree(folderId, () => {
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
