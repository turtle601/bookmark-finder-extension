import { create, StoreApi, UseBoundStore } from 'zustand';

import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';

interface ISelectBookmarkStore {
  selectedBookmarkIds: Set<string>;
  setSelectedBookmarkIds: (selectedBookmarkIds: Set<string>) => void;
}

export const useSelectBookmarkStore: UseBoundStore<
  StoreApi<ISelectBookmarkStore>
> = create<ISelectBookmarkStore>((set) => ({
  selectedBookmarkIds: new Set(),
  setSelectedBookmarkIds: (selectedBookmarkIds) => set({ selectedBookmarkIds }),
}));

export const useSelectBookmarkController = () => {
  const { selectedBookmarkIds, setSelectedBookmarkIds } =
    useSelectBookmarkStore();

  const selectBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode) => {
    if (bookmark.children) {
      const subTreeBookmarkIds = [
        ...new Set([
          bookmark.id,
          ...bookmarkTreeOptimizer
            .getLinearizedSubTree(bookmark.id)
            .map((child) => child.id),
        ]),
      ];

      setSelectedBookmarkIds(
        new Set([...selectedBookmarkIds, ...subTreeBookmarkIds]),
      );
    } else {
      setSelectedBookmarkIds(new Set([...selectedBookmarkIds, bookmark.id]));
    }
  };

  const resetSelectedBookmark = () => {
    setSelectedBookmarkIds(new Set());
  };

  const deselectBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode) => {
    const newSelectedBookmarkIds = new Set([...selectedBookmarkIds]);

    if (bookmark.children) {
      const deselectedBookmarkIds = [
        ...new Set([
          bookmark.id,
          ...bookmarkTreeOptimizer
            .getLinearizedSubTree(bookmark.id)
            .map((child) => child.id),
        ]),
      ];

      deselectedBookmarkIds.forEach((bookmarkId) => {
        newSelectedBookmarkIds.delete(bookmarkId);
      });

      setSelectedBookmarkIds(new Set([...newSelectedBookmarkIds]));
    } else {
      const newSelectedBookmarkIds = new Set([...selectedBookmarkIds]);

      const deselectedBookmarkIds = [
        bookmark.id,
        ...bookmarkTreeOptimizer.getAncestors(bookmark.id),
      ];

      deselectedBookmarkIds.forEach((bookmarkId) => {
        newSelectedBookmarkIds.delete(bookmarkId);
      });

      setSelectedBookmarkIds(new Set([...newSelectedBookmarkIds]));
    }
  };

  const selectAllBookmark = () => {
    setSelectedBookmarkIds(
      new Set([
        ...bookmarkTreeOptimizer.getLinearizedTree().map((child) => child.id),
      ]),
    );
  };

  const toggleBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode) => {
    if (selectedBookmarkIds.has(bookmark.id)) {
      deselectBookmark(bookmark);
    } else {
      selectBookmark(bookmark);
    }
  };

  const checkIsSelected = (bookmark: chrome.bookmarks.BookmarkTreeNode) => {
    return selectedBookmarkIds.has(bookmark.id);
  };

  return {
    selectedBookmarkIds,
    selectBookmark,
    resetSelectedBookmark,
    deselectBookmark,
    selectAllBookmark,
    deselectAllBookmark: resetSelectedBookmark,
    toggleBookmark,
    checkIsSelected,
  };
};
