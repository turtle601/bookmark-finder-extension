import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/tree/request/queries';

import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

export const useDeleteSelectedBookmarks = () => {
  const { selectedBookmarkIds } = useSelectBookmarkController();
  const { mutate: deleteBookmarks } = useDeleteBookmarkMutation();

  const deleteSelectedBookmarks = () => {
    [...selectedBookmarkIds].forEach((id: string) => {
      deleteBookmarks({ id });
    });
  };

  return {
    deleteSelectedBookmarks,
    isDisabled: selectedBookmarkIds.size === 0,
  };
};
