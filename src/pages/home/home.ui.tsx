import { css } from '@emotion/react';

import { FIRST_LAYER_ZIDENX } from '@/shared/config/constant';

import DnD from '@/shared/ui/dnd';
import OpenBookmarkButton from '@/features/sidebar/openBookmarkButton';

const Home = () => {
  return (
    <div
      css={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: `${FIRST_LAYER_ZIDENX}`,
      })}
    >
      <DnD.Provider>
        <DnD.Boundary width={'360px'} height={'100%'}>
          <DnD.PointerContent />
          <OpenBookmarkButton />
        </DnD.Boundary>
      </DnD.Provider>
    </div>
  );
};

export default Home;
