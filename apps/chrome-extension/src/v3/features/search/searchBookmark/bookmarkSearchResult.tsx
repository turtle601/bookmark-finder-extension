import { css } from '@emotion/react';

import { Center } from 'bookmark-finder-extension-ui';

import { useSearchBookmarksQuery } from '@/v3/entities/search/request';
import BookmarkSearchLinkUI from '@/v3/entities/search/ui/bookmarkSearchLink';
import { ISearchBookmarkLink } from '@/v3/background/utils';

interface IBookmarkResultProps {
  searchText: string;
}

function BookmarkSearchResult({ searchText }: IBookmarkResultProps) {
  const { data: bookmarks = [] } = useSearchBookmarksQuery({
    text: searchText,
    isEnabled: searchText !== '',
  });

  if (bookmarks?.length === 0) return <NoResultsFoundUI />;

  return (
    <div
      css={css({
        width: '100%',
        height: '100%',
      })}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkSearchLink key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

export default BookmarkSearchResult;

function NoResultsFoundUI() {
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
}

function BookmarkSearchLink({ bookmark }: { bookmark: ISearchBookmarkLink }) {
  const openChromeLink = () => {
    chrome.tabs.create({ url: bookmark.url });
  };

  return <BookmarkSearchLinkUI bookmark={bookmark} onClick={openChromeLink} />;
}
