import {
  FIRST_LAYER_ZIDENX,
  SECOND_LAYER_ZIDENX,
  THIRD_LAYER_ZIDENX,
} from '@/shared/config/constant';

import type { CSSObject } from '@emotion/react';

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

export const getSidebarWrapperStyle = (): CSSObject => {
  return {
    position: 'absolute',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: `${THIRD_LAYER_ZIDENX}`,
  };
};

export const getModalWrapperStyle = (): CSSObject => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: `${THIRD_LAYER_ZIDENX}`,
    padding: '20px',
  };
};

/* Rectangle 692 */

// position: absolute;
// width: 637px;
// height: 313px;

// background: #F0F0F0;
// border: 4px solid rgba(66, 66, 66, 0.002);
// box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.8);
// border-radius: 12px;
