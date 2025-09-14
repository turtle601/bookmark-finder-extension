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

  const [dragStartContentSize, setDragStartContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  return {
    boundaryRef,
    mousePosition,
    dragStartContent,
    dragStartContentSize,
    setMousePosition,
    setDragStartContent,
    setDragStartContentSize,
  };
};
