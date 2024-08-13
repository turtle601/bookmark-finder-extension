import React from 'react';

import PlusIcon from '@/shared/config/assets/+.svg';

import Tabs from '@/shared/ui/tabs';
import Center from '@/shared/ui/center';
import ModalLayer from '@/shared/ui/modalLayer';

import CreateLink from '@/features/bookmark/createLink';
import CreateFolder from '@/features/bookmark/createFolder';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';

interface IOpenCreateBookmarkFormProps {
  folderData: Bookmark;
}

export const OpenCreateBookmarkForm: React.FC<IOpenCreateBookmarkFormProps> = ({
  folderData,
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={
        <SidebarPanelWidget.Wrapper>
          <Tabs>
            <SidebarPanelWidget.Header>
              <Tabs.TabList>
                <Tabs.Tab>새 폴더</Tabs.Tab>
                <Tabs.Tab>새 링크</Tabs.Tab>
              </Tabs.TabList>
            </SidebarPanelWidget.Header>
            <Tabs.TabPanels>
              <Tabs.TabPanel>
                <CreateFolder
                  title={folderData.title}
                  parentId={folderData.id}
                />
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                <CreateLink parentId={folderData.id} />
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs>
        </SidebarPanelWidget.Wrapper>
      }
    >
      <Center
        etcStyles={{
          width: '24px',
          height: '24px',
        }}
      >
        <PlusIcon />
      </Center>
    </ModalLayer.Opener>
  );
};
