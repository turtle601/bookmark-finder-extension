import { Bookmark } from '@/entities/bookmark/bookmark.type';

export const traverseBookmarks = async (
  bookmarks: Bookmark[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => Promise<void>,
) => {
  const queue = [...(bookmarks[0].children as Bookmark[])];

  while (queue.length > 0) {
    const bookmark = queue.shift();
    await callback(bookmark);

    if (bookmark?.children) {
      queue.push(...bookmark?.children);
    }
  }
};
