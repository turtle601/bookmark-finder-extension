import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

import type { IDragPosition } from '@/shared/ui/dnd/hooks/useDnD';

interface IUserDragEnterParameter {
  position: IDragPosition;
}

export const useDragEnter = ({ position }: IUserDragEnterParameter) => {
  const { dragEnterItem } = useDnDContext();
  const { setDragEnterItem } = useDnDActionContext();

  const dragEnter = () => {
    setDragEnterItem(position);
  };

  return {
    isDragEnter: !!dragEnterItem,
    dragEnterItem,
    dragEnter,
  };
};
