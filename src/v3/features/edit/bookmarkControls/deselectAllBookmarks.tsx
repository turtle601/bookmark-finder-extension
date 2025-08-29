import { css } from '@emotion/react';

import {
  useDeselectAllBookmarksMutation,
  useSelectedBookmarkQuery,
} from '@/v3/entities/bookmark/tree/request/queries';
import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/styles';

function DeselectAllBookmarks() {
  const { data: selectedBookmarks } = useSelectedBookmarkQuery();

  const { mutate: deselectAllBookmarks } = useDeselectAllBookmarksMutation();

  return (
    <button
      disabled={selectedBookmarks?.length === 0}
      css={css({
        ...getActionButtonStyle(),
        '&:disabled': {
          opacity: 0.5,
          pointerEvents: 'none',
        },
      })}
      onClick={() => {
        deselectAllBookmarks();
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
      Deselect
    </button>
  );
}

export default DeselectAllBookmarks;
