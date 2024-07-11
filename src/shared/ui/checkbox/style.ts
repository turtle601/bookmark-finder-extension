import { CSSObject } from '@emotion/react';

export const getCheckboxWrapperStyle = (): CSSObject => {
  return {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    boxShadow: '4px 4px 4px rgba(0 0 0 / 25%)',
  };
};
