import { color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getTabStyle = (isSelected: boolean): CSSObject => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '72px',
    height: '48px',

    color: isSelected ? color.green : color.gray300,

    borderBottom: isSelected
      ? `2px solid ${color.green}`
      : `2px solid ${color.gray300}`,
  };
};
