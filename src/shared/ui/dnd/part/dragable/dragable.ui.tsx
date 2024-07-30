import React from 'react';
import { css } from '@emotion/react';

import { useDragable } from '@/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';
import type { ElementType, ReactNode } from 'react';
import type {
  AsyncVoidFunction,
  PolymorpicPropsExcludeChildren,
} from '@/shared/ui/util.type';

export interface IDragableProps {
  children: (props: { isDrag: boolean }) => ReactNode;
  dragAction?: VoidFunction | AsyncVoidFunction;
  etcStyles?: CSSObject;
}

export type DragableFC = React.FC<
  PolymorpicPropsExcludeChildren<ElementType, IDragableProps>
>;

const Dragable: DragableFC = ({
  as,
  children,
  dragAction = () => {},
  etcStyles = {},
  ...attribute
}) => {
  const Element = as || 'div';

  const { isDrag, handleDragEnd, handleDragOver, handleDragStart } =
    useDragable({ dragAction, children });

  return (
    <Element
      draggable
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    >
      {children({ isDrag })}
    </Element>
  );
};

export default Dragable;
