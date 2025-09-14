import { inSplitPaneRange } from '@/v3/shared/ui/splitPane/lib';
import { useCallback, useRef, useState } from 'react';

export const useSplitPaneDrag = (
  initialPercentage: number,
  isVertical = true,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState(initialPercentage);

  const handleMouseDown = useCallback(() => {
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      const offsetX = moveEvent.clientX - rect.left;
      const offsetY = moveEvent.clientY - rect.top;

      const percentageX = (offsetX / rect.width) * 100;
      const percentageY = (offsetY / rect.height) * 100;

      setPosition(
        inSplitPaneRange(isVertical ? percentageY : percentageX, 15, 85),
      );
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }, [isVertical]);

  return {
    containerRef,
    position,
    onMouseDown: handleMouseDown,
  };
};
