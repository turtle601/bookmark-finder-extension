import { FC } from 'react';

import TabList from '@/shared/ui/tabs/part/tabList/tabList.ui';
import Tab from '@/shared/ui/tabs/part/tab/tab.ui';
import TabPanels from '@/shared/ui/tabs/part/tabPanels/tabPanels.ui';
import TabPanel from '@/shared/ui/tabs/part/tabPanel/tabPanel.ui';
import TabsProvider from '@/shared/ui/tabs/part/provider/provider.ui';

import type { ITabListProps } from '@/shared/ui/tabs/part/tabList/tabList.ui';
import type { ITabProps } from '@/shared/ui/tabs/part/tab/tab.ui';
import type { ITabPanelsProps } from '@/shared/ui/tabs/part/tabPanels/tabPanels.ui';
import type { ITabPanelProps } from '@/shared/ui/tabs/part/tabPanel/tabPanel.ui';
import type { ITabsProviderProps } from '@/shared/ui/tabs/part/provider/provider.ui';

export type ITabs = FC<ITabsProviderProps> & {
  TabList: FC<ITabListProps>;
  Tab: FC<ITabProps>;
  TabPanels: FC<ITabPanelsProps>;
  TabPanel: FC<ITabPanelProps>;
};

const Tabs: ITabs = Object.assign(TabsProvider, {
  TabList,
  Tab,
  TabPanels,
  TabPanel,
});

export default Tabs;
