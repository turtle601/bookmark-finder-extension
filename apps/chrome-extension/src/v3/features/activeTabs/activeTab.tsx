import React from 'react';
import { css, CSSObject } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import {
  useCloseTabMutation,
  useOpenTabMutation,
} from '@/v3/entities/activeTabs/request';

import { Center, Flex, DnD, Image } from 'bookmark-finder-extension-ui';

import { getFaviconUrl } from '@/v3/shared/utils/url';

interface ITabItemProps {
  tab: chrome.tabs.Tab;
  tabRef: React.Ref<HTMLLIElement>;
}

function ActiveTab({ tab, tabRef }: ITabItemProps) {
  const { mutate: closeTab } = useCloseTabMutation(tab.id!);
  const { mutate: openTab } = useOpenTabMutation(tab.id!);

  const clickTab = () => {
    openTab(tab.id!);
  };

  const dragTab = (e: React.DragEvent<Element>) => {
    e.dataTransfer.setData('dragType', 'tab');
    e.dataTransfer.setData('tab', JSON.stringify(tab));
  };

  const dragEndTab = (e: React.DragEvent<Element>) => {
    e.dataTransfer.clearData();
  };

  const clickCloseTabButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (tab.id) {
      closeTab(tab.id);
    }
  };

  return (
    <Flex
      as="li"
      ref={tabRef}
      direction="column"
      gap="4px"
      width="100%"
      onClick={clickTab}
    >
      <DnD.SingleDraggable dragAction={dragTab} dragEndAction={dragEndTab}>
        {({ isDrag }) => (
          <>
            <Flex
              align="center"
              gap="10px"
              etcStyles={getDraggableTabStyles(tab)}
            >
              <Center etcStyles={getIconWrapperStyles()}>
                <Image
                  src={getFaviconUrl(tab.url!)}
                  alt={`${tab.title} 아이콘`}
                  fallbackComponent={
                    <span aria-label={`${tab.title} 아이콘`} role="img">
                      🎮
                    </span>
                  }
                  css={css(getIconImageStyle())}
                />
              </Center>
              <p css={css(getTabTitleStyle())}>{tab.title}</p>
              <Center as="button" onClick={clickCloseTabButton}>
                <span
                  aria-label="close tab"
                  css={css(getCloseTabTextStyle(tab))}
                >
                  x
                </span>
              </Center>
            </Flex>
          </>
        )}
      </DnD.SingleDraggable>
    </Flex>
  );
}

export default ActiveTab;

function getDraggableTabStyles(tab: chrome.tabs.Tab): CSSObject {
  return {
    padding: '8px 12px',
    background: tab.active
      ? `linear-gradient(135deg, ${color.primary}, #1d4ed8)`
      : 'white',
    border: tab.active ? `1px solid #3b82f6` : '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    color: tab.active ? 'white' : color.slate['600'],
    position: 'relative',
    boxShadow: tab.active ? '0 4px 12px rgba(59, 130, 246, 0.25)' : 'none',
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
  };
}

function getIconWrapperStyles(): CSSObject {
  return {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    fontSize: '10px',
    flexShrink: 0,
  };
}

function getIconImageStyle(): CSSObject {
  return {
    width: '16px',
    height: '16px',
    objectFit: 'contain',
    verticalAlign: 'middle',
  };
}

function getTabTitleStyle(): CSSObject {
  return {
    fontSize: '13px',
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
}

function getCloseTabTextStyle(tab: chrome.tabs.Tab): CSSObject {
  return {
    color: tab.active ? 'white' : color.slate['600'],
    cursor: 'pointer',
  };
}
