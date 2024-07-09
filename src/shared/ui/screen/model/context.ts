import {
  Context,
  createContext,
  useContext,
  ReactElement,
  ReactNode,
} from 'react';

export type ScreenContent = string | ReactNode | ReactElement[] | null;

export interface IScreenState {
  sidebar: {
    isOpen: boolean;
    content: ScreenContent;
  };
  modal: {
    isOpen: boolean;
    content: ScreenContent;
  };
}

export interface IScreenAction {
  openSidebar: (content: ScreenContent) => void;
  closeSidebar: () => void;
  openModal: (content: ScreenContent) => void;
  closeModal: () => void;
  clickOverlay: () => void;
  pressESC: () => void;
}

export const ScreenContext: Context<IScreenState | null> =
  createContext<IScreenState | null>(null);

export const ScreenActionContext: Context<IScreenAction | null> =
  createContext<IScreenAction | null>(null);

export function useScreenContext() {
  const state = useContext(ScreenContext);
  if (state === null) throw new Error('Cannot find ScreenContext');
  return state;
}

export function useScreenActionContext() {
  const dispatch = useContext(ScreenActionContext);
  if (dispatch === null) throw new Error('Cannot find ScreenActionContext');
  return dispatch;
}
