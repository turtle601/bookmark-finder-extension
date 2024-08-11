import React, { useCallback, useRef } from 'react';

import Button from '@/shared/ui/button';
import Dropable from '@/shared/ui/dnd/part/dropable';
import TrashIcon from '@/shared/config/assets/trash.svg';

import { DND_BOOKMARK_KEY } from '@/shared/config/constant';

import { useDeleteBookmarkMutation } from '@/entities/bookmark';

import {
  closeTrashAnimation,
  getButtonAnimationStyle,
  openTrashAnimation,
} from '@/features/bookmark/deleteBookmarkButton/style';

const DeleteBookmarkButton: React.FC = () => {
  const isFnCall = useRef(false); // dragenter했을 때만 animation을 실행하기 위한 변수

  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const handleDrop: React.DragEventHandler = (e) => {
    const { id } = JSON.parse(e.dataTransfer.getData(DND_BOOKMARK_KEY));

    deleteBookmark({ bookmarkId: id });
  };

  const getAnimationStyle = useCallback((isDragEnter: boolean) => {
    if (!isFnCall.current) {
      isFnCall.current = true;
      return {};
    }

    const animation = isDragEnter ? openTrashAnimation : closeTrashAnimation;

    return getButtonAnimationStyle(animation, 0.4);
  }, []);

  return (
    <Dropable dropAction={handleDrop}>
      {({ isDragEnter }) => {
        return (
          <Button
            kind={'danger'}
            etcStyles={{
              width: '100%',
              height: '48px',
              ...getAnimationStyle(isDragEnter),
            }}
          >
            {!isDragEnter && <TrashIcon />}
          </Button>
        );
      }}
    </Dropable>
  );
};

export default DeleteBookmarkButton;
