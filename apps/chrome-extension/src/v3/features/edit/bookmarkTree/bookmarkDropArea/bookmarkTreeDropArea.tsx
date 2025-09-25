import { DnD } from 'bookmark-finder-extension-ui';

import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/ui/bookmarkDropArea';

import { useDropTab } from '@/v3/entities/bookmark/drop/useDropTab';
import { useDropBookmark } from '@/v3/entities/bookmark/drop/useDropBookmark';

import type { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';

interface IBookmarkTreeDropAreaProps {
  folder: IFolder;
  startIdx: number;
  isFolderDragEnter: boolean;
}

function BookmarkTreeDropArea({
  folder,
  startIdx,
  isFolderDragEnter,
}: IBookmarkTreeDropAreaProps) {
  const { dropTab } = useDropTab(folder);
  const { dropBookmark } = useDropBookmark(folder);

  return (
    <DnD.Droppable
      dropAction={async (e) => {
        const draggedType = e.dataTransfer.getData('dragType');

        switch (draggedType) {
          case 'tab':
            dropTab(JSON.parse(e.dataTransfer.getData('tab')), startIdx);
            break;
          case 'bookmark':
            dropBookmark(startIdx);
            break;
          default:
            break;
        }
      }}
      etcStyles={{
        width: '100%',
      }}
    >
      {({ isDragEnter }) => {
        return (
          <BookmarkDropArea
            isDragEnter={isDragEnter || (isFolderDragEnter && startIdx === 0)}
          />
        );
      }}
    </DnD.Droppable>
  );
}

export default BookmarkTreeDropArea;
