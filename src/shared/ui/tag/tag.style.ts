import { borderRadius, color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getTagStyle = (): CSSObject => {
  return {
    width: 'fit-content',
    height: '32px',
    padding: '0 12px',
    backgroundColor: color.gray,
    borderRadius: borderRadius.medium,
  };
};
