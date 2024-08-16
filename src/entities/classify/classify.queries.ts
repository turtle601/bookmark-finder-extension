import type { ICategoryBookmark } from './classify.type';

import { queryClient } from '@/shared/lib/react-query';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
} from '@tanstack/react-query';

import { classifyAIBookmarksMutation } from '@/entities/classify/classify.api';

export const keys = {
  root: () => ['classify'],
} as const;

export const classifyService = {
  queryKey: () => keys.root(),

  getCache: () =>
    queryClient.getQueryData<ICategoryBookmark[] | null>(
      classifyService.queryKey(),
    ),

  setCache: (classifiedBookmarks: ICategoryBookmark[] | null) =>
    queryClient.setQueryData<ICategoryBookmark[] | null>(
      classifyService.queryKey(),
      classifiedBookmarks,
    ),

  removeCache: () =>
    queryClient.removeQueries({ queryKey: classifyService.queryKey() }),

  invalidateCache: async () =>
    await queryClient.invalidateQueries({
      queryKey: classifyService.queryKey(),
    }),

  cancelCache: async () =>
    await queryClient.cancelQueries({ queryKey: classifyService.queryKey() }),

  queryOptions: () => {
    return tsqQueryOptions<ICategoryBookmark[] | null>({
      queryKey: classifyService.queryKey(),
    });
  },
} as const;

export const useClassifyAIBookmarks = () => {
  return useMutation({
    mutationKey: classifyService.queryKey(),
    mutationFn: classifyAIBookmarksMutation,
  });
};
