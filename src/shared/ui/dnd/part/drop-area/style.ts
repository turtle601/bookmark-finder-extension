import { color } from '@/shared/config/styles';
import type { CSSObject } from '@emotion/react';

export const getLineEffectStyle = (isDragEnter?: boolean): CSSObject => {
  return {
    width: '170px',
    height: '4px',
    position: 'relative',
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

// background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%);
