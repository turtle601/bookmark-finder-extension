import { css } from '@emotion/react';
import React, { ReactNode, useMemo } from 'react';

import { DnDActionContext, DnDContext } from '@/shared/ui/dnd/model/context';

import { useDnD } from '@/shared/ui/dnd/hooks/useDnD';

import type { IUseDnDParameter } from '@/shared/ui/dnd/hooks/useDnD';

interface IDnDProviderProps extends IUseDnDParameter {
  children: ReactNode;
}

const DnDProvider: React.FC<IDnDProviderProps> = ({
  onDrop,
  children,
}: IDnDProviderProps) => {
  const {
    isDrag,
    mouseX,
    mouseY,
    dragOver,
    dragStart,
    dragEnter,
    dragEnd,
    dropAction,
    getStartDragPosition,
  } = useDnD({
    onDrop,
  });

  const state = useMemo(
    () => ({
      isDrag,
      mouseX,
      mouseY,
    }),
    [isDrag, mouseX, mouseY],
  );

  const action = useMemo(
    () => ({
      dragOver,
      dragStart,
      dragEnter,
      dragEnd,
      dropAction,
      getStartDragPosition,
    }),
    [dragEnter, dragOver, dragStart, dropAction, dragEnd, getStartDragPosition],
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
