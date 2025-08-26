import { useGetBookmarkTreeQuery } from '@/v3/entities/bookmark/tree/request/queries';

import BookmarkLink from './bookmarkLink';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
import { css } from '@emotion/react';
import RootBookmarkFolder from '@/v3/features/edit/bookmarkTree/rootBookmarkFolder';

function BookmarkTree() {
  const { data: bookmarks } = useGetBookmarkTreeQuery();

  const rootBookmarkChildren = bookmarks?.[0]
    ?.children as IBookmarkTreeStorage[]; // 크롬 북마크 root에는 무조건 자식 폴더가 존재함

  if (!rootBookmarkChildren) return null;

  return (
    <div
      css={css({
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      })}
    >
      {rootBookmarkChildren.map((bookmark) => (
        <div key={bookmark.id}>
          {bookmark.children ? (
            <RootBookmarkFolder folder={bookmark} />
          ) : (
            <BookmarkLink link={bookmark} />
          )}
        </div>
      ))}
    </div>
  );
}

export default BookmarkTree;
