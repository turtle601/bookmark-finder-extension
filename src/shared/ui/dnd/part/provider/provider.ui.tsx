import React, { ReactNode, useMemo } from 'react';

import { DnDContext, DnDActionContext } from '@/shared/ui/dnd/model';

import { useDnD } from '@/shared/ui/dnd/hooks';

interface IDnDProviderProps {
  children: ReactNode;
}

export type DnDProviderFC = React.FC<IDnDProviderProps>;

const Provider: DnDProviderFC = ({ children }: IDnDProviderProps) => {
  const {
    boundaryRef,
    mousePosition,
    dragStartContent,
    setMousePosition,
    setDragStartContent,
  } = useDnD();

  const state = useMemo(
    () => ({
      boundaryRef,
      mousePosition,
      dragStartContent,
    }),
    [mousePosition, dragStartContent, boundaryRef],
  );

  const action = useMemo(
    () => ({
      setMousePosition,
      setDragStartContent,
    }),
    [setMousePosition, setDragStartContent],
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
