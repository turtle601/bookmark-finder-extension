import { color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getTabStyle = (isSelected: boolean): CSSObject => {
  return {
    cursor: 'pointer',
    padding: '4px 12px',

    color: isSelected ? color.green : color.gray300,

    borderBottom: isSelected
      ? `2px solid ${color.green}`
      : `2px solid ${color.gray300}`,
  };
};
