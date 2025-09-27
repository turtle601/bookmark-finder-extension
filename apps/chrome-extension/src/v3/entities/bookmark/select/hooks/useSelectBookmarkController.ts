import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';
import { useSelectBookmarkStore } from '@/v3/entities/bookmark/model/store/useSelectBookmarkStore';

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
          ...bookmarkTreeOptimizer.getAncestors(bookmark.id),
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

  const getSelectedBookmarks = () => {
    return bookmarkTreeOptimizer
      .getLinearizedTree()
      .filter((child) => selectedBookmarkIds.has(child?.id));
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
    getSelectedBookmarks,
  };
};
