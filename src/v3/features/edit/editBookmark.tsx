import Spacer from '@/v3/shared/ui/layout/spacer';

import { BookmarkControls } from '@/v3/features/edit/bookmarkControls';
import { BookmarkTree } from '@/v3/features/edit/bookmarkTree';
import { useBookmarkTreeListener } from '@/v3/entities/bookmark/tree/listener/useBookmarkTreeListener';

function EditBookmark() {
  const { bookmarkTreeRef } = useBookmarkTreeListener();

  return (
    <div
      ref={bookmarkTreeRef}
      css={{
        position: 'relative',
      }}
    >
      <div
        css={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <BookmarkControls />
      </div>
      <Spacer direction="vertical" space="4px" />
      <BookmarkTree />
      <Spacer direction="vertical" space="4px" />
    </div>
  );
}

export default EditBookmark;
