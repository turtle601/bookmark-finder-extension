import { css, CSSObject, Global } from '@emotion/react';

import { color, globalStyle, slate } from '@/v3/shared/styles';

import {
  DnD,
  SplitPane,
  Spacer,
  Tabs,
  Accordion,
} from 'bookmark-finder-extension-ui';

import { EditBookmark } from '@/v3/features/edit';
import { ActiveTabs } from '@/v3/features/activeTabs';
import { SearchBookmark } from '@/v3/features/search/searchBookmark';

import Header from '@/v3/widgets/ui/header';
import QueryProvider from './provider/queryProvider';

function App() {
  return (
    <QueryProvider>
      <Global styles={globalStyle} />
      <main css={css(getLayoutWrapperStyle())}>
        <section
          css={css({
            background: `linear-gradient(135deg, ${color.slate['50']} 0%, ${color.slate['100']} 100%)`,
            padding: '12px',
            height: '100%',
            borderBottom: `1px solid ${color.slate['200']}`,
          })}
        >
          <Header />
          <Spacer direction="vertical" space="12px" />
          <Tabs.Provider>
            <Tabs.TabList
              etcStyles={{
                display: 'flex',
                background: slate['200'],
                borderRadius: '8px',
                padding: '4px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Tabs.Tab
                etcStyles={(isActive) => {
                  return {
                    ...getTabStyle(isActive),
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  };
                }}
              >
                Edit Mode
              </Tabs.Tab>
              <Tabs.Tab
                etcStyles={(isActive) => {
                  return {
                    ...getTabStyle(isActive),
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                  };
                }}
              >
                Search Mode
              </Tabs.Tab>
            </Tabs.TabList>
            <Tabs.TabPanels>
              <Tabs.TabPanel>
                <Accordion.Provider>
                  <DnD.Provider>
                    <DnD.Boundary width={'100%'} height={'100%'}>
                      <DnD.PointerContent />
                      <SplitPane
                        width={'100%'}
                        height={'calc(100vh - 174px)'}
                        split={'vertical'}
                        pane1={<EditBookmark />}
                        pane2={<ActiveTabs />}
                        resizer={<div css={css(getResizerStyle())} />}
                      />
                    </DnD.Boundary>
                  </DnD.Provider>
                </Accordion.Provider>
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                <SplitPane
                  width={'100%'}
                  height={'calc(100vh - 124px)'}
                  split={'vertical'}
                  pane1={<SearchBookmark />}
                  pane2={
                    <DnD.Provider>
                      <DnD.Boundary width={'100%'} height={'100%'}>
                        <DnD.PointerContent />
                        <ActiveTabs />
                      </DnD.Boundary>
                    </DnD.Provider>
                  }
                  resizer={<div css={css(getResizerStyle())} />}
                />
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs.Provider>
        </section>
      </main>
    </QueryProvider>
  );
}

export default App;

function getResizerStyle(): CSSObject {
  return {
    width: '100%',
    height: '14px',
    backgroundColor: color.slate['200'],
    backgroundPositionY: 'bottom',
    background: `url(https://school.programmers.co.kr/assets/img-grippie-horizon-2029be95ca34dfe8c756d091c6f53a6a007e3a66c7c68863ce6f54fe23d4f371.png) no-repeat 50%`,
    backgroundSize: '2.25rem 0.875rem',
    cursor: 'ns-resize',
  };
}

function getLayoutWrapperStyle(): CSSObject {
  return {
    padding: '20px',
    backgroundColor: color.slate['50'],
    width: '100vw',
    height: '100vh',
  };
}

function getTabStyle(isActive: boolean): CSSObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '4px 8px',
    border: 'none',
    background: isActive ? '#3b82f6' : 'transparent',
    color: isActive ? 'white' : slate['400'],
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    zIndex: 2,
    '&:active': {
      color: 'white',
      background: '#3b82f6',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
    },
  };
}
