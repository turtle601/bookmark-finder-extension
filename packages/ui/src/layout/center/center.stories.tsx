import Center from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Centered Content',
  },
  render: (args) => (
    <Center
      {...args}
      etcStyles={{
        width: '200px',
        height: '200px',
        border: '4px solid #000',
      }}
    />
  ),
};
