import Accordion from '@/shared/ui/accordion';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion.Button> = {
  title: 'shared/Accordion/Button',
  component: Accordion.Button,
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Accordion.Provider>
        <Story />
      </Accordion.Provider>
    ),
  ],
  argTypes: {
    id: {
      description:
        'Accordian.Button의 id, mapping된 Accordian.Panel을 열고 닫을 수 있다.',
    },
    children: {
      description: 'Accordian.Button 안의 내용',
    },
    etcStyles: {
      description: '그 외 커스텀 스타일',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion.Button>;

export const Story: Story = {
  render: () => {
    return <Accordion.Button id="1">아코디언 버튼</Accordion.Button>;
  },
};
