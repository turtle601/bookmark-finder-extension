import { useEffect, useRef } from 'react';

import { useActiveTabListener } from '@/v3/entities/activeTabs/listener';
import { useTabsQuery } from '@/v3/entities/activeTabs/request';

export const useActiveTabAutoScroll = () => {
  const { activeTabsRef } = useActiveTabListener();

  const tabItemsRef = useRef<{
    [K in number]: HTMLLIElement | null;
  }>({});

  const { data } = useTabsQuery();

  const scrollTo = (key: number) => {
    tabItemsRef.current[key]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const activeTab = data?.tabs.find((tab) => tab.active);

    if (activeTab) {
      scrollTo(activeTab.id!);
    }
  }, [data?.tabs]);

  return {
    tabs: data?.tabs,
    activeTabsRef,
  };
};
