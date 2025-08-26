import React from 'react';

import { css, CSSObject, Global } from '@emotion/react';

import { color, globalStyle, slate } from '@/v3/shared/styles';

import QueryProvider from './provider/queryProvider';
import { Tabs } from '@/v3/shared/ui/tabs';

import Spacer from '@/v3/shared/ui/layout/spacer';
import Header from '@/v3/widgets/ui/header';

import { Accordion } from '@/v3/shared/ui/accordion';

import FindBookmark from '@/v3/features/search/findBookmark/findBookmark';
import { CurrentChromeTab } from '@/v3/features/search/chromeTab';
import SplitPane from '@/v3/shared/ui/splitPane';
import Divider from '@/v3/shared/ui/layout/divider';
import DnD from '@/v3/shared/ui/dnd';
import { EditBookmark } from '@/v3/features/edit';

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
                검색모드
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
                편집모드
              </Tabs.Tab>
            </Tabs.TabList>
            <Tabs.TabPanels>
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
                  resizer={<Divider css={{ cursor: 'ns-resize' }} />}
                />
              </Tabs.TabPanel>
              <Tabs.TabPanel>
                <Accordion.Provider>
                  <DnD.Provider>
                    <DnD.Boundary width={'100%'} height={'100%'}>
                      <DnD.PointerContent />
                      <SplitPane
                        width={'100%'}
                        height={'calc(100vh - 124px)'}
                        split={'vertical'}
                        pane1={<EditBookmark />}
                        pane2={<CurrentChromeTab />}
                        resizer={<Divider css={{ cursor: 'ns-resize' }} />}
                      />
                    </DnD.Boundary>
                  </DnD.Provider>
                </Accordion.Provider>
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs.Provider>
        </section>
      </Layout>
    </QueryProvider>
  );
}

export default App;
