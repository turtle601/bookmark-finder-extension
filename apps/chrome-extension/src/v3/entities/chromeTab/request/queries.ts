import {
  requestAddChromeTab,
  requestCloseTab,
  requestMoveTab,
  requestOpenTab,
  requestTabs,
} from '@/v3/entities/chromeTab/request/api';

import { useSelectedBookmarkLinkQuery } from '@/v3/entities/bookmark/tree/request/queries';

import type { ITabsResponse } from '@/v3/entities/chromeTab/request/api';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const keys = {
  root: () => ['getTabs'],
  openTab: (tabId: number) => [...keys.root(), 'openTab', tabId],
  closeTab: (tabId: number) => [...keys.root(), 'closeTab', tabId],
  moveTab: (tabId: number, index: number) => [
    ...keys.root(),
    'moveTab',
    tabId,
    index,
  ],
} as const;

export const chromeTabService = {
  queryKey: () => keys.root(),
  queryOptions: () => {
    return tsqQueryOptions<ITabsResponse>({
      queryKey: chromeTabService.queryKey(),
      queryFn: requestTabs,
      staleTime: 0,
    });
  },
} as const;

export const useTabsQuery = () => {
  return useQuery(chromeTabService.queryOptions());
};

export const useCloseTabMutation = (tabId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.closeTab(tabId),
    mutationFn: requestCloseTab,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chromeTabService.queryKey(),
      });
    },
  });
};

export const useOpenTabMutation = (tabId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.openTab(tabId),
    mutationFn: requestOpenTab,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chromeTabService.queryKey(),
      });
    },
  });
};

export const useMoveTabMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['moveTab'],
    mutationFn: ({ tabId, index }: { tabId: number; index: number }) =>
      requestMoveTab(tabId, index),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chromeTabService.queryKey(),
      });
    },
  });
};

export const useAddChromeTabMutation = () => {
  const queryClient = useQueryClient();

  const { data: selectedBookmarks } = useSelectedBookmarkLinkQuery();

  const { mutate } = useMutation({
    mutationKey: ['addChromeTab'],
    mutationFn: ({ url, index }: { url: string; index: number }) =>
      requestAddChromeTab(url, index),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chromeTabService.queryKey(),
      });
    },
  });

  const fn = (startIdx: number) => {
    selectedBookmarks?.forEach((bookmark) => {
      if (bookmark.url) {
        mutate({ url: bookmark.url, index: startIdx });
        startIdx++;
      }
    });
  };

  return { addChromeTabs: fn };
};
