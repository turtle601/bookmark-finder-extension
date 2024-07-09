import Button from '@/shared/ui/button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const commonButtonStyle = {
  children: 'Button',
  etcStyles: {
    width: '100px',
    height: '50px',
  },
} as const;

export const DefaultButton: Story = {
  args: {
    kind: 'default',
    ...commonButtonStyle,
  },
};

export const ValidButton: Story = {
  args: {
    kind: 'valid',
    ...commonButtonStyle,
  },
};

export const DangerButton: Story = {
  args: {
    kind: 'danger',
    ...commonButtonStyle,
  },
};

export const DisabledButton: Story = {
  args: {
    kind: 'default',
    disabled: true,
    ...commonButtonStyle,
  },
};
