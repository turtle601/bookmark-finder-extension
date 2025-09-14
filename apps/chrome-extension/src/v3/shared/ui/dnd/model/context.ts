import { Context, createContext, ReactNode, useContext } from 'react';

export interface IMousePosition {
  x: number;
  y: number;
}

export interface IDnDContextProps {
  boundaryRef: React.RefObject<HTMLDivElement>;
  mousePosition: IMousePosition | null;
  dragStartContent: ReactNode;
  dragStartContentSize: {
    width: number;
    height: number;
  };
}

export interface IDnDActionContextProps {
  setMousePosition: React.Dispatch<React.SetStateAction<IMousePosition | null>>;
  setDragStartContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setDragStartContentSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
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
