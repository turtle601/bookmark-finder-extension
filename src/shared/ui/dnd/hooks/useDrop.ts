import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

import type { IDragPosition } from '@/shared/ui/dnd/hooks/useDnD';

interface IOnDropParameter {
  startPosition: IDragPosition;
  endPosition: IDragPosition;
}

export interface IUseDrop {
  action: ({ startPosition, endPosition }: IOnDropParameter) => void;
}

export const useDrop = ({ action }: IUseDrop) => {
  const { dragStartItem, dragEnterItem } = useDnDContext();
  const { setDragStartItem, setDragEnterItem } = useDnDActionContext();

  const drop = () => {
    if (dragStartItem === null || dragEnterItem === null) return;

    action({
      startPosition: dragStartItem,
      endPosition: dragEnterItem,
    });

    setDragEnterItem(null);
    setDragStartItem(null);
  };

  return { drop };
};
