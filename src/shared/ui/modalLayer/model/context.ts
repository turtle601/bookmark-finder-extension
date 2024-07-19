import { createContext, useContext } from 'react';

import type { IModalLayerState } from '@/shared/ui/modalLayer/model/store';

export interface IModalLayerAction {
  popModal: () => void;
  closeModal: (modalType: IModalLayerState['modalType']) => void;
  openModal: (modalState: IModalLayerState) => void;
}

export const ModalLayerContext: React.Context<IModalLayerState[] | null> =
  createContext<IModalLayerState[] | null>(null);

export const ModalLayerActionContext: React.Context<IModalLayerAction | null> =
  createContext<IModalLayerAction | null>(null);

export function useModalLayerContext() {
  const state = useContext(ModalLayerContext);
  if (state === null) throw new Error('Cannot find ModalLayerContext');
  return state;
}

export function useModalLayerActionContext() {
  const dispatch = useContext(ModalLayerActionContext);
  if (dispatch === null) throw new Error('Cannot find ModalLayerActionContext');
  return dispatch;
}
