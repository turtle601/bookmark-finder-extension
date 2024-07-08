import React, { ElementType } from 'react';

import Dragable from '@/shared/ui/dnd/part/dragable';

import { getDragableAreaLineStyle } from '@/shared/ui/dnd/part/dragable/dragableLine/style';

import type { CSSObject } from '@emotion/react';
import type { IDragableProps } from '@/shared/ui/dnd/part/dragable/dragable.ui';
import type { PolymorpicProps } from '@/shared/ui/util.type';

export type IDragableLineProps = Omit<IDragableProps, 'customStyle'> & {
  etcStyles?: CSSObject;
};

const DragableLine: React.FC<
  PolymorpicProps<ElementType, IDragableLineProps>
> = ({
  as,
  position,
  customStyle,
  children,
  etcStyles = {},
  ...attribuite
}) => {
  return (
    <Dragable
      as={as}
      position={position}
      customStyle={(isDrag) => ({
        ...getDragableAreaLineStyle(isDrag),
        ...etcStyles,
      })}
      {...attribuite}
    >
      {position.data?.text}
    </Dragable>
  );
};

export default DragableLine;
