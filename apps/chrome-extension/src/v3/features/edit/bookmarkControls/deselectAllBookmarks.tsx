import { css, CSSObject } from '@emotion/react';

import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/styles';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

function DeselectAllBookmarks() {
  const { selectedBookmarkIds, resetSelectedBookmark } =
    useSelectBookmarkController();

  const isDisabled = selectedBookmarkIds.size === 0;

  return (
    <button
      disabled={isDisabled}
      css={css({
        ...getActionButtonStyle(),
        ...getDeselectAllButtonStyle(),
      })}
      onClick={resetSelectedBookmark}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
      Deselect
    </button>
  );
}

export default DeselectAllBookmarks;

function getDeselectAllButtonStyle(): CSSObject {
  return {
    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  };
}
