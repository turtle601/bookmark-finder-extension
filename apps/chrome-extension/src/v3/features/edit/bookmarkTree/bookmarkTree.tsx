import { css } from '@emotion/react';

import { useGetBookmarkTreeQuery } from '@/v3/entities/bookmark/tree/request/queries';

import RootBookmarkFolder from '@/v3/features/edit/bookmarkTree/bookmarkFolder/rootBookmarkFolder';
import BookmarkLink from '@/v3/features/edit/bookmarkTree/bookmarkLink/bookmarkLink';

import { mappingComponentByBookmarkType } from '@/v3/entities/bookmark/tree/mapping/bookmark';

function BookmarkTree() {
  const { rootBookmark } = useGetBookmarkTreeQuery();

  if (!rootBookmark) return null;

  return (
    <div
      css={css({
        width: '100%',
        height: '100%',
      })}
    >
      {rootBookmark.children.map((bookmark) => (
        <div key={bookmark.id}>
          {mappingComponentByBookmarkType(bookmark, {
            folder: RootBookmarkFolder,
            link: BookmarkLink,
          })}
        </div>
      ))}
    </div>
  );
}

export default BookmarkTree;
