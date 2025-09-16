import Spacer from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    space: '30px',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          padding: '10px',
          background: '#a8e6cf',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        First Item
      </div>
      <Spacer {...args} />
      <div
        style={{
          padding: '10px',
          background: '#ffd3a5',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Second Item
      </div>
      <Spacer {...args} />
      <div
        style={{
          padding: '10px',
          background: '#fd9853',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Third Item
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    space: '40px',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <div
        style={{
          padding: '10px',
          background: '#96ceb4',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Left
      </div>
      <Spacer {...args} />
      <div
        style={{
          padding: '10px',
          background: '#feca57',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Center
      </div>
      <Spacer {...args} />
      <div
        style={{
          padding: '10px',
          background: '#ff9ff3',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Right
      </div>
    </div>
  ),
};
