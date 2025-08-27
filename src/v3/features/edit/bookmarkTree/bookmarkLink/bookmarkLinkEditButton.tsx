import BookmarkEditButton from '@/v3/features/edit/bookmarkTree/ui/bookmarkEditButton';

import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/tree/request/queries';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

interface IBookmarkLinkEditButtonProps {
  bookmark: IBookmarkTreeStorage;
}

function BookmarkLinkEditButton({ bookmark }: IBookmarkLinkEditButtonProps) {
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const deleteTargetBookmark = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    deleteBookmark({ id: bookmark.id });
  };

  return (
    <BookmarkEditButton
      options={[
        {
          label: '삭제',
          action: deleteTargetBookmark,
        },
      ]}
    />
  );
}

export default BookmarkLinkEditButton;
