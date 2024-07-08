import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

import type { IDragPosition } from '@/shared/ui/dnd/hooks/useDnD';

export interface IUseDragStartParameter {
  position: IDragPosition;
}

export const useDragStart = ({ position }: IUseDragStartParameter) => {
  const { dragStartItem } = useDnDContext();
  const { setDragStartItem } = useDnDActionContext();

  const emptyImg = new Image();

  emptyImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

  const hideDragDefaultImg: React.DragEventHandler = (e) => {
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
  };

  const dragStart: React.DragEventHandler = (e) => {
    setDragStartItem(position);
    hideDragDefaultImg(e);
  };

  return {
    isDrag: !!dragStartItem,
    dragStartItem,
    dragStart,
  };
};
