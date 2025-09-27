import { useCreateSelectedBookmarks } from '@/v3/entities/bookmark/edit/useCreateBookmarks';
import { useDeleteSelectedBookmarks } from '@/v3/entities/bookmark/edit/useDeleteBookmarks';
import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';

import { useSelectedBookmarksData } from '@/v3/entities/bookmark/select/hooks/useSelectedBookmarksData';
import { chunkArray } from '@/v3/shared/utils/optimize/chunk';

export const useMoveBookmarks = (targetId: string) => {
  const { selectedBookmarkIds, getSelectedBookmarksData } =
    useSelectedBookmarksData();

  const { createSelectedBookmarks } = useCreateSelectedBookmarks();
  const { deleteSelectedBookmarks } = useDeleteSelectedBookmarks();

  const bookmarkToCreate = (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
    startIdx: number,
  ) => {
    // 1. 각 북마크의 조상 개수를 미리 계산
    const bookmarksWithAncestry = bookmarks.map((bookmark) => ({
      bookmark,
      ancestrySize: bookmarkTreeOptimizer.getAncestors(bookmark.id).size,
    }));

    // 2. 조상 개수가 적은 순으로 정렬
    bookmarksWithAncestry.sort((a, b) => a.ancestrySize - b.ancestrySize);

    // 3. 최소 조상 개수 찾기
    const minAncestorsCount = Math.min(
      ...bookmarksWithAncestry.map((item) => item.ancestrySize),
    );

    // 4. 정렬된 북마크들을 처리
    return bookmarksWithAncestry.map((item, indexing) => {
      const { bookmark, ancestrySize } = item;

      if (ancestrySize === minAncestorsCount) {
        return {
          ...bookmark,
          parentId: targetId,
          index: startIdx + indexing,
        };
      } else {
        return bookmark;
      }
    });
  };

  const moveBookmarks = async (startIdx: number) => {
    const bookmarks = await getSelectedBookmarksData();

    // 1. 조상 개수가 적은 순으로 정렬 (미리 계산)
    const sortedBookmarks = [...bookmarks].sort((a, b) => {
      const aAncestrySize = bookmarkTreeOptimizer.getAncestors(a.id).size;
      const bAncestrySize = bookmarkTreeOptimizer.getAncestors(b.id).size;
      return aAncestrySize - bAncestrySize;
    });

    // 2. 처리할 북마크들을 분할해서 처리 (성능 개선)
    const chunks = chunkArray(sortedBookmarks, 50);

    for (const chunk of chunks) {
      const modifiedBookmarks = bookmarkToCreate(chunk, startIdx);
      await createSelectedBookmarks(modifiedBookmarks);
    }

    await deleteSelectedBookmarks(new Set([...selectedBookmarkIds]));
  };

  return {
    moveBookmarks,
  };
};
