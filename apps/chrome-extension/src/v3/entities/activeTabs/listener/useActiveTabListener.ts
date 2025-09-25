import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { chromeTabService } from '@/v3/entities/activeTabs/request';

export const useActiveTabListener = () => {
  const queryClient = useQueryClient();

  const activeTabsRef = useCallback(
    (el: HTMLDivElement | null) => {
      const handler = () => {
        queryClient.invalidateQueries({
          queryKey: chromeTabService.queryKey(),
        });
      };

      if (el) {
        chrome.tabs.onCreated.addListener(handler);
        chrome.tabs.onRemoved.addListener(handler);
        chrome.tabs.onUpdated.addListener(handler);
        chrome.tabs.onActivated.addListener(handler);
        chrome.tabs.onMoved.addListener(handler);
        chrome.tabs.onAttached.addListener(handler);
        chrome.windows.onFocusChanged.addListener(handler);
      } else {
        chrome.tabs.onCreated.removeListener(handler);
        chrome.tabs.onRemoved.removeListener(handler);
        chrome.tabs.onUpdated.removeListener(handler);
        chrome.tabs.onActivated.removeListener(handler);
        chrome.tabs.onMoved.removeListener(handler);
        chrome.tabs.onAttached.removeListener(handler);
        chrome.windows.onFocusChanged.removeListener(handler);
      }
    },
    [queryClient],
  );

  return {
    activeTabsRef,
  };
};
