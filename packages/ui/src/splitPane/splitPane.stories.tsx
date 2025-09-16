import SplitPane from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SplitPane> = {
  title: 'SplitPane',
  component: SplitPane,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: '400px',
    split: 'horizontal',
    initialResizerPosition: '50%',
    resizer: (
      <div
        style={{
          width: '14px',
          height: '100%',
          backgroundColor: '#6c757d',
          cursor: 'ew-resize',
        }}
      />
    ),
    pane1: (
      <div
        style={{
          padding: '20px',
          background: '#f8f9fa',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #dee2e6',
        }}
      >
        <h3 style={{ margin: 0, color: '#495057' }}>Left Pane</h3>
      </div>
    ),
    pane2: (
      <div
        style={{
          padding: '20px',
          background: '#e9ecef',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #dee2e6',
        }}
      >
        <h3 style={{ margin: 0, color: '#495057' }}>Right Pane</h3>
      </div>
    ),
  },
};

export const Vertical: Story = {
  args: {
    width: '100%',
    height: '400px',
    split: 'vertical',
    initialResizerPosition: '60%',
    resizer: (
      <div
        style={{
          width: '100%',
          height: '14px',
          backgroundColor: '#6c757d',
          cursor: 'ns-resize',
        }}
      />
    ),
    pane1: (
      <div
        style={{
          padding: '20px',
          background: '#d1ecf1',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #bee5eb',
        }}
      >
        <h3 style={{ margin: 0, color: '#0c5460' }}>Top Pane</h3>
      </div>
    ),
    pane2: (
      <div
        style={{
          padding: '20px',
          background: '#f8d7da',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f5c6cb',
        }}
      >
        <h3 style={{ margin: 0, color: '#721c24' }}>Bottom Pane</h3>
      </div>
    ),
  },
};
