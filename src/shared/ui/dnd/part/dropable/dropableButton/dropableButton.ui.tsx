import React, { ComponentPropsWithoutRef } from 'react';

import Button from '@/shared/ui/button';

import { useDropable } from '@/shared/ui/dnd/part/dropable/hooks/useDropable';

import type { CSSObject } from '@emotion/react';
import type { IUseDrop } from '@/shared/ui/dnd/hooks/useDrop';

export interface IDropableButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  action: IUseDrop['action'];
  customStyle: (isDragEnter: boolean) => CSSObject;
}

const DropableButton: React.FC<IDropableButtonProps> = ({
  customStyle,
  action,
  children,
  ...attribuite
}) => {
  const {
    isDragEnter,
    setIsDragEnter,
    drop,
    dragLeave,
    setDragOverPointer,
    dragEnd,
  } = useDropable({ action });

  const handleDragEnter = () => {
    setIsDragEnter(true);
  };

  const handleDragLeave = () => {
    dragLeave();
    setIsDragEnter(false);
  };

  const handleDrop = () => {
    drop();
    setIsDragEnter(false);
  };

  return (
    <Button
      etcStyles={{
        ...customStyle(isDragEnter),
      }}
      kind="default"
      draggable
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragEnd={dragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={setDragOverPointer}
      {...attribuite}
    >
      {children}
    </Button>
  );
};

export default DropableButton;
