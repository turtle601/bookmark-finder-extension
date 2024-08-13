import React from 'react';
import { css, CSSObject } from '@emotion/react';

import { color } from '@/shared/config/styles';
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
          width: '640px',
          height: '320px',
          backgroundColor: color.white,
          ...modalContentStyle,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
