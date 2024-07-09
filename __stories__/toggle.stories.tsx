import Toggle from '@/shared/ui/toggle';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggle> = {
  title: 'shared/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    externalAction: (isChecked) => {
      const ment = isChecked ? '토글 켜기' : '토글 끄기';
      console.log(ment);
    },
  },
};
