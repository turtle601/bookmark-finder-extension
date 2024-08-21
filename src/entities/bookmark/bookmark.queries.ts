import { Updater, useMutation } from '@tanstack/react-query';
import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';

import { queryClient } from '@/shared/lib/react-query';

import {
  bookmarkQuery,
  deleteBookmarkFolderMutation,
  deleteBookmarkLinkMutation,
  moveBookmarkMutation,
  updateAIBookmarkMutation,
  updateBookmarkMutation,
} from '@/entities/bookmark/bookmark.api';

import { createBoomarkMutation } from '@/entities/bookmark/bookmark.api';

import type { Bookmark } from '@/entities/bookmark/bookmark.type';

export const keys = {
  root: () => ['bookmark'],
  moveBookmark: () => [...keys.root(), 'move'],
  createBookmark: () => [...keys.root(), 'create'],
  updateBookmark: () => [...keys.root(), 'update'],
  deleteBookmark: () => [...keys.root(), 'delete'],
  updateAIBookmark: () => [...keys.root(), 'ai'],
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
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
  });
}

export function useUpdateBookmarkMutation() {
  return useMutation({
    mutationKey: keys.createBookmark(),
    mutationFn: updateBookmarkMutation,
    onSuccess: async () => {
      console.log('성공');
      await bookmarkService.invalidateCache();
    },
  });
}

export function useDeleteBookmarkLinkMutation() {
  return useMutation({
    mutationKey: keys.deleteBookmark(),
    mutationFn: deleteBookmarkLinkMutation,
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
  });
}

export function useDeleteBookmarkFolderMutation() {
  return useMutation({
    mutationKey: keys.deleteBookmark(),
    mutationFn: deleteBookmarkFolderMutation,
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
  });
}

export const useMoveBookmark = () => {
  return useMutation({
    mutationKey: keys.moveBookmark(),
    mutationFn: moveBookmarkMutation,
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
  });
};

export const useUpdateAIBookmarks = () => {
  return useMutation({
    mutationKey: keys.updateAIBookmark(),
    mutationFn: updateAIBookmarkMutation,
    onSuccess: async () => {
      await bookmarkService.invalidateCache();
    },
  });
};
