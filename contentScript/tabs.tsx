import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { slate } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';

interface ITabItemProps {
  tab: chrome.tabs.Tab;
  tabRef: React.Ref<HTMLDivElement>;
}

function TabItem({ tab, tabRef }: ITabItemProps) {
  const queryClient = useQueryClient();

  const { mutate: switchTab } = useMutation({
    mutationFn: async () => {
      await chrome.runtime.sendMessage({
        type: 'switchTab',
        tabId: tab.id,
      });
    },
  });

  const { mutate: closeTab } = useMutation({
    mutationFn: async () => {
      await chrome.runtime.sendMessage({
        type: 'closeTab',
        tabId: tab.id,
      });

      queryClient.invalidateQueries({ queryKey: ['getTabs'] });
    },
  });

  return (
    <div
      ref={tabRef}
      css={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '100%',
      })}
      onClick={() => switchTab()}
    >
      <div
        css={css({
          display: 'flex',
          marginTop: '2px',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          background: tab.active
            ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
            : 'white',
          border: tab.active ? `1px solid #3b82f6` : '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          color: tab.active ? 'white' : slate['600'],
          transition: 'all 0.2s ease',
          position: 'relative',
          boxShadow: tab.active
            ? '0 4px 12px rgba(59, 130, 246, 0.25)'
            : 'none',
          '&:hover': {
            background: slate['50'],
            borderColor: slate['300'],
            transform: 'translateY(-2px)',
            color: slate['600'],
          },
          '&:active': {
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderColor: '#3b82f6',
            color: 'white',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)',
          },
        })}
      >
        <div
          css={css({
            width: '16px',
            height: '16px',
            borderRadius: '3px',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          })}
        >
          {tab.favIconUrl ? (
            <img
              src={tab.favIconUrl}
              alt={`${tab.title} 아이콘`}
              css={css({
                width: '16px',
                height: '16px',
                objectFit: 'contain',
                verticalAlign: 'middle',
              })}
            />
          ) : (
            <span aria-label={`${tab.title} 아이콘`} role="img">
              🎮
            </span>
          )}
        </div>
        <p
          css={css({
            fontSize: '13px',
            fontWeight: '500',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {tab.title}
        </p>
        <div
          css={css({
            cursor: 'pointer',
          })}
          onClick={(e) => {
            e.stopPropagation();
            closeTab();
          }}
        >
          ×
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  const refs = useRef<{
    [K in number]: HTMLDivElement | null;
  }>({});

  const { data } = useQuery<{ success: boolean; tabs: chrome.tabs.Tab[] }>({
    queryKey: ['getTabs'],
    queryFn: async () => {
      return await chrome.runtime.sendMessage({
        type: 'getTabs',
      });
    },
  });

  const scrollTo = (key: number) => {
    refs.current[key]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const activeTab = data?.tabs.find((tab) => tab.active);

    if (activeTab) {
      scrollTo(activeTab.id!);
    }
  }, [data?.tabs]);

  return (
    <>
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
        })}
      >
        <span
          css={css({
            fontSize: '12px',
            fontWeight: '600',
            color: slate['600'],
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          })}
        >
          Active Tabs
        </span>
        <span
          css={css({
            fontSize: '11px',
            color: slate['400'],
            background: slate['100'],
            padding: '2px 6px',
            borderRadius: '4px',
            marginLeft: '8px',
          })}
        >
          {data?.tabs.length}
        </span>
      </div>
      <div
        css={css({
          marginTop: '12px',
        })}
      >
        <Flex
          direction="column"
          gap="4px"
          css={css({
            height: '100px',
            overflowY: 'auto',
          })}
        >
          {data?.tabs.map((tab) => (
            <TabItem
              key={tab.id}
              tab={tab}
              tabRef={(el) => (refs.current[tab.id!] = el)}
            />
          ))}
        </Flex>
      </div>
    </>
  );
}

export default Tabs;
