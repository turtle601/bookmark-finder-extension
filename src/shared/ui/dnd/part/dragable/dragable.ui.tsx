import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { useDragable } from '@/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';
import type { DragEventHandler, ReactNode, Ref } from 'react';

export interface IDragableProps {
  children: (props: { isDrag: boolean }) => ReactNode;
  isMoved?: boolean;
  dragAction?: DragEventHandler;
  etcStyles?: CSSObject;
}

const DragableComponent = (
  {
    children,
    isMoved = false,
    dragAction = () => {},
    etcStyles = {},
  }: IDragableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const {
    isDrag,
    isFirstDragStart,
    handleDragEnd,
    handleDragStart,
    mousePosition,
  } = useDragable({
    dragAction,
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

export type DragableFC = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    IDragableProps & React.RefAttributes<HTMLDivElement>
  >
>;

const Dragable: DragableFC = React.memo(forwardRef(DragableComponent));

export default Dragable;
