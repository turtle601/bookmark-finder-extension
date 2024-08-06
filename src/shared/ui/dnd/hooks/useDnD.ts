import { ReactNode, useRef, useState } from 'react';

interface IMousePosition {
  x: number;
  y: number;
}

export const useDnD = () => {
  const boundaryRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState<IMousePosition | null>(
    null,
  );
  const [dragStartContent, setDragStartContent] = useState<ReactNode | null>(
    null,
  );

  return {
    boundaryRef,
    mousePosition,
    dragStartContent,
    setMousePosition,
    setDragStartContent,
  };
};
