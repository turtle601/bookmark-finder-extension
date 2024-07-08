import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef, ReactElement } from 'react';

import { useDnDActionContext, useDnDContext } from '@/shared/ui/dnd/model';
import { injectPropsForChild } from '@/shared/ui/utils';

export interface IOverlayProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactElement;
}

const Overlay: React.FC<IOverlayProps> = ({ children, ...attribute }) => {
  const { isDrag, mouseX, mouseY } = useDnDContext();

  const { getStartDragPosition } = useDnDActionContext();

  const isShow = isDrag && !(mouseX === 0 && mouseY === 0);

  return (
    isShow && (
      <div
        css={css({
          position: 'absolute',
          left: mouseX - 12,
          top: mouseY - 24,
          zIndex: 10,
        })}
        {...attribute}
      >
        {injectPropsForChild({
          props: {
            position: getStartDragPosition(),
          },
          child: children,
        })}
      </div>
    )
  );
};

export default Overlay;
