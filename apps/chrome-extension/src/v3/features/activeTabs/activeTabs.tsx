import React, { useRef } from 'react';
import { css, CSSObject } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import { Flex } from 'bookmark-finder-extension-ui';

import { useActiveTabAutoScroll } from '@/v3/entities/activeTabs/autoScroll/useActiveTabAutoScroll';

import ActiveTab from '@/v3/features/activeTabs/activeTab';
import ActiveTabsDropArea from '@/v3/features/activeTabs/activeTabsDropArea';

const useTabItemsRef = () => {
  const tabItemsRef = useRef<{
    [K in number]: HTMLLIElement | null;
  }>({});

  const tabItemRef = (tab: chrome.tabs.Tab) => (el: HTMLLIElement | null) => {
    if (tab.id) {
      tabItemsRef.current[tab.id] = el;
    }
  };

  return { tabItemRef };
};

function ActiveTabs() {
  const { tabItemRef } = useTabItemsRef();
  const { activeTabsRef, tabs } = useActiveTabAutoScroll();

  // 크롬을 켰다는 것 자체가 존재하는 탭이 하나는 무조건 있음 (나중에 작성할 예정)
  if (!tabs) return null;

  return (
    <div ref={activeTabsRef}>
      <div css={css(getTabsWrapperStyle())}>
        <Flex align="center" justify="between" etcStyles={getTabsHeaderStyle()}>
          <span css={css(getTabsHeaderTitleStyle())}>Active Tabs</span>
          <span css={css(getTabsHeaderCountStyle())}>{tabs.length}</span>
        </Flex>
      </div>
      <div css={css(getTabsContentStyle())}>
        <Flex direction="column">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <ActiveTabsDropArea startIdx={index} />
              <ActiveTab tab={tab} tabRef={tabItemRef(tab)} />
            </React.Fragment>
          ))}
          <ActiveTabsDropArea startIdx={tabs.length ?? 0} />
        </Flex>
      </div>
    </div>
  );
}

export default ActiveTabs;

function getTabsWrapperStyle(): CSSObject {
  return { position: 'sticky', top: 0, zIndex: 10 };
}

function getTabsHeaderStyle(): CSSObject {
  return {
    width: '100%',
    height: '28px',
    background: color.slate['50'],
  };
}

function getTabsHeaderTitleStyle(): CSSObject {
  return {
    fontSize: '12px',
    fontWeight: '600',
    color: color.slate['600'],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };
}

function getTabsHeaderCountStyle(): CSSObject {
  return {
    fontSize: '11px',
    color: color.slate['400'],
    background: color.slate['100'],
    padding: '2px 6px',
    borderRadius: '4px',
    marginLeft: '8px',
  };
}

function getTabsContentStyle(): CSSObject {
  return {
    height: '100%',
  };
}
