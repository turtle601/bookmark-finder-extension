import React, { ComponentPropsWithoutRef } from 'react';
import { css } from '@emotion/react';

import { useDnDContext } from '@/shared/ui/dnd/model';

import type { CSSObject } from '@emotion/react';

interface IPointerContentProps extends ComponentPropsWithoutRef<'div'> {
  customStyle?: (mouseX?: number, mouseY?: number) => CSSObject;
}

export type PointerContentFC = React.FC<IPointerContentProps>;

const PointerContent: PointerContentFC = ({
  customStyle = () => {},
  ...attribute
}) => {
  const { mousePosition, dragStartContent } = useDnDContext();

  return (
    mousePosition && (
      <div
        css={css({
          position: 'absolute',
          left: mousePosition.x,
          top: mousePosition.y,
          ...customStyle(mousePosition.x, mousePosition.y),
        })}
        {...attribute}
      >
        {dragStartContent}
      </div>
    )
  );
};

export default PointerContent;
