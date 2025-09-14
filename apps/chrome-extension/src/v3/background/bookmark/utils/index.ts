import { getFaviconUrl } from '@/v3/shared/utils/url';

export interface ISearchBookmarkLink {
  id: string;
  title: string;
  url: string;
  faviconUrl: string;
}

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
        faviconUrl: getFaviconUrl(node.url),
      });
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return links;
};
