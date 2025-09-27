import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/request/queries';

import { chunkArray } from '@/v3/shared/utils/optimize/chunk';

const useDeleteFewBookmarks = () => {
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const deleteFewBookmarks = async (removedIds: string[]) => {
    [...removedIds].forEach((id) => {
      deleteBookmark({ id });
    });
  };

  return {
    deleteFewBookmarks,
  };
};

const useDeleteManyBookmarks = () => {
  const { mutateAsync: deleteBookmark } = useDeleteBookmarkMutation();

  const deleteManyBookmarks = async (removedIds: string[]) => {
    const chunks = chunkArray([...removedIds]);

    const promises = chunks.map((chunk) => {
      return chunk.map(async (removedId) => {
        return deleteBookmark({ id: removedId });
      });
    });

    await Promise.all(promises);
  };

  return {
    deleteManyBookmarks,
  };
};

export const useDeleteSelectedBookmarks = (chunkSize: number = 10) => {
  const { deleteFewBookmarks } = useDeleteFewBookmarks();
  const { deleteManyBookmarks } = useDeleteManyBookmarks();

  const deleteSelectedBookmarks = async (selectedBookmarkIds: Set<string>) => {
    if (selectedBookmarkIds.size < chunkSize) {
      deleteFewBookmarks([...selectedBookmarkIds]);
    } else {
      await deleteManyBookmarks([...selectedBookmarkIds]);
    }
  };

  return {
    deleteSelectedBookmarks,
  };
};
