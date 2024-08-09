import React, { Suspense } from 'react';

import { css } from '@emotion/react';

import { color } from '@/shared/config/styles';

import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';
import BookmarkIcon from '@/shared/config/assets/bookmark.svg';
import SidebarContentWrapper from '@/features/sidebar/sidebarContent';
import SidebarHeader from '@/features/sidebar/sidebarContent/sidebarHeader.ui';
import SidebarSection from '@/features/sidebar/sidebarContent/sidebarSection.ui';

const OpenBookmarkButton: React.FC = () => {
  return (
    <ModalLayer.Opener
      modalType="sidebar"
      modalContent={
        <SidebarContentWrapper>
          <SidebarHeader />
          <Suspense fallback={<></>}>
            <SidebarSection />
          </Suspense>
        </SidebarContentWrapper>
      }
    >
      <DnD.Dragable dragEndType="leftSide">
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
      </DnD.Dragable>
    </ModalLayer.Opener>
  );
};

export default OpenBookmarkButton;
