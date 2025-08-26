import { css } from '@emotion/react';

import BookmarkLink from '@/v3/features/search/findBookmark/ui/bookmarkSearchLink';
import Center from '@/v3/shared/ui/layout/center';

import { useSearchBookmarksQuery } from '@/v3/entities/bookmark/search/request';

interface IBookmarkResultProps {
  searchText: string;
}

function SearchResult({ searchText }: IBookmarkResultProps) {
  const { data: bookmarks = [] } = useSearchBookmarksQuery({
    text: searchText,
    isEnabled: searchText !== '',
  });

  if (bookmarks?.length === 0)
    return (
      <Center
        etcStyles={{
          width: '100%',
          overflowY: 'auto',
          height: 'calc(100% - 44px)',
        }}
      >
        <span>검색 결과가 없습니다.</span>
      </Center>
    );

  return (
    <div
      css={css({
        width: '100%',
        height: 'calc(100% - 44px)',
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
