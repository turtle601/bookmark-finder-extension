import { color } from '@/shared/config/styles';

import Text from '@/shared/ui/text';

import UpdateFolder from '@/features/bookmark/updateFolder';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';

interface IUpdateFolderFormProps {
  folderData: Bookmark;
}

export type UpdateFolderFormFC = React.FC<IUpdateFolderFormProps>;

export const UpdateFolderForm: UpdateFolderFormFC = ({ folderData }) => {
  return (
    <SidebarPanelWidget.Wrapper>
      <SidebarPanelWidget.Header>
        <Text
          label={`폴더 수정하기`}
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
  );
};
