import { useRef } from 'react';

import type { IDragPosition } from '@/shared/ui/dnd/hooks/useDnD';
import type { IDragStartParameter } from '@/shared/ui/dnd/hooks/useDragStart';

export type IDragEnterParamter = IDragStartParameter;

export const useDragEnter = () => {
  const dragEnterItem = useRef<IDragPosition | null>(null); // 드랍할 위치의 아이템의 인덱스

  const dragEnter =
    ({ position }: IDragEnterParamter): React.DragEventHandler =>
    () => {
      dragEnterItem.current = position;
    };

  return {
    dragEnterItem,
    dragEnter,
  };
};
