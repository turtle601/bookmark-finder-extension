import { borderRadius, color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getTagStyle = (): CSSObject => {
  return {
    height: '32px',
    padding: '0 12px',
    boxSizing: 'content-box',
    backgroundColor: color.gray,
    borderRadius: borderRadius.medium,
  };
};
