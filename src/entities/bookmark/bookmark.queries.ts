import { Updater, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/react-query';
import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';

import {
  bookmarkQuery,
  createNewChromeBookmarksMutation,
  deleteBookmarkMutation,
  updateBookmarkMutation,
} from '@/entities/bookmark/bookmark.api';

import { createBoomarkMutation } from '@/entities/bookmark/bookmark.api';

import type { Bookmark } from '@/entities/bookmark/bookmark.type';

export const keys = {
  root: () => ['bookmark'],
  createBookmark: () => [...keys.root(), 'create'],
  updateBookmark: () => [...keys.root(), 'update'],
  deleteBookmark: () => [...keys.root(), 'delete'],
} as const;

export const bookmarkService = {
  queryKey: () => keys.root(),
  getCache: () =>
    queryClient.getQueryData<Bookmark[]>(bookmarkService.queryKey()),
  setCache: (
    updater: Updater<
      chrome.bookmarks.BookmarkTreeNode[] | undefined,
      chrome.bookmarks.BookmarkTreeNode[] | undefined
    >,
  ) =>
    queryClient.setQueryData<Bookmark[]>(bookmarkService.queryKey(), updater),
  removeCache: () =>
    queryClient.removeQueries({ queryKey: bookmarkService.queryKey() }),
  invalidateCache: async () =>
    await queryClient.invalidateQueries({
      queryKey: bookmarkService.queryKey(),
    }),
  cancelCache: async () =>
    await queryClient.cancelQueries({ queryKey: bookmarkService.queryKey() }),
  queryOptions: () => {
    return tsqQueryOptions<Bookmark[]>({
      queryKey: bookmarkService.queryKey(),
      queryFn: bookmarkQuery,
    });
  },
} as const;

export function useCreateBookmarkMutation() {
  return useMutation({
    mutationKey: keys.createBookmark(),
    mutationFn: createBoomarkMutation,
    onMutate: async (variables) => {
      await bookmarkService.cancelCache();
      const prevBookmarkCache = bookmarkService.getCache();

      return { prevBookmarkCache };
    },
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
    onError: async (error, variables, context) => {
      await bookmarkService.invalidateCache();
      bookmarkService.setCache(context?.prevBookmarkCache);
    },
  });
}

export function useUpdateBookmarkMutation() {
  return useMutation({
    mutationKey: keys.createBookmark(),
    mutationFn: updateBookmarkMutation,
    onMutate: async (variables) => {
      await bookmarkService.cancelCache();
      const prevBookmarkCache = bookmarkService.getCache();

      return { prevBookmarkCache };
    },
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
    onError: async (error, variables, context) => {
      await bookmarkService.invalidateCache();
      bookmarkService.setCache(context?.prevBookmarkCache);
    },
  });
}

export function useDeleteBookmarkMutation() {
  return useMutation({
    mutationKey: keys.deleteBookmark(),
    mutationFn: deleteBookmarkMutation,
  });
}

export const useCreateAIBookmarks = () => {
  return useMutation({
    mutationKey: bookmarkService.queryKey(),
    mutationFn: createNewChromeBookmarksMutation,
    onSuccess: () => {
      bookmarkService.invalidateCache();
    },
  });
};
