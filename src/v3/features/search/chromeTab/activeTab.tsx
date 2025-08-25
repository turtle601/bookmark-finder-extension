import React from 'react';
import { color } from '@/v3/shared/styles';

import {
  useCloseTabMutation,
  useOpenTabMutation,
} from '@/v3/entities/chromeTab/request';

import DnD from '@/v3/shared/ui/dnd';
import Center from '@/v3/shared/ui/layout/center';

import Flex from '@/v3/shared/ui/layout/flex';

import { css } from '@emotion/react';

interface ITabItemProps {
  tab: chrome.tabs.Tab;
  tabRef: React.Ref<HTMLLIElement>;
}

function ActiveTab({ tab, tabRef }: ITabItemProps) {
  const { mutate: closeTab } = useCloseTabMutation(tab.id!);
  const { mutate: openTab } = useOpenTabMutation(tab.id!);

  return (
    <Flex
      as="li"
      ref={tabRef}
      direction="column"
      gap="4px"
      width="100%"
      onClick={() => openTab(tab.id!)}
    >
      <DnD.SingleDraggable
        dragAction={(e) => {
          e.stopPropagation();

          e.dataTransfer.setData('tab', JSON.stringify(tab));
        }}
        dragEndAction={() => {}}
      >
        {({ isDrag }) => (
          <>
            <Flex
              align="center"
              gap="10px"
              etcStyles={{
                padding: '8px 12px',
                background: tab.active
                  ? `linear-gradient(135deg, ${color.primary}, #1d4ed8)`
                  : 'white',
                border: tab.active ? `1px solid #3b82f6` : '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                color: tab.active ? 'white' : color.slate['600'],
                position: 'relative',
                boxShadow: tab.active
                  ? '0 4px 12px rgba(59, 130, 246, 0.25)'
                  : 'none',
                '&:hover': {
                  background: color.slate['50'],
                  borderColor: color.slate['300'],
                  color: color.slate['600'],
                },
                '&:active': {
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderColor: '#3b82f6',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)',
                },
              }}
            >
              <Center
                etcStyles={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  flexShrink: 0,
                }}
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
              </Center>

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
              <Center
                as="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();

                  if (tab.id) {
                    closeTab(tab.id);
                  }
                }}
                etcStyles={{
                  cursor: 'pointer',
                }}
              >
                x
              </Center>
            </Flex>
          </>
        )}
      </DnD.SingleDraggable>
    </Flex>
  );
}

export default ActiveTab;
