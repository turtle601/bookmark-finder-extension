import { DragEventHandler, useState } from 'react';

import { useDrop } from '@/shared/ui/dnd/hooks';
import type { AsyncVoidFunction } from '@/shared/ui/util.type';

interface IUseDropableParameter {
  action: VoidFunction | AsyncVoidFunction;
}

export const useDropable = ({ action }: IUseDropableParameter) => {
  const [isDragEnter, setIsDragEnter] = useState(false);
  const { drop } = useDrop({ action });

  const handleDragEnter = () => {
    setIsDragEnter(true);
  };

  const handleDragLeave = () => {
    setIsDragEnter(false);
  };

  const handleDrop: DragEventHandler = async (e) => {
    await drop();
    setIsDragEnter(false);
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
