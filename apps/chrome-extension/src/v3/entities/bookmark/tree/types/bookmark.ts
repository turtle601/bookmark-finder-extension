export interface IRootBookmark
  extends Omit<
    chrome.bookmarks.BookmarkTreeNode,
    'children' | 'url' | 'parentId'
  > {
  children: chrome.bookmarks.BookmarkTreeNode[];
}

export interface IFolder
  extends Omit<chrome.bookmarks.BookmarkTreeNode, 'children' | 'url'> {
  children: chrome.bookmarks.BookmarkTreeNode[];
}

export interface ILink
  extends Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> {
  url: string;
}

// 타입 가드 함수들
export const isFolder = (
  node: chrome.bookmarks.BookmarkTreeNode,
): node is IFolder => {
  return node.children !== undefined;
};

export const isLink = (
  node: chrome.bookmarks.BookmarkTreeNode,
): node is ILink => {
  return node.url !== undefined;
};

export const isRootBookmark = (
  node: chrome.bookmarks.BookmarkTreeNode,
): node is IRootBookmark => {
  return node.parentId === undefined;
};
