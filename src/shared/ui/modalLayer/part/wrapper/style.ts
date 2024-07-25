import type { CSSObject } from '@emotion/react';

import {
  FIRST_LAYER_ZIDENX,
  SECOND_LAYER_ZIDENX,
} from '@/shared/config/constant';

export const getScreenWrapperStyle = (): CSSObject => {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: `${FIRST_LAYER_ZIDENX}`,
  };
};

export const getScreenOverlayStyle = (): CSSObject => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: `rgba(0, 0, 0, 0.3)`,
    zIndex: `${SECOND_LAYER_ZIDENX}`,
  };
};
