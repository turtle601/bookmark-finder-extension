import {
  Context,
  createContext,
  useContext,
  ReactElement,
  ReactNode,
} from 'react';

export type ModalContent = string | ReactNode | ReactElement[] | null;

export type ModalType = 'search';

export interface IModalState {
  search: {
    isOpen: boolean;
    content: ModalContent;
    zIndex: number;
  };
}

export interface IModalAction {
  openModal: (name: ModalType, content: ModalContent) => void;
  closeModal: (name: ModalType) => void;
}

export interface IModalProviderProps {
  modalState: IModalState;
  children: ReactNode;
}

export type ModalAction =
  | { type: 'OPEN_MODAL'; modalType: ModalType; content: ModalContent }
  | { type: 'CLOSE_MODAL'; modalType: ModalType };

export const ModalStateContext: Context<IModalState | null> =
  createContext<IModalState | null>(null);

export const ModalActionContext: Context<IModalAction | null> =
  createContext<IModalAction | null>(null);

export function useModalState() {
  const state = useContext(ModalStateContext);
  if (state === null) throw new Error('Cannot find ModalStateContext');
  return state;
}

export function useModalAction() {
  const dispatch = useContext(ModalActionContext);
  if (dispatch === null) throw new Error('Cannot find ModalActionContext');
  return dispatch;
}
