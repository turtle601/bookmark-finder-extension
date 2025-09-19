import React from 'react';
import { css, CSSObject, Global } from '@emotion/react';

import { color, globalStyle, slate } from '@/v3/shared/styles';

import {
  DnD,
  SplitPane,
  Spacer,
  Tabs,
  Accordion,
} from 'bookmark-finder-extension/ui';

import { EditBookmark } from '@/v3/features/edit';
import { CurrentChromeTab } from '@/v3/features/search/chromeTab';
import FindBookmark from '@/v3/features/search/findBookmark/findBookmark';

import Header from '@/v3/widgets/ui/header';
import QueryProvider from './provider/queryProvider';

const RESIZER_URL =
  'https://school.programmers.co.kr/assets/img-grippie-horizon-2029be95ca34dfe8c756d091c6f53a6a007e3a66c7c68863ce6f54fe23d4f371.png' as const;

function Resizer() {
  return (
    <div
      css={css({
        width: '100%',
        height: '14px',
        backgroundColor: color.slate['200'],
        backgroundPositionY: 'bottom',
        background: `url(${RESIZER_URL}) no-repeat 50%`,
        backgroundSize: '2.25rem 0.875rem',
        cursor: 'ns-resize',
      })}
    />
  );
}

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div
      css={css({
        padding: '20px',
        backgroundColor: color.slate['50'],
        width: '100vw',
        height: '100vh',
      })}
    >
      {children}
    </div>
  );
}

const getTabStyle = (isActive: boolean): CSSObject => {
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
};

function App() {
  return (
    <QueryProvider>
      <Global styles={globalStyle} />
      <Layout>
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
                        pane2={<CurrentChromeTab />}
                        resizer={<Resizer />}
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
                  pane1={<FindBookmark />}
                  pane2={
                    <DnD.Provider>
                      <DnD.Boundary width={'100%'} height={'100%'}>
                        <DnD.PointerContent />
                        <CurrentChromeTab />
                      </DnD.Boundary>
                    </DnD.Provider>
                  }
                  resizer={<Resizer />}
                />
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs.Provider>
        </section>
      </Layout>
    </QueryProvider>
  );
}

export default App;
