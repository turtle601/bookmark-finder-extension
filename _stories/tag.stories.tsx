import Tag from '@/shared/ui/tag';
import Text from '@/shared/ui/text';

import { color } from '@/shared/config/styles';

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
    children: (
      <Text
        label="태그"
        type="sm"
        fontWeightType="semibold"
        textColor={color.white}
        etcStyles={{
          fontSize: '12px',
          lineHeight: 0,
        }}
      />
    ),
  },
};

export const SelectedTag: Story = {
  args: {
    isSelected: true,
    children: (
      <Text
        label="태그"
        type="sm"
        fontWeightType="semibold"
        textColor={color.white}
        etcStyles={{
          fontSize: '12px',
          lineHeight: 0,
        }}
      />
    ),
  },
};
