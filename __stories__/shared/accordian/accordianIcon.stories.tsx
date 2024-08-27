import Accordion from '@/shared/ui/accordion';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion.Icon> = {
  title: 'shared/Accordion/Icon',
  component: Accordion.Icon,
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
      description: 'Accordian.Button의 id와 같은 id 값을 할당해야 합니다.',
    },
    size: {
      description: 'Accordian.Icon ">"의 크기를 나타냅니다.',
    },
    color: {
      description: 'Accordian.Icon ">"의 색상을 나타냅니다.',
    },
    strokeWidth: {
      description: 'Accordian.Icon ">"의 선 굵기를 나타냅니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion.Button>;

export const Story: Story = {
  render: () => {
    return <Accordion.Icon id="1" size={12} strokeWidth="12" />;
  },
};
