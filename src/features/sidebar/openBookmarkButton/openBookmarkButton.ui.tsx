import React from 'react';

import { css } from '@emotion/react';

import { color } from '@/shared/config/styles';

import DnD from '@/shared/ui/dnd';
import ModalLayer from '@/shared/ui/modalLayer';
import BookmarkIcon from '@/shared/config/assets/bookmark.svg';
import SidebarContentWrapper from '@/features/sidebar/sidebarContent';

const OpenBookmarkButton: React.FC = () => {
  return (
    <ModalLayer.Opener
      modalType="sidebar"
      modalContent={
        <SidebarContentWrapper>사이드바 내용입니다.</SidebarContentWrapper>
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
