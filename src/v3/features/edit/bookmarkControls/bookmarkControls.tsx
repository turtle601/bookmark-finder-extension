import { color } from '@/v3/shared/styles';

import Flex from '@/v3/shared/ui/layout/flex';
import SelectAllBookmarks from '@/v3/features/edit/bookmarkControls/selectAllBookmarks';
import DeselectAllBookmarks from '@/v3/features/edit/bookmarkControls/deselectAllBookmarks';
import DeleteSelectedBookmarks from '@/v3/features/edit/bookmarkControls/deleteSelectedBookmarks';
import { useSelectedBookmarkCountQuery } from '@/v3/entities/bookmark/tree/request/queries';

function BookmarkControls() {
  const { data: selectedCount } = useSelectedBookmarkCountQuery();

  const isDisabled = selectedCount === 0;

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
      <DeselectAllBookmarks isDisabled={isDisabled} />
      <DeleteSelectedBookmarks isDisabled={isDisabled} />
    </Flex>
  );
}

export default BookmarkControls;
