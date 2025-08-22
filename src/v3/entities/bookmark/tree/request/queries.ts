import { getBookmarkTree } from '@/v3/entities/bookmark/tree/request/api';

import {
  queryOptions as tsqQueryOptions,
  useQuery,
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
