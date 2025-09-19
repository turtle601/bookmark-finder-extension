import { css } from '@emotion/react';

import {
  useRootBookmarksQuery,
  useSelectAllBookmarksMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import {
  useAccordionActionContext,
  useAccordionContext,
} from 'bookmark-finder-extension-ui';

import { getActionButtonStyle } from '@/v3/features/edit/bookmarkControls/styles';

function SelectAllBookmarks() {
  const { mutate: selectAllBookmarks } = useSelectAllBookmarksMutation();

  const { data: rootBookmarks } = useRootBookmarksQuery();

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const handleSelectAllBookmarks = () => {
    rootBookmarks?.forEach((bookmark) => {
      if (!selectedIdSet.has(Number(bookmark.id))) {
        openAccordion(Number(bookmark.id));
      }
    });

    selectAllBookmarks();
  };

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
      onClick={handleSelectAllBookmarks}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
      Select All
    </button>
  );
}

export default SelectAllBookmarks;
