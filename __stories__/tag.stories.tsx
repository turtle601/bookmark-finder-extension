import Tag from '@/shared/ui/tag';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'shared/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: '태그',
  },
};
