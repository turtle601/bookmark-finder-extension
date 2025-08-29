import { css } from '@emotion/react';

import BookmarkLink from '@/v3/features/search/findBookmark/ui/bookmarkSearchLink';
import Center from '@/v3/shared/ui/layout/center';

import { useSearchBookmarksQuery } from '@/v3/entities/bookmark/search/request';

interface IBookmarkResultProps {
  searchText: string;
}

function BookmarkSearchResult({ searchText }: IBookmarkResultProps) {
  const { data: bookmarks = [] } = useSearchBookmarksQuery({
    text: searchText,
    isEnabled: searchText !== '',
  });

  if (bookmarks?.length === 0)
    return (
      <Center
        etcStyles={{
          width: '100%',
          height: '100%',
        }}
      >
        <span>No results found.</span>
      </Center>
    );

  return (
    <div
      css={css({
        width: '100%',
        height: '100%',
      })}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkLink key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

export default BookmarkSearchResult;
