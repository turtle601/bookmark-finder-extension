import React from 'react';

import UpdateIcon from '@/shared/config/assets/update.svg';

import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import ModalLayer from '@/shared/ui/modalLayer';

import UpdateFolder from '@/features/bookmark/updateFolder';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import { color } from '@/shared/config/styles';

import type { Bookmark } from '@/entities/bookmark';

interface IOpenUpdateFolderFormProps {
  folderData: Bookmark;
}

export const OpenUpdateFolderForm: React.FC<IOpenUpdateFolderFormProps> = ({
  folderData,
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={
        <SidebarPanelWidget.Wrapper>
          <SidebarPanelWidget.Header>
            <Text
              label={`${folderData.title} 폴더 수정하기`}
              type={'sm'}
              etcStyles={{
                padding: '4px 12px',
                color: color.green,
                borderBottom: `1px solid ${color.green}`,
              }}
            />
          </SidebarPanelWidget.Header>
          <UpdateFolder
            id={folderData.id}
            parentId={folderData.parentId as string}
            title={folderData.title}
          />
        </SidebarPanelWidget.Wrapper>
      }
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
