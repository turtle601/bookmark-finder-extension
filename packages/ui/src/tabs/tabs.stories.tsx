import { Tabs } from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs.Provider> = {
  title: 'Tabs',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs.Provider>
      <Tabs.TabList
        etcStyles={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          borderBottom: '1px solid #dee2e6',
        }}
      >
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '12px 24px',
            cursor: 'pointer',
            borderBottom: isSelected
              ? '2px solid #007bff'
              : '2px solid transparent',
            color: isSelected ? '#007bff' : '#6c757d',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          Home
        </Tabs.Tab>
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '12px 24px',
            cursor: 'pointer',
            borderBottom: isSelected
              ? '2px solid #007bff'
              : '2px solid transparent',
            color: isSelected ? '#007bff' : '#6c757d',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          About
        </Tabs.Tab>
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '12px 24px',
            cursor: 'pointer',
            borderBottom: isSelected
              ? '2px solid #007bff'
              : '2px solid transparent',
            color: isSelected ? '#007bff' : '#6c757d',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          Contact
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.TabPanels
        etcStyles={{
          padding: '20px',
          minHeight: '200px',
        }}
      >
        <Tabs.TabPanel
          etcStyles={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>
            Home Content
          </h3>
          <p style={{ margin: 0, color: '#6c757d', lineHeight: '1.6' }}>
            Welcome to the home page! This is the default tab content.
          </p>
        </Tabs.TabPanel>

        <Tabs.TabPanel
          etcStyles={{
            background: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #bbdefb',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>
            About Content
          </h3>
          <p style={{ margin: 0, color: '#1976d2', lineHeight: '1.6' }}>
            Learn more about us. This is the about page content.
          </p>
        </Tabs.TabPanel>

        <Tabs.TabPanel
          etcStyles={{
            background: '#f3e5f5',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e1bee7',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#7b1fa2' }}>
            Contact Content
          </h3>
          <p style={{ margin: 0, color: '#8e24aa', lineHeight: '1.6' }}>
            Get in touch with us. This is the contact page content.
          </p>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs.Provider>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs.Provider>
      <Tabs.TabList
        etcStyles={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '8px',
        }}
      >
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '20px',
            backgroundColor: isSelected ? '#007bff' : '#e9ecef',
            color: isSelected ? '#fff' : '#495057',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          Dashboard
        </Tabs.Tab>
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '20px',
            backgroundColor: isSelected ? '#28a745' : '#e9ecef',
            color: isSelected ? '#fff' : '#495057',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          Analytics
        </Tabs.Tab>
        <Tabs.Tab
          etcStyles={(isSelected) => ({
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '20px',
            backgroundColor: isSelected ? '#dc3545' : '#e9ecef',
            color: isSelected ? '#fff' : '#495057',
            fontWeight: isSelected ? '600' : '400',
            transition: 'all 0.2s ease',
          })}
        >
          Settings
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.TabPanels
        etcStyles={{
          padding: '20px',
          minHeight: '200px',
        }}
      >
        <Tabs.TabPanel
          etcStyles={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>Dashboard</h3>
          <p style={{ margin: 0, color: '#6c757d', lineHeight: '1.6' }}>
            View your dashboard with key metrics and insights.
          </p>
        </Tabs.TabPanel>

        <Tabs.TabPanel
          etcStyles={{
            background: '#d4edda',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#155724' }}>Analytics</h3>
          <p style={{ margin: 0, color: '#155724', lineHeight: '1.6' }}>
            Analyze your data with detailed charts and reports.
          </p>
        </Tabs.TabPanel>

        <Tabs.TabPanel
          etcStyles={{
            background: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #f5c6cb',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#721c24' }}>Settings</h3>
          <p style={{ margin: 0, color: '#721c24', lineHeight: '1.6' }}>
            Configure your application settings and preferences.
          </p>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs.Provider>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs.Provider>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Tabs.TabList
          etcStyles={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexDirection: 'column',
            minWidth: '200px',
          }}
        >
          <Tabs.Tab
            etcStyles={(isSelected) => ({
              padding: '12px 16px',
              cursor: 'pointer',
              borderLeft: isSelected
                ? '3px solid #007bff'
                : '3px solid transparent',
              backgroundColor: isSelected ? '#f8f9fa' : 'transparent',
              color: isSelected ? '#007bff' : '#6c757d',
              fontWeight: isSelected ? '600' : '400',
              transition: 'all 0.2s ease',
            })}
          >
            Profile
          </Tabs.Tab>
          <Tabs.Tab
            etcStyles={(isSelected) => ({
              padding: '12px 16px',
              cursor: 'pointer',
              borderLeft: isSelected
                ? '3px solid #007bff'
                : '3px solid transparent',
              backgroundColor: isSelected ? '#f8f9fa' : 'transparent',
              color: isSelected ? '#007bff' : '#6c757d',
              fontWeight: isSelected ? '600' : '400',
              transition: 'all 0.2s ease',
            })}
          >
            Account
          </Tabs.Tab>
          <Tabs.Tab
            etcStyles={(isSelected) => ({
              padding: '12px 16px',
              cursor: 'pointer',
              borderLeft: isSelected
                ? '3px solid #007bff'
                : '3px solid transparent',
              backgroundColor: isSelected ? '#f8f9fa' : 'transparent',
              color: isSelected ? '#007bff' : '#6c757d',
              fontWeight: isSelected ? '600' : '400',
              transition: 'all 0.2s ease',
            })}
          >
            Security
          </Tabs.Tab>
        </Tabs.TabList>

        <Tabs.TabPanels
          etcStyles={{
            flex: 1,
            minHeight: '300px',
          }}
        >
          <Tabs.TabPanel
            etcStyles={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>
              Profile Settings
            </h3>
            <p style={{ margin: 0, color: '#6c757d', lineHeight: '1.6' }}>
              Manage your profile information and personal details.
            </p>
          </Tabs.TabPanel>

          <Tabs.TabPanel
            etcStyles={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bbdefb',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>
              Account Settings
            </h3>
            <p style={{ margin: 0, color: '#1976d2', lineHeight: '1.6' }}>
              Configure your account preferences and billing information.
            </p>
          </Tabs.TabPanel>

          <Tabs.TabPanel
            etcStyles={{
              background: '#fff3cd',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#856404' }}>
              Security Settings
            </h3>
            <p style={{ margin: 0, color: '#856404', lineHeight: '1.6' }}>
              Update your password and manage security settings.
            </p>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </div>
    </Tabs.Provider>
  ),
};
