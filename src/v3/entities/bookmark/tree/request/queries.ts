import {
  deselectAllBookmarks,
  getBookmarkTree,
  getTopLevelSelectedNodes,
  moveBookmark,
  selectAllBookmarks,
  selectBookmark,
  toggleSelectedBookmark,
} from '@/v3/entities/bookmark/tree/request/api';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const keys = {
  bookmarkTree: () => ['getBookmarkTree'],
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
  return useQuery(bookmarkSearchService.queryOptions());
};

export const useMoveBookmarkMutation = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['moveBookmark', id],
    mutationFn: moveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });

  const fn = async ({
    parentId,
    startIdx,
  }: {
    parentId: string;
    startIdx: number;
  }) => {
    const selectedBookmarks = await getTopLevelSelectedNodes();

    selectedBookmarks.data?.forEach((id, indexing) => {
      mutate({ id, parentId, index: startIdx + indexing });
    });
  };

  return { moveBookmark: fn };
};

export const useToggleSelectedBookmarkMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['toggleSelectedBookmark', id],
    mutationFn: toggleSelectedBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useSelectBookmarkMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['selectBookmark', id],
    mutationFn: selectBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useDeselectAllBookmarksMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deselectAllBookmarks'],
    mutationFn: deselectAllBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useSelectAllBookmarksMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['selectAllBookmarks'],
    mutationFn: () => selectAllBookmarks(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};
