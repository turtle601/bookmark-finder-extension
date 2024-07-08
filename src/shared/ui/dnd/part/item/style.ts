import { color } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';

export const getDragItemStyle = (isDrag?: boolean): CSSObject => {
  return {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    padding: '0 12px',
    cursor: isDrag ? 'move' : 'grab',
    color: isDrag ? color.gray300 : color.gray,
  };
};

export const getOverlayItemStyle = (isDrag?: boolean): CSSObject => {
  return {
    ...getDragItemStyle(isDrag),
    boxSizing: 'content-box',
    border: `1px solid ${color.gray300}`,
    borderLeft: `4px solid ${color.purple}`,
    boxShadow: `0px 3px 4px rgba(176, 176, 176, 0.3)`,
  };
};
