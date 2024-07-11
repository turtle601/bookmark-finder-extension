import { css } from '@emotion/react';
import React, { ReactNode, useState, ElementType } from 'react';

import { useDrop } from '@/shared/ui/dnd/hooks/useDrop';
import { useDragEnter } from '@/shared/ui/dnd/hooks/useDragEnter';
import { useDragLeave } from '@/shared/ui/dnd/hooks/useDragLeave';
import { useDragOver } from '@/shared/ui/dnd/hooks/useDragOver';

import type { IUseDrop } from '@/shared/ui/dnd/hooks/useDrop';
import type { CSSObject } from '@emotion/react';
import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { IDragPosition } from '@/shared/ui/dnd/hooks';
import { useDragEnd } from '@/shared/ui/dnd/hooks/useDragEnd';

export interface IDropableProps {
  position: IDragPosition;
  action: IUseDrop['action'];
  customStyle: (isDragEnter: boolean) => CSSObject;
  children?: ReactNode;
}

const Dropable: React.FC<PolymorpicProps<ElementType, IDropableProps>> = ({
  as,
  position,
  action,
  customStyle,
  children,
  ...attribuite
}) => {
  const Element = as || 'div';
  const [isDragEnter, setIsDragEnter] = useState(false);

  const { dragEnter } = useDragEnter({ position });
  const { drop } = useDrop({ action });
  const { dragLeave } = useDragLeave();
  const { setDragOverPointer } = useDragOver();
  const { dragEnd } = useDragEnd();

  const handleDragEnter = () => {
    dragEnter();
    setIsDragEnter(true);
  };

  const handleDragLeave = () => {
    dragLeave();
    setIsDragEnter(false);
  };

  const handleDrop = () => {
    drop();
    setIsDragEnter(false);
  };

  return (
    <Element
      draggable
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragEnd={dragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={setDragOverPointer}
      css={css({
        ...customStyle(isDragEnter),
      })}
      {...attribuite}
    >
      {children}
    </Element>
  );
};

export default Dropable;
