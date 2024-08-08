import React, { ComponentPropsWithoutRef } from 'react';
import { css } from '@emotion/react';

import { useDnDContext } from '@/shared/ui/dnd/model';

import type { CSSObject } from '@emotion/react';
import { THIRD_LAYER_ZIDENX } from '@/shared/config/constant';

interface IPointerContentProps extends ComponentPropsWithoutRef<'div'> {
  customStyle?: (mouseX?: number, mouseY?: number) => CSSObject;
}

export type PointerContentFC = React.FC<IPointerContentProps>;

const PointerContent: PointerContentFC = ({
  customStyle = () => {},
  ...attribute
}) => {
  const { mousePosition, dragStartContent } = useDnDContext();

  const mouseX = mousePosition?.x || 0;
  const mouseY = mousePosition?.y || 0;

  return (
    dragStartContent && (
      <div
        css={css({
          position: 'absolute',
          transform: `translate(${mouseX}px, ${mouseY}px)`,
          zIndex: `${THIRD_LAYER_ZIDENX}`,
          pointerEvents: 'none',
          ...customStyle(mouseX, mouseY),
        })}
        {...attribute}
      >
        {dragStartContent}
      </div>
    )
  );
};

export type PointerContentFC = React.NamedExoticComponent<IPointerContentProps>;

const PointerContent: PointerContentFC = React.memo(PointerContentComponent);

export default PointerContent;
