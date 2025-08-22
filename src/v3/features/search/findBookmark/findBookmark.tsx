import { useRef, useState } from 'react';

import Spacer from '@/v3/shared/ui/layout/spacer';

import { useSearchBookmarksQuery } from '@/v3/entities/bookmark/search/request';

import BookmarkSearchField from '@/v3/features/search/findBookmark/ui/bookmarkSearchField';
import SearchResult from '@/v3/features/search/findBookmark/ui/searchResult';

function FindBookmark() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState('');

  const { data: bookmarks } = useSearchBookmarksQuery({
    text: searchText,
    isEnabled: searchText !== '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <BookmarkSearchField inputRef={inputRef} onChange={handleChange} />
      <Spacer direction="vertical" space={12} />
      <SearchResult bookmarks={bookmarks} />
    </div>
  );
}

export default FindBookmark;
