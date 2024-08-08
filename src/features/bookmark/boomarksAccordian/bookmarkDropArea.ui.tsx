import React from 'react';
import { css } from '@emotion/react';

import DnD from '@/shared/ui/dnd';

import { color } from '@/shared/config/styles';
import { DND_BOOKMARK_KEY } from '@/shared/config/constant';

import { useMoveBookmark } from '@/entities/bookmark';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarkDropAreaProps {
  parentId: Bookmark['parentId'];
  index: number;
}

const BookmarkDropArea: React.FC<IBookmarkDropAreaProps> = ({
  index,
  parentId,
}) => {
  const { mutate: moveBookmark } = useMoveBookmark();

  const handleDrop: React.DragEventHandler = (e) => {
    const { id } = JSON.parse(e.dataTransfer.getData(DND_BOOKMARK_KEY));

    moveBookmark({
      id,
      parentId: parentId,
      index: index,
    });
  };

  return (
    <DnD.Dropable dropAction={handleDrop}>
      {({ isDragEnter }) => {
        return (
          <div
            css={css({
              width: '100%',
              height: '4px',
              backgroundColor: isDragEnter ? color.purple : color.white,
            })}
          ></div>
        );
      }}
    </DnD.Dropable>
  );
};

export default BookmarkDropArea;
