import { color } from '@/v3/shared/styles';

import { Flex } from 'bookmark-finder-extension-ui';
import SelectAllBookmarks from '@/v3/features/edit/bookmarkControls/selectAllBookmarks';
import DeselectAllBookmarks from '@/v3/features/edit/bookmarkControls/deselectAllBookmarks';
import DeleteSelectedBookmarks from '@/v3/features/edit/bookmarkControls/deleteSelectedBookmarks';

function BookmarkControls() {
  return (
    <Flex
      etcStyles={{
        width: '100%',
        height: '50px',
        backgroundColor: color.slate['50'],
      }}
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
