import { useState } from 'react';

import { useDrop } from '@/shared/ui/dnd/hooks/useDrop';

import type { IUseDrop } from '@/shared/ui/dnd/hooks/useDrop';
import { useDragLeave } from '@/shared/ui/dnd/hooks/useDragLeave';
import { useDragOver } from '@/shared/ui/dnd/hooks/useDragOver';
import { useDragEnd } from '@/shared/ui/dnd/hooks/useDragEnd';

interface IUseDropable {
  action: IUseDrop['action'];
}

export const useDropable = ({ action }: IUseDropable) => {
  const [isDragEnter, setIsDragEnter] = useState(false);

  const { drop } = useDrop({ action });
  const { dragLeave } = useDragLeave();
  const { setDragOverPointer } = useDragOver();
  const { dragEnd } = useDragEnd();

  return {
    isDragEnter,
    setIsDragEnter,
    drop,
    dragLeave,
    setDragOverPointer,
    dragEnd,
  };
};
