import { DropDown } from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DropDown.Provider> = {
  title: 'Dropdown',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropDown.Provider>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <DropDown.Trigger
          etcStyles={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Options
          <span>▼</span>
        </DropDown.Trigger>

        <DropDown.Options
          etcStyles={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            listStyle: 'none',
            padding: '4px 0',
            margin: 0,
            minWidth: '150px',
          }}
        >
          <DropDown.Option
            etcStyles={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
            }}
            onClick={() => console.log('Option 1 clicked')}
          >
            Option 1
          </DropDown.Option>
          <DropDown.Option
            etcStyles={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
            }}
            onClick={() => console.log('Option 2 clicked')}
          >
            Option 2
          </DropDown.Option>
          <DropDown.Option
            etcStyles={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
            }}
            onClick={() => console.log('Option 3 clicked')}
          >
            Option 3
          </DropDown.Option>
        </DropDown.Options>
      </div>
    </DropDown.Provider>
  ),
};
