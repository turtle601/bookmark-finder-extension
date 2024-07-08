import { css } from '@emotion/react';
import React, { ElementType, ReactNode, useState } from 'react';

import { useDragStart } from '@/shared/ui/dnd/hooks/useDragStart';
import { useDragEnd } from '@/shared/ui/dnd/hooks/useDragEnd';
import { useDragOver } from '@/shared/ui/dnd/hooks/useDragOver';

import type { CSSObject } from '@emotion/react';
import type { IDragPosition } from '@/shared/ui/dnd/hooks';
import type { PolymorpicProps } from '@/shared/ui/util.type';

export interface IDragableProps {
  position: IDragPosition;
  customStyle: (isDrag?: boolean) => CSSObject;
  children?: ReactNode;
}

const Dragable: React.FC<PolymorpicProps<ElementType, IDragableProps>> = ({
  as,
  position,
  children,
  customStyle,
  ...attribute
}) => {
  const Element = as || 'div';
  const [isDrag, setIsDrag] = useState(false);
  const { dragStart } = useDragStart({ position });
  const { dragEnd } = useDragEnd();
  const { setDragOverPointer } = useDragOver();

  const handleDragStart: React.DragEventHandler = (e) => {
    dragStart(e);
    setIsDrag(true);
  };

  const handleDragEnd: React.DragEventHandler = (e) => {
    dragEnd();
    setIsDrag(false);
  };

  return (
    <Element
      draggable
      css={css({
        ...customStyle(isDrag),
      })}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={setDragOverPointer}
      {...attribute}
    >
      {children}
    </Element>
  );
};

export default Dragable;
