import { color } from '@/v3/shared/styles';

import Flex from '@/v3/shared/ui/layout/flex';
import SelectAllBookmarks from '@/v3/features/edit/bookmarkControls/selectAllBookmarks';
import DeselectAllBookmarks from '@/v3/features/edit/bookmarkControls/deselectAllBookmarks';
import DeleteSelectedBookmarks from '@/v3/features/edit/bookmarkControls/deleteSelectedBookmarks';

function BookmarkControls() {
  return (
    <Flex
      etcStyles={{
        width: '100%',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: color.slate['50'],
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SelectAllBookmarks />
      <DeselectAllBookmarks />
      <DeleteSelectedBookmarks />
    </Flex>
  );
}

export default BookmarkControls;
