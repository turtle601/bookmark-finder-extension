import { queryClient } from '@/shared/lib/react-query';
import {
  queryOptions as tsqQueryOptions,
  useMutation,
} from '@tanstack/react-query';

import { searchAIQuery, searchQuery } from '@/entities/search/search.api';

import type { Bookmark } from '@/entities/bookmark/bookmark.type';

export const keys = {
  root: () => ['search'],
  searchName: () => [...keys.root(), 'name'],
  searchAI: () => [...keys.root(), 'ai'],
} as const;

export const searchService = {
  queryKey: () => keys.root(),
  getCache: () =>
    queryClient.getQueryData<Bookmark[]>(searchService.queryKey()),
  setCache: (bookmark: Bookmark[]) => {
    queryClient.setQueryData<Bookmark[]>(searchService.queryKey(), bookmark);
  },
  cancelCache: async () => {
    await queryClient.cancelQueries({
      queryKey: searchService.queryKey(),
    });
  },
  invalidateCache: async () => {
    await queryClient.invalidateQueries({
      queryKey: searchService.queryKey(),
    });
  },
  queryOptions: () => {
    return tsqQueryOptions({
      queryKey: searchService.queryKey(),
      initialData: [],
      staleTime: Infinity,
    });
  },
} as const;

export const useAutoSearchMutation = (isAI: boolean) => {
  return useMutation({
    mutationKey: isAI ? keys.searchAI() : keys.searchName(),
    mutationFn: isAI ? searchAIQuery : searchQuery,
    onMutate: async () => {
      await searchService.cancelCache();
    },
    onSuccess: async (data) => {
      if (isAI) {
        searchService.setCache(data);
      } else {
        searchService.setCache(data);
      }
    },
  });
};
