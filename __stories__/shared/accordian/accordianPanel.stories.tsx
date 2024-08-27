import Accordion from '@/shared/ui/accordion';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion.Panel> = {
  title: 'shared/Accordion/Panel',
  component: Accordion.Panel,
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
        'Accordian.Panel의 id, mapping 된 Accordian.Button 클릭 시 해당 Panel이 열린다.',
    },
    children: {
      description: 'Accordian.Panel 안의 내용',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion.Button>;

export const Story: Story = {
  render: () => {
    return <Accordion.Panel id="1">아코디언 패널</Accordion.Panel>;
  },
};
