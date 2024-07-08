import { useRef, useState } from 'react';

import type { IDragPosition } from '@/shared/ui/dnd/hooks/useDnD';

export interface IDragStartParameter {
  position: IDragPosition;
}

export const useDragStart = () => {
  const [isDrag, setIsDrag] = useState(false);
  const dragStartItem = useRef<IDragPosition | null>(null);

  const hideDragDefaultImg: React.DragEventHandler = (e) => {
    const emptyImg = new Image();
    emptyImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

    e.dataTransfer.setDragImage(emptyImg, 0, 0);
  };

  const dragStart =
    ({ position }: IDragStartParameter): React.DragEventHandler =>
    (e) => {
      dragStartItem.current = position;
      setIsDrag(true);
      hideDragDefaultImg(e);
    };

  const getStartDragPosition = () => {
    return dragStartItem.current;
  };

  return {
    isDrag,
    setIsDrag,
    dragStart,
    dragStartItem,
    getStartDragPosition,
  };
};
