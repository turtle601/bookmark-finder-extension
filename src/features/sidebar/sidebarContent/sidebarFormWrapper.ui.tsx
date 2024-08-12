import React from 'react';
import { css } from '@emotion/react';

import { borderRadius, color, spacer } from '@/shared/config/styles';
import { SECOND_LAYER_ZIDENX } from '@/shared/config/constant';

interface ISidebarFormWrapperProps {
  children: React.ReactNode;
}

const SidebarFormWrapper: React.FC<ISidebarFormWrapperProps> = ({
  children,
}) => {
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

export default SidebarFormWrapper;
