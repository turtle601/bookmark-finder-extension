import { color } from '@/shared/config/styles';
import { CSSObject } from '@emotion/react';

export const getToggleCheckBoxStyle = (): CSSObject => {
  return {
    '&:checked label': {
      backgroundColor: color.green,
    },

    '&:checked span': {
      left: `calc(100% - 44px)`,
      background: color.white,
    },
  };
};

export const getToggleSwitchStyle = (isChecked: boolean): CSSObject => {
  return {
    display: 'block',
    position: 'relative',
    width: '40px',
    height: '20px',
    borderRadius: '30px',
    backgroundColor: isChecked ? color.green : color.white,
    boxShadow: '0 0 16px 4px rgba(0 0 0 / 10%)',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
  };
};

export const getToggleButtonStyle = (isChecked: boolean): CSSObject => {
  return {
    width: '16px',
    height: '16px',
    position: 'absolute',
    top: '50%',
    left: isChecked ? 'calc(100% - 18px)' : '2px',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    background: isChecked ? color.gray100 : color.green,
    transition: 'all 0.2s ease-in',
  };
};
