import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef, useState } from 'react';

import { useDnDActionContext } from '@/shared/ui/dnd/model';

import type { CSSObject } from '@emotion/react';
import type { IDragPosition } from '@/shared/ui/dnd/hooks';

export interface IItemProps extends ComponentPropsWithoutRef<'div'> {
  customStyle: (isDrag?: boolean) => CSSObject;
  position?: IDragPosition;
}

const Item: React.FC<IItemProps> = ({
  position,
  customStyle,
  ...attribute
}) => {
  const [isDrag, setIsDrag] = useState(false);
  const { dragStart, dragOver, dragEnd } = useDnDActionContext();

  const handleDragStart: React.DragEventHandler = (e) => {
    if (position) dragStart({ position })(e);
    setIsDrag(true);
  };

  const handleDragEnd: React.DragEventHandler = (e) => {
    dragEnd(e);
    setIsDrag(false);
  };

  return (
    <div
      draggable
      css={css({
        ...customStyle(isDrag),
      })}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={dragOver}
      {...attribute}
    >
      {position?.data?.text}
    </div>
  );
};

export default Item;
