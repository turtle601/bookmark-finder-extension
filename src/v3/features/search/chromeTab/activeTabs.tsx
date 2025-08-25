import React from 'react';

import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import Flex from '@/v3/shared/ui/layout/flex';
import Spacer from '@/v3/shared/ui/layout/spacer';

import {
  useMoveTabMutation,
  useTabsQuery,
} from '@/v3/entities/chromeTab/request';
import { useActiveTabListener } from '@/v3/entities/chromeTab/listener';

import ActiveTab from '@/v3/features/search/chromeTab/activeTab';
import DnD from '@/v3/shared/ui/dnd';
import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/ui/bookmarkDropArea';

function ActiveTabs() {
  const { activeTabsRef } = useActiveTabListener();
  const { mutate: moveTab } = useMoveTabMutation();

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
      <Flex align="center" justify="between">
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
      <Spacer direction="vertical" space={12} />
      <Flex
        direction="column"
        etcStyles={{
          height: '280px',
          overflowY: 'auto',
        }}
      >
        <Spacer direction="vertical" space={12} />
        {data?.tabs.map((tab, index) => (
          <>
            <DnD.Droppable
              dropAction={(e) => {
                const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

                console.log(draggedTab, 'draggedTab');
                console.log(tab, 'tab');

                if (draggedTab && draggedTab.id) {
                  if (
                    draggedTab.index + 1 === Number(tab.index) ||
                    draggedTab.index === Number(tab.index)
                  ) {
                    return;
                  } else {
                    moveTab({ tabId: draggedTab.id, index });
                  }
                } else {
                  // 북마크 요소 드래그 처리
                }
              }}
            >
              {({ isDragEnter }) => {
                return <BookmarkDropArea isDragEnter={isDragEnter} />;
              }}
            </DnD.Droppable>
            <ActiveTab
              key={tab.id}
              tab={tab}
              tabRef={(el) => {
                if (tab.id && tabItemsRef.current[tab.id]) {
                  tabItemsRef.current[tab.id] = el;
                }
              }}
            />
          </>
        ))}
        <DnD.Droppable
          dropAction={(e) => {
            const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

            if (draggedTab && draggedTab.id) {
              moveTab({ tabId: draggedTab.id, index: data?.tabs.length ?? 0 });
            } else {
              // 북마크 요소 드래그 처리
            }
          }}
        >
          {({ isDragEnter }) => {
            return <BookmarkDropArea isDragEnter={isDragEnter} />;
          }}
        </DnD.Droppable>
      </Flex>
    </div>
  );
}

export default ActiveTabs;
