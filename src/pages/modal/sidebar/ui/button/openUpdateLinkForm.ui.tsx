import React from 'react';

import UpdateIcon from '@/shared/config/assets/update.svg';

import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import ModalLayer from '@/shared/ui/modalLayer';
import UpdateLink from '@/features/bookmark/updateLink';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import { color } from '@/shared/config/styles';

import type { Bookmark } from '@/entities/bookmark';

interface IOpenUpdateLinkFormProps {
  bookmark: Bookmark;
}

export const OpenUpdateLinkForm: React.FC<IOpenUpdateLinkFormProps> = ({
  bookmark,
}) => {
  const handleOpenUpdateLinkForm = (e?: React.MouseEvent) => {
    e?.stopPropagation();
  };

  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={
        <SidebarPanelWidget.Wrapper>
          <SidebarPanelWidget.Header>
            <Text
              label={`링크 수정하기`}
              type={'sm'}
              etcStyles={{
                padding: '4px 12px',
                color: color.green,
                borderBottom: `1px solid ${color.green}`,
              }}
            />
          </SidebarPanelWidget.Header>
          <UpdateLink
            id={bookmark.id}
            parentId={bookmark.parentId as string}
            title={bookmark.title}
            url={bookmark.url as string}
          />
        </SidebarPanelWidget.Wrapper>
      }
      externalAction={handleOpenUpdateLinkForm}
    >
      <Center
        etcStyles={{
          width: '24px',
          height: '24px',
        }}
      >
        <UpdateIcon />
      </Center>
    </ModalLayer.Opener>
  );
};
