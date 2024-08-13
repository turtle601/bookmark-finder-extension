import { color } from '@/shared/config/styles';

import Text from '@/shared/ui/text';

import UpdateLink from '@/features/bookmark/updateLink';

import SidebarPanelWidget from '@/widget/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';

interface IUpdateFolderFormProps {
  bookmark: Bookmark;
}

export type UpdateLinkFormFC = React.FC<IUpdateFolderFormProps>;

export const UpdateLinkForm: UpdateLinkFormFC = ({ bookmark }) => {
  return (
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
  );
};
