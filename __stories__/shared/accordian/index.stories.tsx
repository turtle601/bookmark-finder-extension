import Text from '@/shared/ui/text';
import Accordion from '@/shared/ui/accordion';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
  // title: 'shared/Accordion',
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Example: Story = {
  render: () => {
    return (
      <Accordion.Provider>
        <Accordion.Button id={'1'}>
          <Accordion.Icon id={'1'} size={12} strokeWidth="12" />
          <Text label={'아코디언 스타일'} />
        </Accordion.Button>
        <Accordion.Panel id={'1'}>이거는 아코디언 패널 내용</Accordion.Panel>
      </Accordion.Provider>
    );
  },
};
