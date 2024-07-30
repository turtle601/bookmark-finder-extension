import { ReactNode } from 'react';
import { useDnDActionContext } from '@/shared/ui/dnd/model';

export const useDragStart = () => {
  const { setDragStartContent } = useDnDActionContext();

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
    };

  return {
    dragStart,
  };
};
