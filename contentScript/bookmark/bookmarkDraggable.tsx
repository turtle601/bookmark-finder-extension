import DnD from '@/shared/ui/dnd';
import { useDnDContext } from '@/shared/ui/dnd/model';

interface IBookmarkDraggableProps {
  id: string;
  isSelected: boolean;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  children: ({ isDrag }: { isDrag: boolean }) => React.ReactNode;
}

function BookmarkDraggable({
  id,
  isSelected,
  onDrag,
  children,
}: IBookmarkDraggableProps) {
  const { mousePosition } = useDnDContext();

  const isMultiDrag = !!mousePosition && isSelected;

  return (
    <DnD.Draggable
      dragAction={onDrag}
      etcStyles={{
        width: '100%',
      }}
    >
      {({ isDrag: isSingleDrag }) =>
        children({ isDrag: isSingleDrag || isMultiDrag })
      }
    </DnD.Draggable>
  );
}

export default BookmarkDraggable;
