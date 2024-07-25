import { queryClient } from '@/shared/lib/react-query';
import {
  queryOptions as tsqQueryOptions,
  useMutation,
} from '@tanstack/react-query';

import type { IClassifiedBookmark } from '@/entities/classify/classify.type';
import { createAIBookmarksTypesMutation } from '@/entities/classify/classify.api';

export const keys = {
  root: () => ['classify'],
} as const;

export const classifyService = {
  queryKey: () => keys.root(),
  getCache: () =>
    queryClient.getQueryData<IClassifiedBookmark[]>(classifyService.queryKey()),
  setCache: (classifiedBookmarks: IClassifiedBookmark[]) =>
    queryClient.setQueryData<IClassifiedBookmark[]>(
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
    return tsqQueryOptions<IClassifiedBookmark[]>({
      queryKey: classifyService.queryKey(),
    });
  },
} as const;

export const useCreateAIBookmarkTypes = () => {
  return useMutation({
    mutationKey: classifyService.queryKey(),
    mutationFn: createAIBookmarksTypesMutation,
    onSuccess: () => {
      classifyService.invalidateCache();
    },
  });
};
