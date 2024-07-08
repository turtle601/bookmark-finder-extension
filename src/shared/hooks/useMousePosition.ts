import { useState } from 'react';

interface IMousePositionParameter {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const setMousePosition = ({ x, y }: IMousePositionParameter) => {
    setMouseX(x);
    setMouseY(y);
  };

  return {
    mouseX,
    mouseY,
    setMousePosition,
  };
};
