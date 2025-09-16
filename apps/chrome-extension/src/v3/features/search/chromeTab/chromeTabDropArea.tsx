import { DnD } from 'bookmark-finder-extension/ui';

import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/ui/bookmarkDropArea';

import {
  useAddChromeTabMutation,
  useMoveTabMutation,
} from '@/v3/entities/chromeTab/request';

interface IChromeTabDropAreaProps {
  startIdx: number;
}

function ChromeTabDropArea({ startIdx }: IChromeTabDropAreaProps) {
  const { mutate: moveTab } = useMoveTabMutation();

  const { addChromeTabs } = useAddChromeTabMutation();

  const dropDraggedTab = (e: React.DragEvent<Element>) => {
    const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

    if (!draggedTab?.id) {
      return;
    }

    const isSamePosition =
      draggedTab.index + 1 === startIdx || draggedTab.index === startIdx;

    if (isSamePosition) {
      return;
    }

    moveTab({ tabId: draggedTab.id, index: startIdx });
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
            console.log('bookmark');
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
