import { ReactNode } from 'react';

import { useDnDActionContext, useDnDContext } from '@/dnd/model';

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
        console.log('drag');
        if (!boundaryRef.current) return;
        const boundaryBox = boundaryRef.current.getBoundingClientRect();

        const positionX = inrange(
          e.clientX - boundaryBox.left - offsetX,
          0,
          boundaryBox.width - offsetX,
        );

        const positionY = inrange(
          e.clientY - boundaryBox.top - offsetY,
          0,
          boundaryBox.height - offsetY,
        );

        if (e.clientX === 0 && e.clientY === 0) return;

        setMousePosition({
          x: positionX,
          y: positionY,
        });
      };

      const handleDrop = () => {
        document.removeEventListener('drag', handleDrag);
        document.removeEventListener('drop', handleDrop);
      };

      document.addEventListener('drag', handleDrag);
      document.addEventListener('drop', handleDrop);
    };

  return {
    dragStart,
  };
};
