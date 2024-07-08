import React, { ElementType } from 'react';

import Dropable from '@/shared/ui/dnd/part/dropable';

import { useDistForAreaAndMouse } from '@/shared/ui/dnd/part/dropable/hooks/useDistForAreaAndMouse';
import { getLineEffectStyle } from '@/shared/ui/dnd/part/dropable/dropableLine/style';

import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { IDropableProps } from '@/shared/ui/dnd/part/dropable/dropable.ui';
import { CSSObject } from '@emotion/react';

export type IDropableLineProps = Omit<IDropableProps, 'customStyle'> & {
  etcStyles?: CSSObject;
};

const DropableLine: React.FC<
  PolymorpicProps<ElementType, IDropableLineProps>
> = ({
  as,
  position,
  customStyle,
  action,
  children,
  etcStyles = {},
  ...attribuite
}) => {
  const Element = as || 'div';
  const { dropAreaRef, dist } = useDistForAreaAndMouse();

  return (
    <Element>
      <Dropable
        position={position}
        action={action}
        customStyle={(isDragEnter) => ({
          ...getLineEffectStyle(isDragEnter, dist),
          ...etcStyles,
        })}
        {...attribuite}
      >
        <div ref={dropAreaRef}>{children}</div>
      </Dropable>
    </Element>
  );
};

export default DropableLine;
