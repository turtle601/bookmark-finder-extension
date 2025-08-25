import { css } from '@emotion/react';

import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/\bstyles';
import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/tree/request/queries';

function DeleteSelectedBookmarks() {
  const { deleteBookmark, isDisabled } = useDeleteBookmarkMutation();

  return (
    <button
      disabled={isDisabled}
      css={css({
        ...getActionButtonStyle(),
        background: '#fce8e6',
        borderColor: '#ea4335',
        color: '#d33b2c',
        '&:hover': {
          background: '#f9d4d2',
        },
        '&:disabled': {
          opacity: 0.5,
          pointerEvents: 'none',
        },
      })}
      onClick={() => {
        deleteBookmark();
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
      삭제
    </button>
  );
}

export default DeleteSelectedBookmarks;
