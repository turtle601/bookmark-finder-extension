import { useRef, useState } from 'react';

import Spacer from '@/v3/shared/ui/layout/spacer';

import BookmarkSearchField from '@/v3/features/search/findBookmark/ui/bookmarkSearchField';
import SearchResult from '@/v3/features/search/findBookmark/ui/searchResult';
import { css } from '@emotion/react';

function FindBookmark() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div
      css={css({
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 60px)',
      })}
    >
      <div
        css={css({
          position: 'sticky',
          top: 0,
          zIndex: 1,
        })}
      >
        <BookmarkSearchField inputRef={inputRef} onChange={handleChange} />
      </div>
      <Spacer direction="vertical" space={12} />
      <SearchResult searchText={searchText} />
    </div>
  );
}

export default FindBookmark;
