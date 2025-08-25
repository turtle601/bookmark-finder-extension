import { bookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
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
            bookmarkTreeStorage.initialize(nodes);

            sendResponse({
              isSuccess: true,
              data: bookmarkTreeStorage.getBookmarks(),
            });
          }
        });
      }

      return true;
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'toggleSelectedBookmark') {
        const { nodeId } = message.payload;

        bookmarkTreeStorage.toggleSelection(nodeId);

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
      if (message.action === 'selectBookmark') {
        const { id } = message.payload;

        bookmarkTreeStorage.selectNode(id);

        sendResponse({ isSuccess: true });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'deselectBookmark') {
        const { id } = message.payload;

        bookmarkTreeStorage.deselectNode(id);

        sendResponse({ isSuccess: true });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'selectAllBookmarks') {
        bookmarkTreeStorage.selectAll();

        sendResponse({ isSuccess: true });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'deselectAllBookmarks') {
        bookmarkTreeStorage.deselectAll();

        sendResponse({ isSuccess: true });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getSelectedCount') {
        const count = bookmarkTreeStorage.getSelectedCount();

        sendResponse({ isSuccess: true, count });

        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getTopLevelSelectedNodes') {
        const selectedNodes = bookmarkTreeStorage.getTopLevelSelectedNodes();
        sendResponse({ isSuccess: true, data: selectedNodes });
        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'resetBookmarks') {
        chrome.bookmarks.getTree((tree) => {
          bookmarkTreeStorage.reset(tree);
          sendResponse({ isSuccess: true });
        });
        return true;
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'deleteBookmark') {
        const { id } = message.payload;

        chrome.bookmarks.remove(id, () => {
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
      if (message.action === 'addBookmark') {
        chrome.bookmarks.create({ ...message.payload }, () => {
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
  }
}

export default BookmarkListener;
