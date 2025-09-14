import React from 'react';

import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import Flex from '@/v3/shared/ui/layout/flex';

import { useTabsQuery } from '@/v3/entities/chromeTab/request';
import { useActiveTabListener } from '@/v3/entities/chromeTab/listener';

import ActiveTab from '@/v3/features/search/chromeTab/activeTab';
import ChromeTabDropArea from '@/v3/features/search/chromeTab/chromeTabDropArea';

function ActiveTabs() {
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

  return (
    <div ref={activeTabsRef}>
      <div
        css={css({
          position: 'sticky',
          top: 0,
          zIndex: 10,
        })}
      >
        <Flex
          align="center"
          justify="between"
          etcStyles={{
            width: '100%',
            height: '28px',
            background: color.slate['50'],
          }}
        >
          <span
            css={css({
              fontSize: '12px',
              fontWeight: '600',
              color: color.slate['600'],
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            })}
          >
            Active Tabs
          </span>
          <span
            css={css({
              fontSize: '11px',
              color: color.slate['400'],
              background: color.slate['100'],
              padding: '2px 6px',
              borderRadius: '4px',
              marginLeft: '8px',
            })}
          >
            {data?.tabs.length}
          </span>
        </Flex>
      </div>
      <div
        css={css({
          height: '100%',
        })}
      >
        <Flex direction="column">
          {data?.tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <ChromeTabDropArea startIdx={index} />
              <ActiveTab
                tab={tab}
                tabRef={(el) => {
                  if (tab.id) {
                    tabItemsRef.current[tab.id] = el;
                  }
                }}
              />
            </React.Fragment>
          ))}
          <ChromeTabDropArea startIdx={data?.tabs.length ?? 0} />
        </Flex>
      </div>
    </div>
  );
}

export default ActiveTabs;
