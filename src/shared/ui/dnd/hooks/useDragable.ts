import { ReactNode, useState } from 'react';

import { useDragEnd, useDragOver, useDragStart } from '@/shared/ui/dnd/hooks';
import type { AsyncVoidFunction } from '@/shared/ui/util.type';

interface IUseDragableParameter {
  children: (props: { isDrag: boolean }) => ReactNode;
  dragAction: VoidFunction | AsyncVoidFunction;
}

export const useDragable = ({
  children,
  dragAction,
}: IUseDragableParameter) => {
  const [isDrag, setIsDrag] = useState(false);

  const { dragStart } = useDragStart();
  const { dragEnd } = useDragEnd();
  const { handleDragOver } = useDragOver();

  const handleDragStart: React.DragEventHandler = async (e) => {
    await dragAction();
    dragStart(children({ isDrag }))(e);
    setIsDrag(true);
  };

  const handleDragEnd: React.DragEventHandler = (e) => {
    dragEnd();
    setIsDrag(false);
  };

  return {
    isDrag,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
