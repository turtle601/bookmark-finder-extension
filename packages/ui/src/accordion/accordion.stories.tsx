import { Accordion } from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion.Provider> = {
  title: 'Accordion',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion.Provider>
      <div style={{ maxWidth: '600px' }}>
        <div
          style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Accordion.Button
            id="1"
            etcStyles={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderBottom: '1px solid #dee2e6',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#e9ecef',
              },
            }}
          >
            <span>What is React?</span>
            <Accordion.Icon id="1" size={16} color="#6c757d" />
          </Accordion.Button>

          <Accordion.Panel id="1">
            <div
              style={{
                padding: '20px',
                backgroundColor: 'white',
                borderBottom: '1px solid #dee2e6',
              }}
            >
              <p style={{ margin: 0, lineHeight: '1.6', color: '#495057' }}>
                React is a JavaScript library for building user interfaces,
                particularly web applications. It was created by Facebook and is
                now maintained by Meta and the community.
              </p>
            </div>
          </Accordion.Panel>

          <Accordion.Button
            id="2"
            etcStyles={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderBottom: '1px solid #dee2e6',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#e9ecef',
              },
            }}
          >
            <span>How do I get started with React?</span>
            <Accordion.Icon id="2" size={16} color="#6c757d" />
          </Accordion.Button>

          <Accordion.Panel id="2">
            <div
              style={{
                padding: '20px',
                backgroundColor: 'white',
                borderBottom: '1px solid #dee2e6',
              }}
            >
              <p style={{ margin: 0, lineHeight: '1.6', color: '#495057' }}>
                To get started with React, you can use Create React App, which
                sets up a new React project with all the necessary dependencies
                and build tools. You can also use Vite or other build tools for
                faster development.
              </p>
            </div>
          </Accordion.Panel>

          <Accordion.Button
            id="3"
            etcStyles={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#495057',
              '&:hover': {
                backgroundColor: '#e9ecef',
              },
            }}
          >
            <span>What are React hooks?</span>
            <Accordion.Icon id="3" size={16} color="#6c757d" />
          </Accordion.Button>

          <Accordion.Panel id="3">
            <div
              style={{
                padding: '20px',
                backgroundColor: 'white',
              }}
            >
              <p style={{ margin: 0, lineHeight: '1.6', color: '#495057' }}>
                React hooks are functions that let you use state and other React
                features in functional components. They were introduced in React
                16.8 and include useState, useEffect, useContext, and many
                others.
              </p>
            </div>
          </Accordion.Panel>
        </div>
      </div>
    </Accordion.Provider>
  ),
};
