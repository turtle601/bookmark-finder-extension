import {
  IModalState,
  ModalContent,
  ModalType,
  reducer,
} from '@/shared/ui/modal/model';

import { useCallback, useReducer } from 'react';

interface IUseModalParameter {
  modalState: IModalState;
}

export const useModal = ({ modalState }: IUseModalParameter) => {
  const [state, dispatch] = useReducer(reducer, modalState);

  const closeModal = useCallback((name: ModalType) => {
    dispatch({
      type: 'CLOSE_MODAL',
      modalType: name,
    });
  }, []);

  const openModal = useCallback((name: ModalType, content: ModalContent) => {
    dispatch({
      type: 'OPEN_MODAL',
      modalType: name,
      content: content,
    });
  }, []);

  return {
    state,
    closeModal,
    openModal,
  };
};
