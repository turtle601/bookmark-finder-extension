import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { useDragable } from '@/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';
import type { ReactNode, Ref } from 'react';
import type { AsyncVoidFunction } from '@/shared/ui/util.type';

export interface IDragableProps {
  children: (props: { isDrag: boolean }) => ReactNode;
  dragEndType?: 'reset' | 'leftSide';
  dragAction?: VoidFunction | AsyncVoidFunction;
  etcStyles?: CSSObject;
}

const DragableComponent = (
  {
    children,
    dragEndType = 'reset',
    dragAction = () => {},
    etcStyles = {},
  }: IDragableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { isDrag, handleDragEnd, handleDragStart, mousePosition } = useDragable(
    {
      dragAction,
      children,
      dragEndType,
    },
  );

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

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
        ...(dragEndType === 'leftSide' && {
          position: 'absolute',
          top: mousePosition?.y || 0,
          left: mousePosition?.x || 0,
        }),
        ...etcStyles,
      })}
    >
      {children({ isDrag })}
    </div>
  );
};

export type DragableFC = React.ForwardRefExoticComponent<
  IDragableProps & React.RefAttributes<HTMLDivElement>
>;

const Dragable: DragableFC = forwardRef(DragableComponent);

export default Dragable;
