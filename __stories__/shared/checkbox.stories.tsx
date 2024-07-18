import Checkbox from '@/shared/ui/checkbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
  title: 'shared/Checkbox',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div>
      <Checkbox />
    </div>
  ),
};
