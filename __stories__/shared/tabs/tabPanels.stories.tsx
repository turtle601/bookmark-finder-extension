import ModalLayer from '@/shared/ui/modalLayer';
import Tabs from '@/shared/ui/tabs';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs.TabPanels> = {
  title: 'shared/tabs/tabPanels',
  component: Tabs.TabPanels,
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Tabs>
        <div></div>
        <Story />
      </Tabs>
    ),
  ],
  argTypes: {
    children: {
      description:
        'Tabs.TabPanels의 자식 컴포넌트는 TabPanel 컴포넌트만 들어갈 수 있습니다.',
    },
    etcStyles: {
      description: '그 외 커스텀 스타일',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalLayer.Opener>;

export const Story: Story = {
  render: () => {
    return (
      <Tabs.TabPanels>
        <Tabs.TabPanel>탭 내용1</Tabs.TabPanel>
        <Tabs.TabPanel>탭 내용2</Tabs.TabPanel>
      </Tabs.TabPanels>
    );
  },
};
