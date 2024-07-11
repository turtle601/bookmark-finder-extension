import { CSSObject } from '@emotion/react';

import { borderRadius, color } from '@/shared/config/styles';

export const getFieldStyle = (
  kind: 'outline' | 'flushed',
  isError: boolean,
  touched: boolean,
): CSSObject => {
  return {
    padding: '20px 20px 20px 0',
    '&::placeholder': {
      color: color.gray300,
    },
    ...{
      outline: {
        border: `4px solid ${touched ? (isError ? color.red : color.green) : color.gray}`,
        borderRadius: borderRadius.small,
      },
      flushed: {
        borderBottom: `4px solid ${touched ? (isError ? color.red : color.green) : color.gray300}`,
      },
    }[kind],
  };
};
