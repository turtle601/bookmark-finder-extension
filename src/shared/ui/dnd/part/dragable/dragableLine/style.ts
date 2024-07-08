import { color } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';

export const getDragableAreaLineStyle = (isDrag?: boolean): CSSObject => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: '170px',
    height: '32px',
    padding: '0 12px',
    cursor: isDrag ? 'move' : 'grab',
    color: isDrag ? color.gray300 : color.gray,
  };
};
