import { useEffect } from 'react';
import { css, CSSObject } from '@emotion/react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

import GlobalProvider from '@/app/provider/globalProvider';
import { slate } from '@/shared/config/styles';

import { Tabs, useTabsContext } from '@/v3/shared/ui/tabs';

import SearchPanel from '@contentScript/searchPanel';
import EditPanel from '@contentScript/editPanel';
import Flex from '@/shared/ui/flex';
import { createChromeRequest } from '@/shared/lib/fetch';

const selectAllBookmarksMutation = async () => {
  return await createChromeRequest({
    action: 'selectAllBookmarks',
  });
};

const deselectAllBookmarksMutation = async () => {
  return await createChromeRequest({
    action: 'deselectAllBookmarks',
  });
};

const hasSelectedBookmarksMutation = async () => {
  return await createChromeRequest<{
    isSuccess: boolean;
    data: { hasSelected: boolean };
  }>({
    action: 'hasSelectedBookmarks',
  });
};

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

const getActionButtonStyle = (): CSSObject => {
  return {
    width: '96px',
    height: '36px',
    border: '1px solid #dadce0',
    padding: '4px 8px',
    borderRadius: '6px',
    background: 'white',
    color: '#3c4043',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#c1c7cd',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    '&:active': {
      background: '#f1f3f4',
    },
  };
};

function EditSection() {
  const queryClient = useQueryClient();

  const { selectedId } = useTabsContext();

  const { data } = useQuery<{
    isSuccess: boolean;
    data: { hasSelected: boolean };
  }>({
    queryKey: ['hasSelectedBookmarks'],
    queryFn: () => hasSelectedBookmarksMutation(),
  });

  const { mutate: selectAllBookmarks } = useMutation({
    mutationKey: ['selectAllBookmarks'],
    mutationFn: () => selectAllBookmarksMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['hasSelectedBookmarks'] });
    },
  });

  const { mutate: deselectAllBookmarks } = useMutation({
    mutationKey: ['deselectAllBookmarks'],
    mutationFn: () => deselectAllBookmarksMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['hasSelectedBookmarks'] });
    },
  });

  if (selectedId !== '1') {
    return (
      <div
        css={css({
          width: '320px',
          height: '50px',
          backgroundColor: 'transparent',
        })}
      ></div>
    );
  }

  return (
    <Flex
      etcStyles={{
        width: '320px',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: slate['50'],
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <button
        css={css({
          ...getActionButtonStyle(),
          background: '#e8f0fe',
          borderColor: '#4285f4',
          color: '#1967d2',
          '&:hover': {
            background: '#d2e3fc',
          },
        })}
        onClick={() => {
          selectAllBookmarks();
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        전체선택
      </button>

      <button
        disabled={!data?.data.hasSelected}
        css={css({
          ...getActionButtonStyle(),
          '&:disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
          },
        })}
        onClick={() => {
          deselectAllBookmarks();
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        선택해제
      </button>

      <button
        disabled={!data?.data.hasSelected}
        css={css({
          ...getActionButtonStyle(),
          background: '#fce8e6',
          borderColor: '#ea4335',
          color: '#d33b2c',
          '&:hover': {
            background: '#f9d4d2',
          },
          '&:disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
          },
        })}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
        삭제
      </button>
    </Flex>
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
