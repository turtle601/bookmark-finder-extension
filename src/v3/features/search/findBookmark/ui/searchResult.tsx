import { css } from '@emotion/react';

import BookmarkLink from '@/v3/features/search/findBookmark/ui/bookmarkSearchLink';
import Center from '@/v3/shared/ui/layout/center';

import type { ISearchBookmarkLink } from '@/v3/background/bookmark/search';

interface IBookmarkResultProps {
  bookmarks?: ISearchBookmarkLink[];
}

function SearchResult({ bookmarks = [] }: IBookmarkResultProps) {
  if (bookmarks.length === 0)
    return (
      <Center
        etcStyles={{
          width: '100%',
          height: '280px',
          overflowY: 'auto',
        }}
      >
        <span>검색 결과가 없습니다.</span>
      </Center>
    );

  return (
    <div
      css={css({
        width: '100%',
        height: '280px',
        overflowY: 'auto',
      })}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkLink key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

export default SearchResult;
