import { ReactNode } from 'react';

export interface IModalLayerState {
  modalType: string;
  content: ReactNode;
}

type ModalLayerAction =
  | {
      type: 'OPEN_MODAL';
      payload: IModalLayerState;
    }
  | { type: 'CLOSE_MODAL'; modalType: string }
  | { type: 'POP_MODAL' };

export const modalLayerState: IModalLayerState[] = [];

export const reducer = (
  state: IModalLayerState[],
  action: ModalLayerAction,
): IModalLayerState[] => {
  switch (action.type) {
    case 'OPEN_MODAL':
      const isInModalType = state.some(
        (modal) => modal.modalType === action.payload.modalType,
      );

      // modalType이 이미 있다면 교체
      if (isInModalType) {
        return state.map((modal) => {
          if (modal.modalType === action.payload.modalType) {
            return {
              ...modal,
              content: action.payload.content,
            };
          }
          return modal;
        });
      }

      // 없다면 추가
      return [...state, action.payload];
    case 'CLOSE_MODAL':
      return state.filter((modal) => modal.modalType !== action.modalType);

    case 'POP_MODAL':
      return state.slice(0, state.length - 1);

    default:
      throw new Error('지정된 액션이 없습니다!!');
  }
};
