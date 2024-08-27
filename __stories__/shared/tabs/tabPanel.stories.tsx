import ModalLayer from '@/shared/ui/modalLayer';
import Tabs from '@/shared/ui/tabs';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs.TabPanel> = {
  title: 'shared/tabs/tabPanel',
  component: Tabs.TabPanel,
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
    id: {
      description:
        'tabPanel의 id, mapping 된 tab 클릭 시 해당 tabPanel이 열린다.',
    },
    children: {
      description: 'TabPanel 안의 내용',
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
      <Tabs.TabPanel>
        <div
          css={css({
            width: '64px',
            height: '64px',
          })}
        >
          탭 내용
        </div>
      </Tabs.TabPanel>
    );
  },
};
