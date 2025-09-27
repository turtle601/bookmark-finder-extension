import { useQueryBookmarkMutation } from '@/v3/entities/bookmark/request/queries';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

export const useSelectedBookmarksData = () => {
  const { selectedBookmarkIds } = useSelectBookmarkController();
  const { mutateAsync: queryBookmark } = useQueryBookmarkMutation();

  const getSelectedBookmarksData = async () => {
    return queryBookmark({ ids: [...selectedBookmarkIds] });
  };

  return { selectedBookmarkIds, getSelectedBookmarksData };
};
