import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { bookmarkSearchService } from '@/v3/entities/bookmark/request/queries';

export const useBookmarkTreeListener = () => {
  const queryClient = useQueryClient();

  const bookmarkTreeRef = useCallback(
    (el: HTMLDivElement | null) => {
      const handler = () => {
        queryClient.invalidateQueries({
          queryKey: bookmarkSearchService.queryKey(),
        });
      };

      if (el) {
        chrome.bookmarks.onCreated.addListener(handler);
        chrome.bookmarks.onRemoved.addListener(handler);
        chrome.bookmarks.onChanged.addListener(handler);
      } else {
        chrome.bookmarks.onCreated.removeListener(handler);
        chrome.bookmarks.onRemoved.removeListener(handler);
        chrome.bookmarks.onChanged.removeListener(handler);
      }
    },
    [queryClient],
  );

  return {
    bookmarkTreeRef,
  };
};
