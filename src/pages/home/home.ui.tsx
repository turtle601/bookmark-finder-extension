import React from 'react';

import { css } from '@emotion/react';

import { color } from '@/shared/config/styles';
import { FIRST_LAYER_ZIDENX } from '@/shared/config/constant';

import BookmarkIcon from '@/shared/config/assets/bookmark.svg';
import DnD from '@/shared/ui/dnd';

import { OpenSidebarDefault } from '@/app/modal-router';

const Home: React.FC = () => {
  return (
    <div
      css={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: `${FIRST_LAYER_ZIDENX}`,
        pointerEvents: 'none',
      })}
    >
      <DnD.Provider>
        <DnD.Boundary width={'360px'} height={'100vh'}>
          <DnD.PointerContent />
          <OpenSidebarDefault
            etcStyles={{
              pointerEvents: 'auto',
            }}
          >
            <DnD.Draggable isMoved>
              {({ isDrag }) => {
                return (
                  <div
                    css={css({
                      display: 'flex',
                      opacity: isDrag ? 0 : 1,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      width: '64px',
                      height: '40px',
                      backgroundColor: color.gray,
                      borderRadius: '0 4px 4px 0',
                      padding: '10px',
                    })}
                  >
                    <BookmarkIcon />
                  </div>
                );
              }}
            </DnD.Draggable>
          </OpenSidebarDefault>
        </DnD.Boundary>
      </DnD.Provider>
    </div>
  );
};

export default Home;
