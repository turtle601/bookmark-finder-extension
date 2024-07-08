import { css, CSSObject } from '@emotion/react';

import React, { ComponentPropsWithoutRef } from 'react';

import { useDnDContext } from '@/shared/ui/dnd/model';
import {
  getOverlayStyle,
  getOverlayWrapperStyle,
} from '@/shared/ui/dnd/part/overlay/style';

import Dragable from '@/shared/ui/dnd/part/dragable';

export interface IOverlayProps extends ComponentPropsWithoutRef<'div'> {
  etcStyles?: CSSObject;
}

const Overlay: React.FC<IOverlayProps> = ({ etcStyles = {}, ...attribute }) => {
  const { mouseX, mouseY, dragStartItem, dragEnterItem } = useDnDContext();

  const isDrag = !!dragStartItem;
  const isEnter = !!dragEnterItem;

  return (
    isDrag && (
      <div
        css={css({
          ...getOverlayWrapperStyle(mouseX, mouseY),
        })}
        {...attribute}
      >
        <Dragable
          position={dragStartItem}
          customStyle={() => ({
            ...getOverlayStyle(isEnter),
            ...etcStyles,
          })}
          {...attribute}
        >
          {dragStartItem.data?.text}
        </Dragable>
      </div>
    )
  );
};

export default Overlay;
