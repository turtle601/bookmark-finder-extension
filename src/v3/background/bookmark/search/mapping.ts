import type { ISearchBookmarkLink } from '@/v3/background/bookmark/search/type';

export const getSafeHostname = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;

  // 크롬 내부 URL 체크
  if (url.startsWith('chrome://') || url.startsWith('about:')) {
    return null;
  }

  // 정규표현식으로 hostname 추출
  const match = url.match(/^(?:https?:\/\/)?([^\/\?:]+)/);
  return match ? match[1].split(':')[0] : null;
};

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
        faviconUrl: `https://www.google.com/s2/favicons?domain=${getSafeHostname(node.url)}&sz=32`,
      });
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return links;
};
