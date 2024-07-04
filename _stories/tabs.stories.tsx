import Tabs from '@/shared/ui/tabs';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {
  title: 'shared/Tabs',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => {
    return (
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab>one</Tabs.Tab>
          <Tabs.Tab>two</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>one</Tabs.TabPanel>
          <Tabs.TabPanel>two</Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    );
  },
};
