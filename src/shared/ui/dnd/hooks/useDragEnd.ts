import { useDnDActionContext } from '@/shared/ui/dnd/model';

export const useDragEnd = () => {
  const { setMousePosition, setDragStartContent } = useDnDActionContext();

  const dragEnd = () => {
    setMousePosition(null);
    setDragStartContent(null);
  };

  return {
    dragEnd,
  };
};
