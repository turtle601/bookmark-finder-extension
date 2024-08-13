import React from 'react';
import { css } from '@emotion/react';

import { SECOND_LAYER_ZIDENX } from '@/shared/config/constant';
import { borderRadius, color, spacer } from '@/shared/config/styles';

interface IWrapperProps {
  children: React.ReactNode;
}

export type SidebarPanelWrapperFC = React.FC<IWrapperProps>;

const Wrapper: SidebarPanelWrapperFC = ({ children }) => {
  return (
    <div
      css={css({
        position: 'absolute',
        width: '320px',
        top: '100px',
        left: `374px`,
        zIndex: `${SECOND_LAYER_ZIDENX}`,
        backgroundColor: color.white,
        padding: spacer.spacing3,
        borderRadius: borderRadius.small,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
