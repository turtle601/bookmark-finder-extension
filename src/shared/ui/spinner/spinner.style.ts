import { color } from '@/shared/config/styles';
import { keyframes } from '@emotion/react';

import type { CSSObject, Keyframes } from '@emotion/react';

export const rotation: Keyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const getSpinnerStyle = (): CSSObject => {
  return {
    display: 'inline-block',
    width: '48px',
    height: '48px',
    border: `5px solid ${color.gray200}`,
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: `${rotation} 1s linear infinite`,
  };
};
