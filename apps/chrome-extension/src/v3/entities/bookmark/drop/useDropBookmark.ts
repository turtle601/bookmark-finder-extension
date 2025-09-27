import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';
import { useMoveBookmarkMutation } from '@/v3/entities/bookmark/request/queries';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

import { IFolder } from '@/v3/entities/bookmark/types/bookmark';

export const useDropBookmark = (folder: IFolder) => {
  const { selectedBookmarkIds } = useSelectBookmarkController();
  const { mutate: moveBookmark } = useMoveBookmarkMutation(folder.id);

  const handleDropBookmark = async (startIdx: number) => {
    const moveBookmarkArray = [
      ...bookmarkTreeOptimizer.getTopLevelBookmarkIds(selectedBookmarkIds),
    ].map((id, indexing) => ({
      id,
      parentId: folder.id,
      index: startIdx + indexing,
    }));

    moveBookmarkArray.forEach((item) =>
      moveBookmark({ id: item.id, parentId: folder.id, index: item.index }),
    );
  };

  return {
    dropBookmark: handleDropBookmark,
  };
};
