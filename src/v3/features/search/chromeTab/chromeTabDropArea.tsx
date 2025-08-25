import DnD from '@/v3/shared/ui/dnd';
import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/ui/bookmarkDropArea';

import {
  useAddChromeTabMutation,
  useMoveTabMutation,
} from '@/v3/entities/chromeTab/request';

interface IChromeTabDropAreaProps {
  tabIdx?: number;
  startIdx: number;
}

function ChromeTabDropArea({ tabIdx, startIdx }: IChromeTabDropAreaProps) {
  const { mutate: moveTab } = useMoveTabMutation();

  const { addChromeTabs } = useAddChromeTabMutation();

  const dropDraggedTab = (e: React.DragEvent<Element>) => {
    const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

    if (draggedTab && draggedTab.id) {
      if (draggedTab.index + 1 === tabIdx || draggedTab.index === tabIdx) {
        return;
      }

      moveTab({ tabId: draggedTab.id, index: startIdx });
    }

    return;
  };

  return (
    <DnD.Droppable
      dropAction={(e) => {
        const draggedType = e.dataTransfer.getData('dragType');

        switch (draggedType) {
          case 'tab':
            dropDraggedTab(e);
            return;
          case 'bookmark':
            addChromeTabs(startIdx);
            return;
          default:
            return;
        }
      }}
    >
      {({ isDragEnter }) => {
        return <BookmarkDropArea isDragEnter={isDragEnter} />;
      }}
    </DnD.Droppable>
  );
}

export default ChromeTabDropArea;
