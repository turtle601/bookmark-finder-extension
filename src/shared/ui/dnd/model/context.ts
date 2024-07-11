import React, { Context, createContext, useContext } from 'react';

import type { IDragPosition } from '@/shared/ui/dnd/hooks';

export interface IDnDContextProps {
  mouseX: number;
  mouseY: number;
  dragStartItem: IDragPosition | null;
  dragEnterItem: IDragPosition | null;
}

interface IMousePositionParameter {
  x: IDnDContextProps['mouseX'];
  y: IDnDContextProps['mouseY'];
}

export interface IDnDActionContextProps {
  setDragStartItem: React.Dispatch<React.SetStateAction<IDragPosition | null>>;
  setDragEnterItem: React.Dispatch<React.SetStateAction<IDragPosition | null>>;
  setMousePosition: ({ x, y }: IMousePositionParameter) => void;
}

export const DnDContext: Context<IDnDContextProps | null> =
  createContext<IDnDContextProps | null>(null);

export const DnDActionContext: Context<IDnDActionContextProps | null> =
  createContext<IDnDActionContextProps | null>(null);

export const useDnDContext = () => {
  const state = useContext(DnDContext);
  if (state === null) throw new Error('Cannot find DnDContext');
  return state;
};

export const useDnDActionContext = () => {
  const state = useContext(DnDActionContext);
  if (state === null) throw new Error('Cannot find DnDActionContext');
  return state;
};
