import { DnD } from 'bookmark-finder-extension-ui';

import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/ui/bookmarkDropArea';

import {
  useAddBookmarkMutation,
  useMoveBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

interface IBookmarkTreeDropAreaProps {
  folder: IBookmarkTreeStorage;
  startIdx: number;
  isFolderDragEnter: boolean;
}

function BookmarkTreeDropArea({
  folder,
  startIdx,
  isFolderDragEnter,
}: IBookmarkTreeDropAreaProps) {
  const { moveBookmark } = useMoveBookmarkMutation(folder.id);
  const { mutate: addBookmark } = useAddBookmarkMutation();

  return (
    <DnD.Droppable
      dropAction={async (e) => {
        const draggedType = e.dataTransfer.getData('dragType');

        switch (draggedType) {
          case 'tab':
            const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

            addBookmark({
              title: draggedTab.title,
              url: draggedTab.url,
              parentId: folder.id,
              index: startIdx,
            });

            break;
          case 'bookmark':
            moveBookmark({
              parentId: folder.id,
              startIdx,
            });
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
