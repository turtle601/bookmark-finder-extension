import { css } from '@emotion/react';
import React, {
  ReactNode,
  useState,
  ElementType,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';

import type { CSSObject } from '@emotion/react';
import type { IDragPosition } from '@/shared/ui/dnd/hooks';
import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { IDropAction } from '@/shared/ui/dnd/hooks/useDrop';
import { color } from '@/shared/config/styles';

export interface IDropAreaProps {
  position: IDragPosition;
  action?: IDropAction['action'];
  customStyle: (isDragEnter?: boolean) => CSSObject;
  children?: ReactNode;
}

const DropArea: React.FC<PolymorpicProps<ElementType, IDropAreaProps>> = ({
  as,
  position,
  action,
  customStyle,
  children,
  ...attribuite
}) => {
  const dropAreaRef = useRef<Element | null>(null);
  const Element = as || 'div';
  const [displayPx, setDisplayPx] = useState(0);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const { dragEnter, dropAction } = useDnDActionContext();
  const { mouseX } = useDnDContext();

  const handleDragEnter: React.DragEventHandler = (e) => {
    dragEnter({ position })(e);
    setIsDragEnter(true);
  };

  const handleDrop: React.DragEventHandler = (e) => {
    dropAction({ action })(e);
    setIsDragEnter(false);
  };

  const handleDragLeave: React.DragEventHandler = (e) => {
    setIsDragEnter(false);
  };

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  const updateEffectPosition = useCallback(() => {
    if (dropAreaRef.current) {
      setDisplayPx(mouseX - dropAreaRef.current.getBoundingClientRect().left);
    }
  }, [mouseX]);

  useEffect(() => {
    updateEffectPosition();
  }, [mouseX, updateEffectPosition]);

  return (
    <Element
      ref={dropAreaRef}
      draggable
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      css={css({
        ...customStyle(isDragEnter),
        background: isDragEnter
          ? `linear-gradient(to right, ${color.purple} 0 ${displayPx}px, transparent ${displayPx + 8}px 100%)`
          : 'transparent',
      })}
      {...attribuite}
    >
      {children}
    </Element>
  );
};

export default DropArea;
