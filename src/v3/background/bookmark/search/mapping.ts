import type { ISearchBookmarkLink } from '@/v3/background/bookmark/search/type';

export const extractSearchBookmarkLinks = (
  nodes: chrome.bookmarks.BookmarkTreeNode[],
): ISearchBookmarkLink[] => {
  const stack = [...nodes];
  const links: ISearchBookmarkLink[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (node.url) {
      links.push({
        id: node.id,
        title: node.title,
        url: node.url,
        faviconUrl: `${new URL(node.url).hostname}/favicon.ico`,
      });
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return links;
};
