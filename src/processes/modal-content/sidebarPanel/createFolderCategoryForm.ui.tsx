import { color, spacer } from '@/shared/config/styles';

import Text from '@/shared/ui/text';

import CategoryForm from '@/features/autoCategorization/categoryForm';

import SidebarPanelWidget from '@/widget/sidebarPanel';
import Spacer from '@/shared/ui/spacer';

export type CreateFolderCategoryFormFC = React.FC;

export const CreateFolderCategoryForm: CreateFolderCategoryFormFC = () => {
  return (
    <SidebarPanelWidget.Wrapper>
      <SidebarPanelWidget.Header>
        <Text
          label={`AI로 분류하고 싶은 폴더명을 입력하세요`}
          type={'sm'}
          etcStyles={{
            padding: '4px 12px',
            color: color.green,
            borderBottom: `1px solid ${color.green}`,
          }}
        />
      </SidebarPanelWidget.Header>
      <Spacer direction="vertical" space={spacer.spacing3} />
      <CategoryForm />
    </SidebarPanelWidget.Wrapper>
  );
};
