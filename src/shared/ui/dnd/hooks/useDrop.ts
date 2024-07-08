import React from 'react';

import { IDragPosition, IUseDnDParameter } from '@/shared/ui/dnd/hooks/useDnD';

export interface IDropAction {
  action?: IUseDnDParameter['onDrop'];
}

interface IOnDropParameter {
  startPosition: IDragPosition;
  endPosition: IDragPosition;
}

interface IUseDrop {
  dragStartItem: React.MutableRefObject<IDragPosition | null>;
  dragEnterItem: React.MutableRefObject<IDragPosition | null>;
  onDrop: ({ startPosition, endPosition }: IOnDropParameter) => void;
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDrop = ({
  dragStartItem,
  dragEnterItem,
  onDrop,
  setIsDrag,
}: IUseDrop) => {
  const dropAction =
    ({ action }: IDropAction): React.DragEventHandler =>
    () => {
      if (dragStartItem.current === null || dragEnterItem.current === null)
        return;

      if (action) {
        action({
          startPosition: dragStartItem.current,
          endPosition: dragEnterItem.current,
        });
      } else {
        onDrop({
          startPosition: dragStartItem.current,
          endPosition: dragEnterItem.current,
        });
      }

      dragStartItem.current = null;
      dragEnterItem.current = null;

      setIsDrag(false);
    };

  return { dropAction };
};
