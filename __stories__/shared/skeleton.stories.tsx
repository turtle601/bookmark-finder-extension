import SkeletonTag from '@/shared/ui/skeleton/skeletonTag';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SkeletonTag> = {
  component: SkeletonTag,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonTag>;

export const Default: Story = {
  args: {},
};
