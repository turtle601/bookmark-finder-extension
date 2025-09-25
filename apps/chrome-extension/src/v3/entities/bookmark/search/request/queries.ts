import { searchQuery } from '@/v3/entities/bookmark/search/request/api';

import type { ISearchBookmarkLink } from '@/v3/background/utils';

import {
  queryOptions as tsqQueryOptions,
  useQuery,
} from '@tanstack/react-query';

interface IBookmarkSearchQueryOptionsParams {
  text: string;
  isEnabled: boolean;
}

export const keys = {
  searchBookmarks: (text: string) => ['searchBookmarks', text],
} as const;

export const bookmarkSearchService = {
  queryKey: (text: string) => keys.searchBookmarks(text),
  queryOptions: ({ text, isEnabled }: IBookmarkSearchQueryOptionsParams) => {
    return tsqQueryOptions<ISearchBookmarkLink[]>({
      queryKey: bookmarkSearchService.queryKey(text),
      queryFn: () => searchQuery({ text }),
      enabled: isEnabled,
    });
  },
} as const;

export const useSearchBookmarksQuery = ({
  text,
  isEnabled,
}: IBookmarkSearchQueryOptionsParams) => {
  return useQuery(bookmarkSearchService.queryOptions({ text, isEnabled }));
};
