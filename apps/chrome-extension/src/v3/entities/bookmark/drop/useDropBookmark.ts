import { useMoveBookmarkMutation } from '@/v3/entities/bookmark/tree/request/queries';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

import { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';

export const useDropBookmark = (folder: IFolder) => {
  const { selectedBookmarkIds } = useSelectBookmarkController();
  const { mutate: moveBookmark } = useMoveBookmarkMutation(folder.id);

  const handleDropBookmark = (startIdx: number) => {
    [...selectedBookmarkIds].forEach((selectedId, indexing) => {
      moveBookmark({
        id: selectedId,
        parentId: folder.id,
        index: startIdx + indexing,
      });
    });
  };

  return {
    dropBookmark: handleDropBookmark,
  };
};
