import Tabs from '@/shared/ui/tabs';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Example: Story = {
  render: () => {
    return (
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab>Tab 3</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>탭 내용 1</Tabs.TabPanel>
          <Tabs.TabPanel>탭 내용 2</Tabs.TabPanel>
          <Tabs.TabPanel>탭 내용 3</Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    );
  },
};
