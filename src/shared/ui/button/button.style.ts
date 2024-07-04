import { CSSObject } from '@emotion/react';

import { borderRadius, color } from '@/shared/config/styles';

const buttonStyle = {
  default: {
    primary: '#424242',
    hover: '#B0B0B0',
    disabled: '#E0E0E0',
  },
  valid: {
    primary: '#03C75A',
    hover: '#34D77B',
    disabled: '#E0E0E0',
  },
  danger: {
    primary: '#E53935',
    hover: '#EC6563',
    disabled: '#E0E0E0',
  },
} as const;

export type ButtonType = keyof typeof buttonStyle;

export const getButtonStyle = (kind: ButtonType): CSSObject => {
  return {
    color: color.white,
    borderRadius: borderRadius.small,
    backgroundColor: buttonStyle[kind].primary,
    '&:hover': {
      backgroundColor: buttonStyle[kind].hover,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: buttonStyle[kind].disabled,
    },
  };
};
