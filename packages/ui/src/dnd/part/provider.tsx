import React, { ReactNode, useMemo } from 'react';

import { DnDContext, DnDActionContext } from '@/dnd/model';

import { useDnD } from '@/dnd/hooks';

interface IDnDProviderProps {
  children: ReactNode;
}

export type DnDProviderFC = React.FC<IDnDProviderProps>;

const Provider: DnDProviderFC = ({ children }: IDnDProviderProps) => {
  const {
    boundaryRef,
    mousePosition,
    dragStartContent,
    dragStartContentSize,
    setMousePosition,
    setDragStartContent,
    setDragStartContentSize,
  } = useDnD();

  const state = useMemo(
    () => ({
      boundaryRef,
      mousePosition,
      dragStartContent,
      dragStartContentSize,
    }),
    [mousePosition, dragStartContent, boundaryRef, dragStartContentSize],
  );

  const action = useMemo(
    () => ({
      setMousePosition,
      setDragStartContent,
      setDragStartContentSize,
    }),
    [setMousePosition, setDragStartContent, setDragStartContentSize],
  );

  return (
    <DnDContext.Provider value={state}>
      <DnDActionContext.Provider value={action}>
        {children}
      </DnDActionContext.Provider>
    </DnDContext.Provider>
  );
};

export default Provider;
