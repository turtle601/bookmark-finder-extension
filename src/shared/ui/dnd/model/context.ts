import React, { Context, createContext, useContext } from 'react';

import type { IDragPosition } from '@/shared/ui/dnd/hooks';
import type { IDragEnterParamter } from '@/shared/ui/dnd/hooks/useDragEnter';
import type { IDragStartParameter } from '@/shared/ui/dnd/hooks/useDragStart';
import type { IDropAction } from '@/shared/ui/dnd/hooks/useDrop';

export interface IDnDContextProps {
  isDrag: boolean;
  mouseX: number;
  mouseY: number;
}

export interface IDnDActionContextProps {
  dragOver: React.DragEventHandler<Element>;
  dragStart: ({ position }: IDragStartParameter) => React.DragEventHandler;
  dragEnter: ({ position }: IDragEnterParamter) => React.DragEventHandler;
  dropAction: ({ action }: IDropAction) => React.DragEventHandler;
  dragEnd: React.DragEventHandler<Element>;
  getStartDragPosition: () => IDragPosition | null;
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
