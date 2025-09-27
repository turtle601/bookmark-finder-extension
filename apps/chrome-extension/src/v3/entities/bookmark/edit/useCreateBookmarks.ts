import { useAddBookmarkMutation } from '@/v3/entities/bookmark/request/queries';
import { isLink } from '@/v3/entities/bookmark/types/bookmark';
import { chunkArray } from '@/v3/shared/utils/optimize/chunk';

export const useCreateFewBookmarks = () => {
  const { mutate: addBookmark } = useAddBookmarkMutation();

  const addFewBookmarks = async (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  ) => {
    [...bookmarks].forEach((bookmark) => {
      addBookmark({
        title: bookmark.title,
        url: isLink(bookmark) && bookmark.url,
        parentId: bookmark.parentId,
        index: bookmark?.index && 0,
      });
    });
  };

  return {
    addFewBookmarks,
  };
};

export const useCreateManyBookmarks = (chunkSize: number = 10) => {
  const { mutateAsync: addBookmark } = useAddBookmarkMutation();

  const addManyBookmarks = async (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  ) => {
    const chunks = chunkArray([...bookmarks], chunkSize);

    const promises = chunks.map((chunk) => {
      return chunk.map(async (bookmark) => {
        return addBookmark({
          title: bookmark.title,
          url: isLink(bookmark) && bookmark.url,
          parentId: bookmark.parentId,
          index: bookmark?.index && 0,
        });
      });
    });

    await Promise.all(promises);
  };

  return {
    addManyBookmarks,
  };
};

export const useCreateSelectedBookmarks = (chunkSize: number = 5) => {
  const { addFewBookmarks } = useCreateFewBookmarks();
  const { addManyBookmarks } = useCreateManyBookmarks();

  const createSelectedBookmarks = async (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  ) => {
    if (bookmarks.length < chunkSize) {
      await addFewBookmarks(bookmarks);
    } else {
      await addManyBookmarks(bookmarks);
    }
  };

  return {
    createSelectedBookmarks,
  };
};
