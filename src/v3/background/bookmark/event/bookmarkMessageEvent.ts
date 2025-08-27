import {
  bookmarkTreeStorage,
  type IBookmarkTreeStorage,
} from '@/v3/background/bookmark/storage';

import {
  extractSearchBookmarkLinks,
  type ISearchBookmarkLink,
} from '@/v3/background/bookmark/utils';

export const BookmarkMessageEvent = {
  getBookmarkTree: (
    message: { action: 'getBookmarkTree' },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
      data?: IBookmarkTreeStorage[];
    }) => void,
  ) => {
    chrome.bookmarks.getTree(async (nodes) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        bookmarkTreeStorage.initialize(nodes);

        sendResponse({
          isSuccess: true,
          data: bookmarkTreeStorage.getBookmarks(),
        });
      }
    });

    return true;
  },
  toggleSelectedBookmark: (
    message: { action: 'toggleSelectedBookmark'; payload: { nodeId: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      bookmarkTreeStorage.toggleSelection(message.payload.nodeId);

      sendResponse({
        isSuccess: true,
      });
    }

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
  selectBookmark: (
    message: { action: 'selectBookmark'; payload: { id: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      bookmarkTreeStorage.selectNode(message.payload.id);

      sendResponse({ isSuccess: true });
    }

    return true;
  },
  deselectBookmark: (
    message: { action: 'deselectBookmark'; payload: { id: string } },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      bookmarkTreeStorage.deselectNode(message.payload.id);

      sendResponse({ isSuccess: true });
    }

    return true;
  },
  selectAllBookmarks: (
    message: { action: 'selectAllBookmarks' },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      bookmarkTreeStorage.selectAll();
      sendResponse({ isSuccess: true });
    }

    return true;
  },
  deselectAllBookmarks: (
    message: { action: 'deselectAllBookmarks' },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {
      isSuccess: boolean;
      error?: chrome.runtime.LastError;
    }) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      bookmarkTreeStorage.deselectAll();
      sendResponse({ isSuccess: true });
    }

    return true;
  },
  getSelectedCount: (
    message: { action: 'getSelectedCount' },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
            count: number;
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      const count = bookmarkTreeStorage.getSelectedCount();

      sendResponse({
        isSuccess: true,
        count,
      });
    }

    return true;
  },
  getTopLevelSelectedNodes: (
    message: { action: 'getTopLevelSelectedNodes' },
    sender: chrome.runtime.MessageSender,
    sendResponse: <T extends boolean>(
      response: T extends true
        ? {
            isSuccess: true;
            data: string[];
          }
        : {
            isSuccess: false;
            error: chrome.runtime.LastError;
          },
    ) => void,
  ) => {
    if (chrome.runtime.lastError) {
      sendResponse({
        isSuccess: false,
        error: chrome.runtime.lastError,
      });
    } else {
      const nodes = bookmarkTreeStorage.getTopLevelSelectedNodes();

      sendResponse({
        isSuccess: true,
        data: nodes,
      });
    }

    return true;
  },
  resetBookmarkTree: (
    message: { action: 'resetBookmarkTree' },
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
    chrome.bookmarks.getTree((tree) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          isSuccess: false,
          error: chrome.runtime.lastError,
        });
      } else {
        bookmarkTreeStorage.reset(tree);

        sendResponse({ isSuccess: true });
      }
    });

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
