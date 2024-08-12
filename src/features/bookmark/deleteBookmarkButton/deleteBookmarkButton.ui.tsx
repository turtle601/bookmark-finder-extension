import React, { useCallback, useRef } from 'react';

import Button from '@/shared/ui/button';
import Dropable from '@/shared/ui/dnd/part/dropable';
import TrashIcon from '@/shared/config/assets/trash.svg';

import { DND_BOOKMARK_KEY } from '@/shared/config/constant';

import {
  closeTrashAnimation,
  getButtonAnimationStyle,
  openTrashAnimation,
} from '@/features/bookmark/deleteBookmarkButton/style';
import {
  useDeleteBookmarkFolderMutation,
  useDeleteBookmarkLinkMutation,
} from '@/entities/bookmark';

const DeleteBookmarkButton: React.FC = () => {
  const isAnimationCall = useRef(false); // dragenter했을 때만 animation을 실행하기 위한 변수

  const { mutate: deleteBookmarkLink } = useDeleteBookmarkLinkMutation();
  const { mutate: deleteBookmarkFolder } = useDeleteBookmarkFolderMutation();

  const handleDrop: React.DragEventHandler = (e) => {
    const { id, type } = JSON.parse(e.dataTransfer.getData(DND_BOOKMARK_KEY));

    switch (type) {
      case 'link':
        deleteBookmarkLink({ bookmarkId: id });
        break;
      case 'folder':
        deleteBookmarkFolder({ folderId: id });
        break;
      default:
        throw new Error('북마크 타입이 정해지지 않았습니다.');
    }
  };

  const getAnimationStyle = useCallback((isDragEnter: boolean) => {
    if (!isAnimationCall.current) {
      isAnimationCall.current = true;
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
