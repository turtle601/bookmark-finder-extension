import { css } from '@emotion/react';

import Tabs from '@/shared/ui/tabs';
import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs.Tab> = {
  title: 'shared/tabs/tab',
  component: Tabs.Tab,
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Tabs>
        <div></div>
        <div
          css={css({
            width: '64px',
          })}
        >
          <Story />
        </div>
      </Tabs>
    ),
  ],
  argTypes: {
    id: {
      description: 'tab의 id, 클릭 시 mapping된 tabPanel이 열린다.',
    },
    children: {
      description: 'Tab 안의 내용',
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
    return <Tabs.Tab>새 탭</Tabs.Tab>;
  },
};
