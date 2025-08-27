import { useEditBookmarkStore } from '@/v3/features/edit/store/useEditBookmarkStore';

import BookmarkEditButton from '@/v3/features/edit/bookmarkTree/ui/bookmarkEditButton';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';
import {
  useCreateBookmarkFolderMutation,
  useDeleteBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

interface IBookmarkFolderEditButtonProps {
  bookmark: IBookmarkTreeStorage;
}

function BookmarkFolderEditButton({
  bookmark,
}: IBookmarkFolderEditButtonProps) {
  const { setEditBookmark } = useEditBookmarkStore();

  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: createBookmarkFolder } = useCreateBookmarkFolderMutation();

  const changeBookmarkTitle = () => {
    setEditBookmark(bookmark);
  };

  const createSubFolder = () => {
    createBookmarkFolder({
      parentId: bookmark.id,
    });
  };

  const deleteTargetBookmark = () => {
    deleteBookmark({ id: bookmark.id });
  };

  return (
    <BookmarkEditButton
      options={[
        {
          label: '이름 바꾸기',
          action: changeBookmarkTitle,
        },
        {
          label: '하위 폴더 생성',
          action: createSubFolder,
        },
        {
          label: '삭제',
          action: deleteTargetBookmark,
        },
      ]}
    />
  );
}

export default BookmarkFolderEditButton;
