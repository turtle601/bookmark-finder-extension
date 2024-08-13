import React from 'react';

import Tabs from '@/shared/ui/tabs';

import CreateFolder from '@/features/bookmark/createFolder';
import CreateLink from '@/features/bookmark/createLink';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';

interface ICreateBookmarkFormProps {
  folderData: Bookmark;
}

export type CreateBookmarkFormFC = React.FC<ICreateBookmarkFormProps>;

export const CreateBookmarkForm: CreateBookmarkFormFC = ({ folderData }) => {
  return (
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
            <CreateFolder title={folderData.title} parentId={folderData.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <CreateLink parentId={folderData.id} />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </SidebarPanelWidget.Wrapper>
  );
};
