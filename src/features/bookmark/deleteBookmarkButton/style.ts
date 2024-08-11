import { keyframes } from '@emotion/react';

import type { CSSObject, Keyframes } from '@emotion/react';

export const closeTrashAnimation: Keyframes = keyframes`
  0% {
    transform: rotateX(-180deg);
    background-color: #E0E0E0;
  }
  100% {
    transform: rotateX(0);
    background-color: #E53935;
  }
`;

export const openTrashAnimation: Keyframes = keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-180deg);
    background-color: #E0E0E0;
  }
`;

export const getButtonAnimationStyle = (
  keyframe: Keyframes,
  timer: number,
): CSSObject => {
  return {
    animation: `${keyframe} ${timer}s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
  };
};
