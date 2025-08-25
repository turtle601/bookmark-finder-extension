import { css } from '@emotion/react';

import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/\bstyles';
import { useSelectAllBookmarksMutation } from '@/v3/entities/bookmark/tree/request/queries';

function SelectAllBookmarks() {
  const { mutate: selectAllBookmarks } = useSelectAllBookmarksMutation();

  return (
    <button
      css={css({
        ...getActionButtonStyle(),
        background: '#e8f0fe',
        borderColor: '#4285f4',
        color: '#1967d2',
        '&:hover': {
          background: '#d2e3fc',
        },
      })}
      onClick={() => {
        selectAllBookmarks();
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
      전체선택
    </button>
  );
}

export default SelectAllBookmarks;
