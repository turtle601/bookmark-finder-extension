import React from 'react';
import { css } from '@emotion/react';

import { SECOND_LAYER_ZIDENX } from '@/shared/config/constant';
import { borderRadius, color } from '@/shared/config/styles';

interface IWrapperProps {
  children: React.ReactNode;
}

export type SidebarWrapperFC = React.FC<IWrapperProps>;

const Wrapper: SidebarWrapperFC = ({ children }) => {
  return (
    <div
      css={css({
        position: 'absolute',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: `${SECOND_LAYER_ZIDENX}`,
      })}
    >
      <div
        css={css({
          width: '360px',
          height: '100vh',
          backgroundColor: color.white,
          borderRadius: `0 ${borderRadius.large} ${borderRadius.large} 0`,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
