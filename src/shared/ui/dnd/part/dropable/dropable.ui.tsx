import { css } from '@emotion/react';
import React, { ElementType, ReactNode } from 'react';

import { useDropable } from '@/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';
import type {
  AsyncVoidFunction,
  PolymorpicPropsExcludeChildren,
} from '@/shared/ui/util.type';

interface IDropableProps {
  children: (props: { isDragEnter: boolean }) => ReactNode;
  dropAction: VoidFunction | AsyncVoidFunction;
  etcStyles?: CSSObject;
}

export type DropableFC = React.FC<
  PolymorpicPropsExcludeChildren<ElementType, IDropableProps>
>;

const Dropable: DropableFC = ({
  as,
  dropAction,
  children,
  etcStyles = {},
  ...attribute
}) => {
  const Element = as || 'div';

  const {
    isDragEnter,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragOver,
  } = useDropable({ action: dropAction });

  return (
    <Element
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    >
      {children({ isDragEnter })}
    </Element>
  );
};

export default Dropable;
