import { forwardRef, memo } from 'react';
import { css } from '@emotion/react';

import { useDraggable } from '@/v3/shared/ui/dnd/hooks';

import type { DragEventHandler, ReactNode, Ref } from 'react';
import type { CSSObject } from '@emotion/react';

export interface IDraggableProps {
  children: (props: { isDrag: boolean }) => ReactNode;
  isMoved?: boolean;
  dragAction?: DragEventHandler;
  dragEndAction?: DragEventHandler;
  etcStyles?: CSSObject;
}

const SingleDraggableComponent = (
  {
    children,
    isMoved = false,
    dragAction = () => {},
    dragEndAction = () => {},
    etcStyles = {},
  }: IDraggableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const {
    isDrag,
    isFirstDragStart,
    handleDragEnd,
    handleDragStart,
    mousePosition,
  } = useDraggable({
    dragAction,
    dragEndAction,
    children,
    isMoved,
  });

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  const positionX = mousePosition?.x || 0;
  const positionY = isFirstDragStart
    ? mousePosition?.y || '56px'
    : mousePosition?.y || 0;

  return (
    <div
      ref={ref}
      draggable
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      css={css({
        display: 'inline-block',
        cursor: 'grab',
        ...(isMoved && {
          position: 'absolute',
          top: positionY,
          left: positionX,
        }),
        ...etcStyles,
      })}
    >
      {children({ isDrag })}
    </div>
  );
};

export type SingleDraggableFC = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    IDraggableProps & React.RefAttributes<HTMLDivElement>
  >
>;

// eslint-disable-next-line @rushstack/typedef-var
const SingleDraggable = memo(forwardRef(SingleDraggableComponent));

export default SingleDraggable;
