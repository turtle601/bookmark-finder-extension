import { IModalState, ModalAction } from '@/shared/ui/modal/model/context';

export const modalState: IModalState = {
  search: {
    isOpen: false,
    content: null,
    zIndex: 1000000, // 임의의 사이트에서 제일 높은 zIndex를 가늠할 수 없어서 좀 높은 값을 지정
  },
};

export function reducer(state: IModalState, action: ModalAction): IModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.modalType]: {
          ...state[action.modalType],
          isOpen: true,
          content: action.content,
        },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        [action.modalType]: {
          ...state[action.modalType],
          isOpen: false,
          content: null,
        },
      };
    default:
      throw new Error('지정된 액션이 없습니다!!');
  }
}
