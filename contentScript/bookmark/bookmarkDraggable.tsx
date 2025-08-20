import DnD from '@/shared/ui/dnd';
import { useDnDContext } from '@/shared/ui/dnd/model';

interface IBookmarkDraggableProps {
  isSelected: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  children: ({ isDrag }: { isDrag: boolean }) => React.ReactNode;
}

function BookmarkDraggable({
  isSelected,
  onDragStart,
  onDragEnd,
  children,
}: IBookmarkDraggableProps) {
  const { mousePosition } = useDnDContext();

  const isMultiDrag = !!mousePosition && isSelected;

  return (
    <DnD.Draggable
      dragAction={onDragStart}
      dragEndAction={onDragEnd}
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
