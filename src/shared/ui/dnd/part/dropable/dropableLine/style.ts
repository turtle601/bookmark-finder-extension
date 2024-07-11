import { color } from '@/shared/config/styles';

import type { CSSObject } from '@emotion/react';

export const getLineEffectStyle = (
  isDragEnter: boolean,
  dist: number,
): CSSObject => {
  return {
    width: '170px',
    height: '4px',
    position: 'relative',
    background: isDragEnter
      ? `linear-gradient(to right, ${color.purple} 0 ${dist}px, transparent ${dist + 8}px 100%)`
      : 'transparent',
    ...(isDragEnter && {
      '::before': {
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '12px',
        height: '12px',
        backgroundColor: color.purple,
        borderRadius: '50%',
      },
    }),
  };
};
