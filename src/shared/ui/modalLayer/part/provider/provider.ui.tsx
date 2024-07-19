import React, { useCallback, useMemo, useReducer } from 'react';

import {
  IModalLayerState,
  ModalLayerActionContext,
  ModalLayerContext,
  modalLayerState,
  reducer,
} from '@/shared/ui/modalLayer/model';

export interface IProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, modalLayerState);

  const openModal = useCallback((modalState: IModalLayerState) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: modalState,
    });
  }, []);

  const closeModal = useCallback((modalType: IModalLayerState['modalType']) => {
    dispatch({
      type: 'CLOSE_MODAL',
      modalType,
    });
  }, []);

  const popModal = useCallback(() => {
    dispatch({
      type: 'POP_MODAL',
    });
  }, []);

  const action = useMemo(
    () => ({
      openModal,
      closeModal,
      popModal,
    }),
    [closeModal, openModal, popModal],
  );

  return (
    <ModalLayerContext.Provider value={state}>
      <ModalLayerActionContext.Provider value={action}>
        {children}
      </ModalLayerActionContext.Provider>
    </ModalLayerContext.Provider>
  );
};

export default Provider;
