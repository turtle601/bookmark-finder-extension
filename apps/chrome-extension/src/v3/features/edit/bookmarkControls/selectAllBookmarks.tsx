import { css, CSSObject } from '@emotion/react';

import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/styles';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

function SelectAllBookmarks() {
  const { selectAllBookmark } = useSelectBookmarkController();

  return (
    <button
      css={css({
        ...getActionButtonStyle(),
        ...getSelectAllButtonStyle(),
      })}
      onClick={selectAllBookmark}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
      Select All
    </button>
  );
}

export default SelectAllBookmarks;

function getSelectAllButtonStyle(): CSSObject {
  return {
    background: '#e8f0fe',
    borderColor: '#4285f4',
    color: '#1967d2',
    '&:hover': {
      background: '#d2e3fc',
    },
  };
}
