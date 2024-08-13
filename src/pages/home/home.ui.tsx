import React from 'react';

import { css } from '@emotion/react';

import { FIRST_LAYER_ZIDENX } from '@/shared/config/constant';

import DnD from '@/shared/ui/dnd';

import { OpenSidebar } from './ui';

const Home: React.FC = () => {
  return (
    <div
      css={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: `${FIRST_LAYER_ZIDENX}`,
        pointerEvents: 'none',
      })}
    >
      <DnD.Provider>
        <DnD.Boundary width={'360px'} height={'100vh'}>
          <DnD.PointerContent />
          <OpenSidebar />
        </DnD.Boundary>
      </DnD.Provider>
    </div>
  );
};

export default Home;
