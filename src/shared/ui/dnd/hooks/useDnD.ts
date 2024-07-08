import { useDragStart } from '@/shared/ui/dnd/hooks/useDragStart';
import { useDragEnter } from '@/shared/ui/dnd/hooks/useDragEnter';
import { useDrop } from '@/shared/ui/dnd/hooks/useDrop';
import { useDragOver } from '@/shared/ui/dnd/hooks/useDragOver';
import { useDragEnd } from '@/shared/ui/dnd/hooks/useDragEnd';

export interface IDragPosition {
  id: number;
  data?: {
    id: string;
    text: string;
  } & unknown;
  parentId?: string;
}

interface IOnDropParameter {
  startPosition: IDragPosition;
  endPosition: IDragPosition;
}

export interface IUseDnDParameter {
  onDrop: ({ startPosition, endPosition }: IOnDropParameter) => void;
}

export const useDnD = ({ onDrop }: IUseDnDParameter) => {
  const { isDrag, setIsDrag, dragStart, dragStartItem, getStartDragPosition } =
    useDragStart();

  const { dragEnterItem, dragEnter } = useDragEnter();
  const { mouseX, mouseY, dragOver } = useDragOver();
  const { dropAction } = useDrop({
    dragStartItem,
    dragEnterItem,
    onDrop,
    setIsDrag,
  });
  const { dragEnd } = useDragEnd({ setIsDrag });

  // const selectDragItem =
  //   ({ position }: IDragEnterParamter): React.MouseEventHandler =>
  //   () => {
  //     dragItem.current = [...dragItem.current, position];
  //   };

  // const removeDragItem =
  //   ({ position }: IDragEnterParamter): React.MouseEventHandler =>
  //   () => {
  //     dragItem.current = [...dragItem.current].map((item) => {
  //       return item.data.id !== position.data.id;
  //     });
  //   };

  return {
    isDrag,
    mouseX,
    mouseY,
    dragOver,
    dragStart,
    dragEnd,
    dragEnter,
    dropAction,
    getStartDragPosition,
  };
};
