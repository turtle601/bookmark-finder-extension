import { DnD } from 'bookmark-finder-extension-ui';

import { useDropTab } from '@/v3/entities/bookmark/drop/useDropTab';
import { useDropBookmark } from '@/v3/entities/bookmark/drop/useDropBookmark';

import BookmarkDropAreaUI from '@/v3/entities/bookmark/ui/bookmarkDropAreaUI';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

interface IBookmarkDropAreaProps {
  folder: IFolder;
  startIdx: number;
  isFolderDragEnter: boolean;
}

function BookmarkDropArea({
  folder,
  startIdx,
  isFolderDragEnter,
}: IBookmarkDropAreaProps) {
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
          <BookmarkDropAreaUI
            isDragEnter={isDragEnter || (isFolderDragEnter && startIdx === 0)}
          />
        );
      }}
    </DnD.Droppable>
  );
}

export default BookmarkDropArea;
