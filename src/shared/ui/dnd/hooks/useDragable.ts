import { DragEventHandler, ReactNode, useState } from 'react';

import { useDragEnd, useDragStart } from '@/shared/ui/dnd/hooks';
import { useDnDContext } from '@/shared/ui/dnd/model';

interface IUseDragableParameter {
  children: (props: { isDrag: boolean }) => ReactNode;
  dragAction: DragEventHandler;
  isMoved: boolean;
}

export const useDragable = ({
  children,
  dragAction,
  isMoved,
}: IUseDragableParameter) => {
  const { mousePosition } = useDnDContext();
  const [isDrag, setIsDrag] = useState(false);
  const [isDragStartCount, setIsDragStartCount] = useState(0);

  const { dragStart } = useDragStart();
  const { dragEnd } = useDragEnd();

  const handleDragStart: React.DragEventHandler = (e) => {
    dragStart(children({ isDrag }))(e);
    setIsDrag(true);
    dragAction(e);
    setIsDragStartCount((prev) => prev + 1);
  };

  const handleDragEnd: React.DragEventHandler = (e) => {
    setIsDrag(false);

    if (isMoved) {
      dragEnd({ x: 0, y: mousePosition?.y || 0 });
      return;
    }

    dragEnd(null);
  };

  return {
    isDrag,
    isFirstDragStart: isDragStartCount <= 1,
    mousePosition,
    handleDragStart,
    handleDragEnd,
  };
};
