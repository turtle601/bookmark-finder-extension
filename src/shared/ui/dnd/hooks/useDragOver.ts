import { useMousePosition } from '@/shared/hooks/useMousePosition';

export const useDragOver = () => {
  const { mouseX, mouseY, setMousePosition } = useMousePosition();

  const dragOver: React.DragEventHandler = (e) => {
    e.preventDefault();

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return {
    mouseX,
    mouseY,
    dragOver,
  };
};
