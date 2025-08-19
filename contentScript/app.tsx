import { useEffect } from 'react';
import { css } from '@emotion/react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

import GlobalProvider from '@/app/provider/globalProvider';
import { slate } from '@/shared/config/styles';

import { Tabs, useTabsContext } from '@/tabs';

import SearchPanel from '@contentScript/searchPanel';
import EditPanel from '@contentScript/editPanel';

function ContentScript() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['isVisible'],
    queryFn: async () => {
      return await ContentScriptToggleSingleton.sendMessage({
        action: 'showContentScript',
      });
    },
  });

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ['isVisible'] });
    };

    chrome.storage.onChanged.addListener(handler);

    return () => {
      chrome.storage.onChanged.removeListener(handler);
    };
  }, [queryClient]);

  if (!data) {
    return null;
  }

  return data.isVisible && <A />;
}

function EditSection() {
  const { selectedId } = useTabsContext();

  return (
    <div
      css={css({
        width: '160px',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: selectedId === '1' ? slate['50'] : 'transparent',
      })}
    ></div>
  );
}

function A() {
  return (
    <Tabs.Provider>
      <div
        css={css({
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          zIndex: 2147483846,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        })}
        onClick={(e) => {
          e.stopPropagation();
          console.log('outside');
        }}
      >
        <div
          css={css({
            width: '400px',
            height: '640px',
            maxHeight: '640px',
            borderRadius: '12px',
            padding: '12px',
            backgroundColor: slate['50'],
          })}
        >
          <div
            css={css({
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              padding: '12px',
              height: '100%',
            })}
          >
            <div
              css={css({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              })}
            >
              <div
                css={css({
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                })}
              >
                🔖
              </div>
              <span
                css={css({
                  fontSize: '18px',
                  fontWeight: '600',
                  color: slate['900'],
                })}
              >
                Bookmark Finder
              </span>
            </div>
            <div
              css={css({
                marginTop: '12px',
              })}
            >
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
                      borderTopLeftRadius: '6px',
                      borderBottomLeftRadius: '6px',
                      zIndex: 2,
                      '&:active': {
                        color: 'white',
                        background: '#3b82f6',
                        boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                      },
                    };
                  }}
                >
                  검색모드
                </Tabs.Tab>
                <Tabs.Tab
                  etcStyles={(isActive) => {
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
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      position: 'relative',
                      zIndex: 2,
                      '&:active': {
                        color: 'white',
                        background: '#3b82f6',
                        boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                      },
                    };
                  }}
                >
                  편집모드
                </Tabs.Tab>
              </Tabs.TabList>
              <Tabs.TabPanels>
                <Tabs.TabPanel>
                  <SearchPanel />
                </Tabs.TabPanel>
                <Tabs.TabPanel>
                  <EditPanel />
                </Tabs.TabPanel>
              </Tabs.TabPanels>
            </div>
          </div>
        </div>
        <div
          css={css({
            marginTop: '24px',
          })}
        >
          <EditSection />
        </div>
      </div>
    </Tabs.Provider>
  );
}

function App() {
  return (
    <GlobalProvider>
      <ContentScript />
    </GlobalProvider>
  );
}

export default App;
