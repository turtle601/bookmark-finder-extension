import { useEffect, useState } from 'react';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addBookmark,
  createBookmarkFolder,
  deleteBookmark,
  getBookmarkTree,
  moveBookmark,
  queryBookmark,
  updateBookmarkTitle,
} from '@/v3/entities/bookmark/request/api';

import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';
import {
  isRootBookmark,
  IRootBookmark,
} from '@/v3/entities/bookmark/types/bookmark';

export const keys = {
  bookmarkTree: () => ['getBookmarkTree'],
  queryBookmark: (ids: string[]) => ['queryBookmark', ...ids],
} as const;

export const bookmarkSearchService = {
  queryKey: () => keys.bookmarkTree(),
  queryOptions: () => {
    return tsqQueryOptions<chrome.bookmarks.BookmarkTreeNode[]>({
      queryKey: bookmarkSearchService.queryKey(),
      queryFn: () => getBookmarkTree(),
    });
  },
} as const;

export const useGetBookmarkTreeQuery = () => {
  const { data } = useQuery(bookmarkSearchService.queryOptions());
  const [rootBookmark, setRootBookmark] = useState<IRootBookmark>();

  useEffect(() => {
    // 크롬 루트 북마크는 항상 존재하고 폴더 타입이다
    if (data?.[0] && isRootBookmark(data[0])) {
      setRootBookmark(data[0]);
      bookmarkTreeOptimizer.reset(data[0]);
    }
  }, [data]);

  // 크롬 북마크의 첫번째 배열의 값은 항상 존재
  return { rootBookmark };
};

export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addBookmark'],
    mutationFn: ({
      title,
      url,
      parentId,
      index,
    }: {
      title: string;
      url: string;
      parentId: string;
      index: number;
    }) => addBookmark({ url, parentId, index, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useMoveBookmarkMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string }) => deleteBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useUpdateFolderTitleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBookmarkTitle'],
    mutationFn: (payload: { id: string; title: string }) =>
      updateBookmarkTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useCreateSubFolderMutation = (
  onMutateSuccess: (bookmark: chrome.bookmarks.BookmarkTreeNode) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createBookmarkFolder'],
    mutationFn: (payload: { parentId: string }) =>
      createBookmarkFolder(payload),
    onSuccess: (data) => {
      onMutateSuccess(data.bookmark);

      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useQueryBookmarkMutation = ({
  onSuccess,
}: {
  onSuccess: (
    data: chrome.bookmarks.BookmarkTreeNode[],
    variable: { ids: string[]; startIdx?: number },
  ) => void;
}) => {
  return useMutation({
    mutationFn: (payload: { ids: string[]; startIdx?: number }) =>
      queryBookmark(payload),
    onSuccess,
  });
};
