import {
  requestCloseTab,
  requestOpenTab,
  requestTabs,
} from '@/v3/entities/chromeTab/request/api';

import type { ITabsResponse } from '@/v3/entities/chromeTab/request/api';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const keys = {
  root: () => ['getTabs'],
  openTab: (tabId: number) => [...keys.root(), 'openTab', tabId],
  closeTab: (tabId: number) => [...keys.root(), 'closeTab', tabId],
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
  return useSuspenseQuery(chromeTabService.queryOptions());
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
