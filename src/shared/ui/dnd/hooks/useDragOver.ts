import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

export const useDragOver = () => {
  const { mousePosition } = useDnDContext();
  const { setMousePosition } = useDnDActionContext();

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return {
    mousePosition,
    handleDragOver,
  };
};
