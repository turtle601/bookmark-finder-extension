import { css } from '@emotion/react';
import { FC, ReactElement } from 'react';

import { TabList } from '@/shared/ui/tabs/part/tabList';
import { TabPanels } from '@/shared/ui/tabs/part/tabPanels';
import { useTabs } from '@/shared/ui/tabs/hooks/useTabs';

import { TabsActionContext, TabsContext } from '@/shared/ui/tabs/model';

export interface ITabsProviderProps {
  children: (ReactElement<typeof TabList> | ReactElement<typeof TabPanels>)[];
}

const TabsProvider: FC<ITabsProviderProps> = ({ children }) => {
  const { selectedId, selectTab } = useTabs();

  return (
    <TabsContext.Provider value={{ selectedId }}>
      <TabsActionContext.Provider value={{ selectTab }}>
        <div
          css={css({
            position: 'relative',
          })}
        >
          {children}
        </div>
      </TabsActionContext.Provider>
    </TabsContext.Provider>
  );
};

export default TabsProvider;
