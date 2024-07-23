import { useQuery } from '@tanstack/react-query';

import { classifyService } from '@/entities/classify';
import { useCreateAIBookmarks } from '@/entities/bookmark';

import { useCheckType } from '@/features/autoCategorization/classifiedBookmarkForm/hooks/useCheckType';

import type { IClassifiedBookmark } from '@/entities/classify/classify.type';

export const useClassifiedBookmarks = () => {
  const { checkType, toggleCheckType } = useCheckType();

  const { data: classifiedBookmarks } = useQuery<IClassifiedBookmark[]>({
    ...classifyService.queryOptions(),
  });

  const { status, mutate: createAIBookmarks } = useCreateAIBookmarks();

  const isCreatedLoading = status === 'pending';

  const handleCreateNewBookmark = () => {
    if (classifiedBookmarks) {
      const selectedBookmarks = classifiedBookmarks.filter(
        (bookmark) => bookmark.type === checkType,
      )[0].bookmarks;

      createAIBookmarks(selectedBookmarks);
    }
  };

  return {
    checkType,
    isCreatedLoading,
    classifiedBookmarks,
    toggleCheckType,
    handleCreateNewBookmark,
  };
};
