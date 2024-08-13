import React from 'react';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { BookmarkLink } from './bookmarkLink.ui';
import { BookmarkFolder } from './bookmarkFolder.ui';

import { bookmarkService } from '@/entities/bookmark';

import type { Bookmark } from '@/entities/bookmark';

export const BookmarkAccordian: React.FC = () => {
  const { data: bookmarks } = useSuspenseQuery({
    ...bookmarkService.queryOptions(),
  });

  const rootBookmarkChildren = bookmarks[0].children as Bookmark[];

  return (
    <div
      css={css({
        width: '100%',
        height: 'calc(100vh - 280px)', // (전체 높이 - ( header 높이 + Footer 높이 + AI Button 높이 + Spacer 높이))
        overflow: 'auto',
      })}
    >
      {rootBookmarkChildren.map((bookmark) => {
        return (
          <>
            {bookmark.children ? (
              <BookmarkFolder
                folderData={bookmark}
                bookmarks={bookmark.children}
              />
            ) : (
              <BookmarkLink bookmark={bookmark} />
            )}
          </>
        );
      })}
    </div>
  );
};
