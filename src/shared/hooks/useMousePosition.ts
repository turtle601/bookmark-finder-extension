import { useState } from 'react';

interface IUseMousePositionParameter {
  x: number;
  y: number;
}

interface IMousePositionParameter {
  x: IUseMousePositionParameter['x'];
  y: IUseMousePositionParameter['y'];
}

export const useMousePosition = ({
  x = 0,
  y = 0,
}: IUseMousePositionParameter) => {
  const [mouseX, setMouseX] = useState(x);
  const [mouseY, setMouseY] = useState(y);

  const setMousePosition = ({ x, y }: IMousePositionParameter) => {
    requestAnimationFrame(() => {
      setMouseX(x);
      setMouseY(y);
    });
  };

  return {
    mouseX,
    mouseY,
    setMousePosition,
  };
};
