import { useEditBookmarkStore } from '@/v3/features/edit/store/useEditBookmarkStore';

import BookmarkEditButton from '@/v3/features/edit/bookmarkTree/ui/bookmarkEditButton';

import {
  useCreateBookmarkFolderMutation,
  useDeleteBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

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
          label: 'Rename',
          action: changeBookmarkTitle,
        },
        {
          label: 'Create Sub Folder',
          action: createSubFolder,
        },
        {
          label: 'Delete',
          action: deleteTargetBookmark,
        },
      ]}
    />
  );
}

export default BookmarkFolderEditButton;
