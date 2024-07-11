import { useState } from 'react';
import { useMousePosition } from '@/shared/hooks/useMousePosition';

export interface IDragPosition {
  id: number;
  data?: {
    id: string;
    text: string;
  } & unknown;
  parentId?: string;
}

// interface IOnDropParameter {
//   startPosition: IDragPosition;
//   endPosition: IDragPosition;
// }

// export interface IUseDnDParameter {
//   onDrop: ({ startPosition, endPosition }: IOnDropParameter) => void;
// }

export const useDnD = () => {
  const { mouseX, mouseY, setMousePosition } = useMousePosition();
  const [dragStartItem, setDragStartItem] = useState<IDragPosition | null>(
    null,
  );
  const [dragEnterItem, setDragEnterItem] = useState<IDragPosition | null>(
    null,
  );

  return {
    mouseX,
    mouseY,
    dragStartItem,
    dragEnterItem,
    setDragStartItem,
    setDragEnterItem,
    setMousePosition,
  };
};
