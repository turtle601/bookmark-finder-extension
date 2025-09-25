import { useCallback, useState } from 'react';

export const useDOMRect = <T extends HTMLElement>() => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const domRef = useCallback((el: T | null) => {
    if (el) {
      setRect(el.getBoundingClientRect());
    }
  }, []);

  return {
    domRef,
    rect,
  };
};
