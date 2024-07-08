import { useDnDActionContext } from '@/shared/ui/dnd/model';

export const useDragEnd = () => {
  const { setDragStartItem, setDragEnterItem, setMousePosition } =
    useDnDActionContext();

  const dragEnd = () => {
    setDragStartItem(null);
    setDragEnterItem(null);
    setMousePosition({ x: 0, y: 0 });
  };

  return {
    dragEnd,
  };
};
