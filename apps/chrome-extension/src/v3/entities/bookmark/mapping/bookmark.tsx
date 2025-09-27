import React from 'react';
import LazyBookmarkUI from '../ui/lazyBookmarkUI';

import {
  IFolder,
  ILink,
  isFolder,
  isLink,
} from '@/v3/entities/bookmark/types/bookmark';

export function mappingComponentByBookmarkType(
  bookmark: chrome.bookmarks.BookmarkTreeNode,
  map: {
    folder: React.ComponentType<{ folder: IFolder }>;
    link: React.ComponentType<{ link: ILink }>;
  },
): React.ReactNode {
  switch (true) {
    case isFolder(bookmark):
      return (
        <LazyBookmarkUI key={bookmark.id}>
          <map.folder folder={bookmark} />
        </LazyBookmarkUI>
      );
    case isLink(bookmark):
      return (
        <LazyBookmarkUI key={bookmark.id}>
          <map.link link={bookmark} />
        </LazyBookmarkUI>
      );
    default:
      return null;
  }
}
