import React, { ComponentPropsWithoutRef } from 'react';
import { css } from '@emotion/react';

import type { CSSObject } from '@emotion/react';

import { useDnDContext } from '@/v3/shared/ui/dnd/model';

interface IPointerContentProps extends ComponentPropsWithoutRef<'div'> {
  customStyle?: (mouseX?: number, mouseY?: number) => CSSObject;
  customContent?: React.ReactNode;
}

const PointerContentComponent: React.FC<IPointerContentProps> = ({
  customStyle = () => {},
  customContent,
  ...attribute
}) => {
  const { mousePosition, dragStartContent, dragStartContentSize } =
    useDnDContext();

  const mouseX = mousePosition?.x;
  const mouseY = mousePosition?.y;

  const pointerContent = customContent ?? dragStartContent;

  const isShow = Boolean(mouseX !== undefined && mouseY !== undefined);

  return (
    isShow && (
      <div
        css={css({
          position: 'absolute',
          width: `${dragStartContentSize.width}px`,
          height: `${dragStartContentSize.height}px`,
          transform: `translate(${mouseX}px, ${mouseY}px)`,
          zIndex: 9999,
          pointerEvents: 'none',
          ...customStyle(mouseX, mouseY),
        })}
        {...attribute}
      >
        {pointerContent}
      </div>
    )
  );
};

export type PointerContentFC = React.NamedExoticComponent<IPointerContentProps>;

const PointerContent: PointerContentFC = React.memo(PointerContentComponent);

export default PointerContent;
