import { borderRadius, color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getTagStyle = (isSelected: boolean): CSSObject => {
  return {
    height: '32px',
    padding: '0 12px',
    boxSizing: 'content-box',
    backgroundColor: color.gray,
    border: isSelected ? `2px solid ${color.purple}` : 'none',
    borderRadius: borderRadius.medium,
  };
};
