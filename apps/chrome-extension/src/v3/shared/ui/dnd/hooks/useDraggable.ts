import { DragEventHandler, ReactNode, useState } from 'react';

import { useDragEnd } from '@/v3/shared/ui/dnd/hooks/useDragEnd';
import { useDragStart } from '@/v3/shared/ui/dnd/hooks/useDragStart';

import { useDnDActionContext, useDnDContext } from '@/v3/shared/ui/dnd/model';

interface IParameter {
  children: (props: { isDrag: boolean }) => ReactNode;
  dragAction: DragEventHandler;
  dragEndAction: DragEventHandler;
  isMoved: boolean;
}

export const useDraggable = ({
  children,
  dragAction,
  dragEndAction,
  isMoved,
}: IParameter) => {
  const { mousePosition } = useDnDContext();
  const { setDragStartContentSize } = useDnDActionContext();

  const [isDrag, setIsDrag] = useState(false);
  const [isDragStartCount, setIsDragStartCount] = useState(0);

  const { dragStart } = useDragStart();
  const { dragEnd } = useDragEnd();

  const handleDragStart: React.DragEventHandler = (e) => {
    setDragStartContentSize({
      width: e.currentTarget.getBoundingClientRect().width ?? 0,
      height: e.currentTarget.getBoundingClientRect().height ?? 0,
    });

    dragStart(children({ isDrag }))(e);
    setIsDrag(true);
    setIsDragStartCount((prev) => prev + 1);

    dragAction(e);
  };

  const handleDragEnd: React.DragEventHandler = (e) => {
    setIsDrag(false);

    if (isMoved) {
      dragEnd({ x: 0, y: mousePosition?.y || 0 });
      return;
    }

    dragEnd(null);

    dragEndAction(e);
  };

  return {
    isDrag,
    isFirstDragStart: isDragStartCount <= 1,
    mousePosition,
    handleDragStart,
    handleDragEnd,
  };
};
