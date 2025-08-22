import { extractSearchBookmarkLinks } from '@/v3/background/bookmark/search/mapping';

class BookmarkListener {
  public static init() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'searchBookmarks') {
        const text = message.payload.text;

        chrome.bookmarks.search(text, (nodes) => {
          if (chrome.runtime.lastError) {
            sendResponse({
              isSuccess: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            sendResponse({
              isSuccess: true,
              data: extractSearchBookmarkLinks(nodes),
            });
          }
        });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getBookmarkTree') {
        chrome.bookmarks.getTree(async (nodes) => {
          if (chrome.runtime.lastError) {
            sendResponse({
              isSuccess: false,
              error: chrome.runtime.lastError.message,
            });
          } else {
            sendResponse({
              isSuccess: true,
              data: nodes,
            });
          }
        });
      }

      return true;
    });
  }
}

export default BookmarkListener;
