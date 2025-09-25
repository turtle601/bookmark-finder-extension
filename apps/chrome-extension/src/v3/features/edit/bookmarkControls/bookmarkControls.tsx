import { color } from '@/v3/shared/styles';

import { Flex } from 'bookmark-finder-extension-ui';

import SelectAllBookmarks from '@/v3/features/edit/bookmarkControls/selectAllBookmarks';
import DeselectAllBookmarks from '@/v3/features/edit/bookmarkControls/deselectAllBookmarks';
import DeleteSelectedBookmarks from '@/v3/features/edit/bookmarkControls/deleteSelectedBookmarks';

import type { CSSObject } from '@emotion/react';

function BookmarkControls() {
  return (
    <Flex
      etcStyles={getBookmarkControlsWrapperStyle()}
      justify="space-between"
      align="center"
      gap="8px"
    >
      <SelectAllBookmarks />
      <DeselectAllBookmarks />
      <DeleteSelectedBookmarks />
    </Flex>
  );
}

export default BookmarkControls;

function getBookmarkControlsWrapperStyle(): CSSObject {
  return {
    width: '100%',
    height: '50px',
    backgroundColor: color.slate['50'],
  };
}
