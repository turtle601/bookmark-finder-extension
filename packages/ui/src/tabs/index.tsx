import React from 'react';
import { css, CSSObject } from '@emotion/react';

import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  Context,
  createContext,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

import Flex from '@/layout/flex';

interface ITabsContextProps {
  selectedId: string;
  selectTab: (id: string) => void;
}

const TabsContext: Context<ITabsContextProps | null> =
  createContext<ITabsContextProps | null>(null);

const useTabsContext = () => {
  const state = useContext(TabsContext);
  if (state === null) throw new Error('Cannot find TabsContext');
  return state;
};

const useTabs = () => {
  const [selectedId, setSelectedId] = useState('0');

  const selectTab = (id: string) => {
    setSelectedId(id);
  };

  return {
    selectedId,
    selectTab,
  };
};

interface ITabsProviderProps {
  children: React.ReactNode;
}

const TabsProvider: FC<ITabsProviderProps> = ({ children }) => {
  const { selectedId, selectTab } = useTabs();

  return (
    <TabsContext.Provider value={{ selectedId, selectTab }}>
      {children}
    </TabsContext.Provider>
  );
};

interface ITabProps extends ComponentPropsWithoutRef<'li'> {
  etcStyles?: (isSelected: boolean) => CSSObject;
  children: ReactNode;
}

const Tab: FC<ITabProps> = ({ id, children, etcStyles }) => {
  const { selectedId, selectTab } = useTabsContext();

  const handleSelectTab = () => {
    if (id) {
      selectTab(id);
      return;
    }
  };

  return (
    <li
      onClick={handleSelectTab}
      css={css({ ...etcStyles?.(selectedId === id) })}
    >
      {children}
    </li>
  );
};

const allocateTabIdxForChildren = (children: ReactElement<typeof Tab>[]) => {
  return Children.map(children, (child, idx) => {
    if (child.type !== Tab) {
      throw new Error(`자식 요소에는 탭 컴포넌트만 올 수 있습니다.`);
    }
    if (!isValidElement<{ id: string }>(child)) return child;

    return cloneElement(child, {
      id: `${idx}`,
    });
  });
};

interface ITabListProps extends ComponentPropsWithoutRef<'ul'> {
  etcStyles?: CSSObject;
  children: ReactElement<typeof Tab>[];
}

const TabList: FC<ITabListProps> = ({ etcStyles = {}, children }) => {
  return (
    <Flex
      as="ul"
      css={css({
        ...etcStyles,
      })}
    >
      {allocateTabIdxForChildren(children)}
    </Flex>
  );
};

interface ITabPanelProps extends ComponentPropsWithoutRef<'div'> {
  etcStyles?: CSSObject;
  children: React.ReactNode;
}

const TabPanel: FC<ITabPanelProps> = ({ id, etcStyles = {}, children }) => {
  const { selectedId } = useTabsContext();

  const isSelected = id === selectedId;

  return (
    isSelected && (
      <div
        css={css({
          ...etcStyles,
        })}
      >
        {children}
      </div>
    )
  );
};

const allocateTabPanelIdxForChildren = (
  children: ReactElement<typeof TabPanel>[],
) => {
  return Children.map(children, (child, idx) => {
    if (child.type !== TabPanel) {
      throw new Error(`자식 요소에는 탭 패널 컴포넌트만 올 수 있습니다.`);
    }
    if (!isValidElement<{ id: string }>(child)) return child;

    return cloneElement(child, {
      id: `${idx}`,
    });
  });
};

interface ITabPanelsProps extends ComponentPropsWithoutRef<'div'> {
  etcStyles?: CSSObject;
  children: ReactElement<typeof TabPanel>[];
}

const TabPanels: FC<ITabPanelsProps> = ({ etcStyles = {}, children }) => {
  return (
    <div
      css={css({
        ...etcStyles,
      })}
    >
      {allocateTabPanelIdxForChildren(children)}
    </div>
  );
};

export const Tabs = {
  Provider: TabsProvider,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} as const;
