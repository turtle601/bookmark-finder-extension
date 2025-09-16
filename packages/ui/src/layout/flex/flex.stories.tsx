import Flex from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flexbox direction',
    },
    justify: {
      control: { type: 'select' },
      options: [
        'start',
        'end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Justify content',
    },
    align: {
      control: { type: 'select' },
      options: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Align items',
    },
    gap: {
      control: { type: 'text' },
      description: 'Gap between items',
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Flex',
  },
  render: (args) => (
    <Flex
      {...args}
      etcStyles={{
        width: '300px',
        height: '100px',
        border: '2px solid #ccc',
        padding: '10px',
      }}
    />
  ),
};

export const Row: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    gap: '10px',
  },
  render: (args) => (
    <Flex
      {...args}
      etcStyles={{
        width: '400px',
        height: '80px',
        border: '2px solid #ddd',
        padding: '10px',
      }}
    >
      <div
        style={{
          padding: '8px',
          background: '#ff6b6b',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Item 1
      </div>
      <div
        style={{
          padding: '8px',
          background: '#4ecdc4',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Item 2
      </div>
      <div
        style={{
          padding: '8px',
          background: '#45b7d1',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Item 3
      </div>
    </Flex>
  ),
};

export const Column: Story = {
  args: {
    direction: 'column',
    justify: 'center',
    align: 'center',
    gap: '8px',
  },
  render: (args) => (
    <Flex
      {...args}
      etcStyles={{
        width: '200px',
        height: '200px',
        border: '2px solid #ddd',
        padding: '10px',
      }}
    >
      <div
        style={{
          padding: '8px',
          background: '#96ceb4',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Top Item
      </div>
      <div
        style={{
          padding: '8px',
          background: '#feca57',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Middle Item
      </div>
      <div
        style={{
          padding: '8px',
          background: '#ff9ff3',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        Bottom Item
      </div>
    </Flex>
  ),
};

export const JustifyContent: Story = {
  args: {
    direction: 'row',
    align: 'center',
    gap: '10px',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>space-between</h4>
        <Flex
          {...args}
          justify="space-between"
          etcStyles={{
            width: '300px',
            height: '60px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '8px',
              background: '#a8e6cf',
              borderRadius: '4px',
            }}
          >
            A
          </div>
          <div
            style={{
              padding: '8px',
              background: '#ffd3a5',
              borderRadius: '4px',
            }}
          >
            B
          </div>
          <div
            style={{
              padding: '8px',
              background: '#fd9853',
              borderRadius: '4px',
            }}
          >
            C
          </div>
        </Flex>
      </div>
      <div>
        <h4>space-around</h4>
        <Flex
          {...args}
          justify="space-around"
          etcStyles={{
            width: '300px',
            height: '60px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '8px',
              background: '#a8e6cf',
              borderRadius: '4px',
            }}
          >
            A
          </div>
          <div
            style={{
              padding: '8px',
              background: '#ffd3a5',
              borderRadius: '4px',
            }}
          >
            B
          </div>
          <div
            style={{
              padding: '8px',
              background: '#fd9853',
              borderRadius: '4px',
            }}
          >
            C
          </div>
        </Flex>
      </div>
      <div>
        <h4>center</h4>
        <Flex
          {...args}
          justify="center"
          etcStyles={{
            width: '300px',
            height: '60px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '8px',
              background: '#a8e6cf',
              borderRadius: '4px',
            }}
          >
            A
          </div>
          <div
            style={{
              padding: '8px',
              background: '#ffd3a5',
              borderRadius: '4px',
            }}
          >
            B
          </div>
          <div
            style={{
              padding: '8px',
              background: '#fd9853',
              borderRadius: '4px',
            }}
          >
            C
          </div>
        </Flex>
      </div>
    </div>
  ),
};

export const AlignItems: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    gap: '10px',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>stretch (default)</h4>
        <Flex
          {...args}
          align="stretch"
          etcStyles={{
            width: '300px',
            height: '80px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '4px',
              background: '#ff7675',
              borderRadius: '4px',
            }}
          >
            Short
          </div>
          <div
            style={{
              padding: '12px',
              background: '#74b9ff',
              borderRadius: '4px',
            }}
          >
            Tall Item
          </div>
          <div
            style={{
              padding: '8px',
              background: '#00b894',
              borderRadius: '4px',
            }}
          >
            Medium
          </div>
        </Flex>
      </div>
      <div>
        <h4>center</h4>
        <Flex
          {...args}
          align="center"
          etcStyles={{
            width: '300px',
            height: '80px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '4px',
              background: '#ff7675',
              borderRadius: '4px',
            }}
          >
            Short
          </div>
          <div
            style={{
              padding: '12px',
              background: '#74b9ff',
              borderRadius: '4px',
            }}
          >
            Tall Item
          </div>
          <div
            style={{
              padding: '8px',
              background: '#00b894',
              borderRadius: '4px',
            }}
          >
            Medium
          </div>
        </Flex>
      </div>
      <div>
        <h4>start</h4>
        <Flex
          {...args}
          align="start"
          etcStyles={{
            width: '300px',
            height: '80px',
            border: '2px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              padding: '4px',
              background: '#ff7675',
              borderRadius: '4px',
            }}
          >
            Short
          </div>
          <div
            style={{
              padding: '12px',
              background: '#74b9ff',
              borderRadius: '4px',
            }}
          >
            Tall Item
          </div>
          <div
            style={{
              padding: '8px',
              background: '#00b894',
              borderRadius: '4px',
            }}
          >
            Medium
          </div>
        </Flex>
      </div>
    </div>
  ),
};

export const CustomElement: Story = {
  args: {
    as: 'section',
    direction: 'column',
    justify: 'center',
    align: 'center',
    gap: '15px',
  },
  render: (args) => (
    <Flex
      {...args}
      etcStyles={{
        width: '300px',
        height: '150px',
        border: '2px solid #6c5ce7',
        padding: '20px',
        borderRadius: '8px',
        background: '#f8f9fa',
      }}
    >
      <h3 style={{ margin: 0, color: '#2d3436' }}>Section Title</h3>
      <p style={{ margin: 0, color: '#636e72' }}>This is a section element</p>
      <button
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          background: '#6c5ce7',
          color: 'white',
        }}
      >
        Action Button
      </button>
    </Flex>
  ),
};
