import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

export const useDragOver = () => {
  const { mouseX, mouseY } = useDnDContext();
  const { setMousePosition } = useDnDActionContext();

  const blockDragOverEvent: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  const setDragOverPointer: React.DragEventHandler = (e) => {
    blockDragOverEvent(e);

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return {
    mouseX,
    mouseY,
    blockDragOverEvent,
    setDragOverPointer,
  };
};
