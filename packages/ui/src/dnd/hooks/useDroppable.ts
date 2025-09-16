import { DragEventHandler, useState } from 'react';

import { useDrop } from '@/dnd/hooks/useDrop';

interface IParameter {
  action: DragEventHandler;
}

export const useDroppable = ({ action }: IParameter) => {
  const [isDragEnter, setIsDragEnter] = useState(false);
  const { drop } = useDrop({ action });

  const handleDragEnter: DragEventHandler = (e) => {
    e.preventDefault();

    setIsDragEnter(true);
  };

  const handleDragLeave: DragEventHandler = (e) => {
    e.preventDefault();

    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragEnter(false);
    }
  };

  const handleDrop: DragEventHandler = (e) => {
    setIsDragEnter(false);
    drop(e);
  };

  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };

  return {
    isDragEnter,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
