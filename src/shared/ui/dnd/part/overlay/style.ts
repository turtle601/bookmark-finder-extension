import { color } from '@/shared/config/styles';
import { getDragableAreaLineStyle } from '@/shared/ui/dnd/part/dragable/dragableLine/style';

import type { CSSObject } from '@emotion/react';

export const getOverlayWrapperStyle = (
  mouseX: number,
  mouseY: number,
): CSSObject => {
  return {
    position: 'absolute',
    left: mouseX - 12,
    top: mouseY - 24,
    zIndex: 10,
  };
};

export const getOverlayStyle = (isEnter: boolean): CSSObject => {
  return {
    ...getDragableAreaLineStyle(),
    width: '170px',
    height: '32px',
    color: color.gray,
    boxSizing: 'content-box',
    border: `1px solid ${color.gray300}`,
    boxShadow: `0px 3px 4px rgba(176, 176, 176, 0.3)`,
    ...(isEnter && {
      borderLeft: `4px solid ${color.purple}`,
    }),
  };
};
