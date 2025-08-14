import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

import GlobalProvider from '@/app/provider/globalProvider';
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { slate } from '@/shared/config/styles';
import Tabs from '@contentScript/tabs';

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

function A() {
  return (
    <div
      css={css({
        position: 'fixed',
        display: 'flex',
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
          height: '600px',
          maxHeight: '800px',
          borderRadius: '12px',
          padding: '12px',
          backgroundColor: slate['50'],
        })}
        onClick={(e) => {
          e.stopPropagation();
          console.log('inside');
        }}
      >
        <div
          css={css({
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            padding: '20px',
            borderBottom: '1px solid #e2e8f0',
          })}
        >
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
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
              marginBottom: '16px',
            })}
          >
            <div>
              <Tabs />
            </div>
          </div>
        </div>
      </div>
    </div>
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
