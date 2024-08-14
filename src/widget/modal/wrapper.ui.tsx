import React from 'react';
import { css, CSSObject } from '@emotion/react';

import { borderRadius, color, spacer } from '@/shared/config/styles';
import { THIRD_LAYER_ZIDENX } from '@/shared/config/constant';

interface IWrapperProps {
  children: React.ReactNode;
  modalContentStyle?: CSSObject;
}

export type ModalWrapperFC = React.FC<IWrapperProps>;

const Wrapper: ModalWrapperFC = ({ children, modalContentStyle = {} }) => {
  return (
    <div
      css={css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: `${THIRD_LAYER_ZIDENX}`,
      })}
    >
      <div
        css={css({
          width: '600px',
          height: '300px',
          backgroundColor: color.white,
          padding: spacer.spacing3,
          border: `4px solid rgba(66, 66, 66, 0.002)`,
          borderRadius: borderRadius.small,
          boxShadow: `4px 4px 20px rgba(0, 0, 0, 0.8)`,
          ...modalContentStyle,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
