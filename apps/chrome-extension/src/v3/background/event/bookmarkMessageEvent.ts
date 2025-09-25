import {
  type ISearchBookmarkLink,
  extractSearchBookmarkLinks,
} from '@/v3/background/utils';

export const BookmarkMessageEvent = {
  getBookmarkTree: (
    message: { action: 'getBookmarkTree' },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
      data?: chrome.bookmarks.BookmarkTreeNode[];
    }) => void,
  ) => {
    chrome.bookmarks.getTree(async (nodes) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({
          isSuccess: true,
          data: nodes,
        });
      }
    });

    return true;
  },
  moveBookmark: (
    message: {
      action: 'moveBookmark';
      payload: { id: string; parentId: string; index: number };
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    chrome.bookmarks.move(
      message.payload.id,
      {
        parentId: message.payload.parentId,
        index: message.payload.index,
      },
      (bookmarkList) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError,
          });
        } else {
          sendResponse({ isSuccess: true });
        }
      },
    );

    return true;
  },

  deleteBookmark: (
    message: { action: 'deleteBookmark'; payload: { id: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.removeTree(message.payload.id, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({ isSuccess: true });
      }
    });

    return true;
  },
  addBookmark: (
    message: { action: 'addBookmark'; payload: { url: string; title: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.create(message.payload, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({ isSuccess: true });
      }
    });

    return true;
  },
  updateBookmarkTitle: (
    message: {
      action: 'updateBookmarkTitle';
      payload: { id: string; title: string };
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.update(
      message.payload.id,
      { title: message.payload.title },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError,
          });
        } else {
          sendResponse({ isSuccess: true });
        }
      },
    );

    return true;
  },
  createBookmarkFolder: (
    message: { action: 'createBookmarkFolder'; payload: { parentId: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
            bookmark: chrome.bookmarks.BookmarkTreeNode;
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.create(
      {
        index: 0,
        parentId: message.payload.parentId,
        title: 'New Folder',
      },
      (newBookmark) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            isSuccess: false,
            error: chrome.runtime.lastError,
          });
        } else {
          sendResponse({ isSuccess: true, bookmark: newBookmark });
        }
      },
    );

    return true;
  },
  queryBookmark: (
    message: {
      action: 'queryBookmark';
      payload: { ids: string[] };
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
            data: chrome.bookmarks.BookmarkTreeNode[];
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.get([...message.payload.ids], (bookmark) => {
      if (chrome.runtime.lastError) {
        sendResponse({ isSuccess: false, error: chrome.runtime.lastError });
      } else {
        sendResponse({ isSuccess: true, data: bookmark });
      }
    });

    return true;
  },
} as const;

export const SearchBookmarkMessageEvent = {
  searchBookmarks: (
    message: { action: 'searchBookmarks'; payload: { text: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
            data: ISearchBookmarkLink[];
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    chrome.bookmarks.search(message.payload.text, (nodes) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        sendResponse({
          isSuccess: true,
          data: extractSearchBookmarkLinks(nodes),
        });
      }
    });

    return true;
  },
} as const;
