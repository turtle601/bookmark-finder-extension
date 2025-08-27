import { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

import {
  addBookmark,
  createBookmarkFolder,
  deleteBookmark,
  deselectAllBookmarks,
  getBookmarkTree,
  getTopLevelSelectedNodes,
  moveBookmark,
  resetBookmarkTree,
  selectAllBookmarks,
  selectBookmark,
  toggleSelectedBookmark,
  updateBookmarkTitle,
} from '@/v3/entities/bookmark/tree/request/api';
import {
  getRootBookmarks,
  getSelectedBookmarkLinks,
  getSelectedBookmarks,
} from '@/v3/entities/bookmark/tree/request/select';
import { useEditBookmarkStore } from '@/v3/features/edit/store/useEditBookmarkStore';
import { useAccordionActionContext } from '@/v3/shared/ui/accordion/model';

import {
  queryOptions as tsqQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const keys = {
  bookmarkTree: () => ['getBookmarkTree'],
  selectedCount: () => ['getSelectedCount'],
} as const;

export const bookmarkSearchService = {
  queryKey: () => keys.bookmarkTree(),
  queryOptions: () => {
    return tsqQueryOptions<IBookmarkTreeStorage[]>({
      queryKey: bookmarkSearchService.queryKey(),
      queryFn: () => getBookmarkTree(),
    });
  },
} as const;

export const useGetBookmarkTreeQuery = () => {
  return useQuery(bookmarkSearchService.queryOptions());
};

export const useSelectedBookmarkQuery = () => {
  return useQuery({
    ...bookmarkSearchService.queryOptions(),
    select: getSelectedBookmarks,
  });
};

export const useSelectedBookmarkLinkQuery = () => {
  return useQuery({
    ...bookmarkSearchService.queryOptions(),
    select: getSelectedBookmarkLinks,
  });
};

export const useRootBookmarksQuery = () => {
  return useQuery({
    ...bookmarkSearchService.queryOptions(),
    select: getRootBookmarks,
  });
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

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useDeleteBookmarksMutation = () => {
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const { data: selectedBookmarks } = useSelectedBookmarkQuery();

  const isDisabled = selectedBookmarks?.length === 0;

  const fn = async () => {
    selectedBookmarks?.forEach((bookmark) => {
      deleteBookmark({ id: bookmark.id });
    });
  };

  return { deleteBookmark: fn, isDisabled };
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

export const useResetBookmarkTreeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['resetBookmarkTree'],
    mutationFn: resetBookmarkTree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useUpdateBookmarkTitleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBookmarkTitle'],
    mutationFn: updateBookmarkTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};

export const useCreateBookmarkFolderMutation = () => {
  const queryClient = useQueryClient();

  const { setEditBookmark } = useEditBookmarkStore();
  const { openAccordion } = useAccordionActionContext();

  return useMutation({
    mutationKey: ['createBookmarkFolder'],
    mutationFn: createBookmarkFolder,
    onSuccess: (data) => {
      setEditBookmark(data.bookmark);

      if (data.bookmark.parentId) {
        openAccordion(Number(data.bookmark.parentId));
      }

      queryClient.invalidateQueries({ queryKey: ['getBookmarkTree'] });
    },
  });
};
