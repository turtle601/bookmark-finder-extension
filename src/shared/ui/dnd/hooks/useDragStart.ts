import { ReactNode } from 'react';
import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

const inrange = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

export const useDragStart = () => {
  const { boundaryRef } = useDnDContext();
  const { setDragStartContent, setMousePosition } = useDnDActionContext();

  const emptyImg = new Image();

  emptyImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

  const hideDragDefaultImg: React.DragEventHandler = (e) => {
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
  };

  const dragStart =
    (children: ReactNode): React.DragEventHandler =>
    (e) => {
      hideDragDefaultImg(e);
      setDragStartContent(children);

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const handleDrag = (e: DragEvent) => {
        e.preventDefault();

        if (!boundaryRef.current) return;

        const boundaryBox = boundaryRef.current.getBoundingClientRect();

        setMousePosition({
          x: inrange(
            e.clientX - boundaryBox.left - offsetX,
            0,
            boundaryBox.width - rect.width,
          ),
          y: inrange(
            e.clientY - boundaryBox.top - offsetY,
            0,
            boundaryBox.height - rect.height,
          ),
        });
      };

      const handleDrop = () => {
        document.removeEventListener('dragover', handleDrag);
        document.removeEventListener('drop', handleDrop);
      };

      document.addEventListener('dragover', handleDrag);
      document.addEventListener('drop', handleDrop);
    };

  return {
    dragStart,
  };
};
