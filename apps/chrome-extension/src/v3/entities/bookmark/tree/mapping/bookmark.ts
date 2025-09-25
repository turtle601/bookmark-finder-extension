import React from 'react';

import {
  IFolder,
  ILink,
  isFolder,
  isLink,
} from '@/v3/entities/bookmark/tree/types/bookmark';

export function mappingComponentByBookmarkType(
  bookmark: chrome.bookmarks.BookmarkTreeNode,
  map: {
    folder: React.ComponentType<{ folder: IFolder }>;
    link: React.ComponentType<{ link: ILink }>;
  },
): React.ReactNode {
  switch (true) {
    case isFolder(bookmark):
      return React.createElement(map.folder, { folder: bookmark });
    case isLink(bookmark):
      return React.createElement(map.link, { link: bookmark });
    default:
      return null;
  }
}
