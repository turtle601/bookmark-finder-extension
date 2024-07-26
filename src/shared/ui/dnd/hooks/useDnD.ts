import { ReactNode, useState } from 'react';

interface IMousePosition {
  x: number;
  y: number;
}

export const useDnD = () => {
  const [mousePosition, setMousePosition] = useState<IMousePosition | null>(
    null,
  );
  const [dragStartContent, setDragStartContent] = useState<ReactNode | null>(
    null,
  );

  return {
    mousePosition,
    dragStartContent,
    setMousePosition,
    setDragStartContent,
  };
};
