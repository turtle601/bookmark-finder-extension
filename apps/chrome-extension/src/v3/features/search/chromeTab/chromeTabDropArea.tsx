import { DnD } from 'bookmark-finder-extension-ui';

import { useDropTabToActiveTabs } from '@/v3/entities/activeTabs/drop/useDropTabToActiveTabs';
import { useDropBookmarkToActiveTabs } from '@/v3/entities/activeTabs/drop/useDropBookmarkToActiveTabs';

import BookmarkDropAreaUI from '@/v3/entities/bookmark/ui/bookmarkDropAreaUI';

interface IChromeTabDropAreaProps {
  startIdx: number;
}

function ChromeTabDropArea({ startIdx }: IChromeTabDropAreaProps) {
  const { dropTab } = useDropTabToActiveTabs();
  const { dropBookmark } = useDropBookmarkToActiveTabs();

  const dropAction = (e: React.DragEvent<Element>) => {
    const draggedType = e.dataTransfer.getData('dragType');

    switch (draggedType) {
      case 'tab':
        dropTab(JSON.parse(e.dataTransfer.getData('tab')), startIdx);
        return;
      case 'bookmark':
        dropBookmark(startIdx);
        return;
      default:
        return;
    }
  };

  return (
    <DnD.Droppable dropAction={dropAction}>
      {({ isDragEnter }) => {
        return <BookmarkDropAreaUI isDragEnter={isDragEnter} />;
      }}
    </DnD.Droppable>
  );
}

export default ChromeTabDropArea;
