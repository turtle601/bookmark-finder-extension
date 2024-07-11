import { css } from '@emotion/react';
import React, { ReactNode, useMemo } from 'react';

import { DnDActionContext, DnDContext } from '@/shared/ui/dnd/model/context';

import { useDnD } from '@/shared/ui/dnd/hooks/useDnD';

interface IDnDProviderProps {
  children: ReactNode;
}

const DnDProvider: React.FC<IDnDProviderProps> = ({
  children,
}: IDnDProviderProps) => {
  const {
    mouseX,
    mouseY,
    dragStartItem,
    dragEnterItem,
    setDragStartItem,
    setDragEnterItem,
    setMousePosition,
  } = useDnD();

  const state = useMemo(
    () => ({
      mouseX,
      mouseY,
      dragStartItem,
      dragEnterItem,
    }),
    [dragEnterItem, dragStartItem, mouseX, mouseY],
  );

  const action = useMemo(
    () => ({
      setDragStartItem,
      setDragEnterItem,
      setMousePosition,
    }),
    [setDragEnterItem, setDragStartItem, setMousePosition],
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

export default DnDProvider;
