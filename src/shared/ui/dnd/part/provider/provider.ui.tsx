import { css } from '@emotion/react';

import React, { ReactNode, useMemo } from 'react';

import { DnDContext, DnDActionContext } from '@/shared/ui/dnd/model';

import { useDnD } from '@/shared/ui/dnd/hooks';

interface IDnDProviderProps {
  children: ReactNode;
}

export type DnDProviderFC = React.FC<IDnDProviderProps>;

const Provider: DnDProviderFC = ({ children }: IDnDProviderProps) => {
  const {
    mousePosition,
    dragStartContent,
    setMousePosition,
    setDragStartContent,
  } = useDnD();

  const state = useMemo(
    () => ({
      mousePosition,
      dragStartContent,
    }),
    [mousePosition, dragStartContent],
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
        <div
          css={css({
            position: 'relative',
          })}
        >
          {children}
        </div>
      </DnDActionContext.Provider>
    </DnDContext.Provider>
  );
};

export default Provider;
