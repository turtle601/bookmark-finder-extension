import { getDeleteBookmarkButtonStyle } from '@/features/bookmark/delete/style';

import DnD from '@/shared/ui/dnd';
import TrashIcon from '../src/shared/config/assets/trash.svg';

import { useDnDContext } from '@/shared/ui/dnd/model';
import { useDeleteBookmarkMutation } from '@/entities/bookmark';

const DeleteBookmarkButton = () => {
  const { dragStartItem } = useDnDContext();

  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const handleDeleteButton = () => {
    if (dragStartItem?.data) {
      deleteBookmark({ bookmarkId: dragStartItem.data.id });
    }
  };

  return (
    <DnD.DropableButton
      action={handleDeleteButton}
      customStyle={getDeleteBookmarkButtonStyle}
    >
      <TrashIcon />
    </DnD.DropableButton>
  );
};

export default DeleteBookmarkButton;
