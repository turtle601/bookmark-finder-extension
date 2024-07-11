import { useDragOver } from '@/shared/ui/dnd/hooks/useDragOver';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useDistForAreaAndMouse = () => {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const [dist, setDist] = useState(0);
  const { mouseX } = useDragOver();

  const updateEffectPosition = useCallback(() => {
    if (dropAreaRef.current) {
      setDist(mouseX - dropAreaRef.current.getBoundingClientRect().left);
    }
  }, [mouseX]);

  useEffect(() => {
    updateEffectPosition();
  }, [mouseX, updateEffectPosition, dist]);

  return {
    dropAreaRef,
    dist,
  };
};
