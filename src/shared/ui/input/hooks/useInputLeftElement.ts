import { useEffect, useRef, useState } from 'react';

import type { ILeftElementAttribute } from '@/shared/ui/input/part/leftElement';

export const useInputLeftElement = () => {
  const leftElementRef = useRef<ILeftElementAttribute | null>(null);

  const [isLeftElement, setIsLeftElement] = useState(false);

  useEffect(() => {
    if (leftElementRef.current?.isLeftElement) {
      setIsLeftElement(true);
    }
  }, [isLeftElement]);

  return { leftElementRef };
};
