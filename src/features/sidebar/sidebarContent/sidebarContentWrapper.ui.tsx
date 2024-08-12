import React from 'react';
import { css } from '@emotion/react';

import DnD from '@/shared/ui/dnd';
import Accordion from '@/shared/ui/accordion';

import { SECOND_LAYER_ZIDENX } from '@/shared/config/constant';
import { borderRadius, color } from '@/shared/config/styles';

interface ISidebarContentWrapperProps {
  children: React.ReactNode;
}

const SidebarContentWrapper: React.FC<ISidebarContentWrapperProps> = ({
  children,
}) => {
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
      <DnD.Provider>
        <DnD.Boundary width={'360px'} height={'100vh'}>
          <DnD.PointerContent
            customStyle={() => {
              return {
                maxWidth: '240px',
                minWidth: '200px',
                border: `1px solid ${color.gray300}`,
                boxShadow: `0px 3px 4px rgba(116, 116, 116, 0.3)`,
              };
            }}
          />
          <div
            css={css({
              width: '360px',
              height: '100vh',
              backgroundColor: color.white,
              borderRadius: `0 ${borderRadius.large} ${borderRadius.large} 0`,
            })}
          >
            <Accordion.Provider>{children}</Accordion.Provider>
          </div>
        </DnD.Boundary>
      </DnD.Provider>
    </div>
  );
};

export default SidebarContentWrapper;
