import React from 'react';

import {
  ModalActionContext,
  modalState,
  ModalStateContext,
} from '@/shared/ui/modal/model';

import { useModal } from '@/shared/ui/modal/hooks/useModal';

interface IModalProviderProps {
  children: React.ReactNode;
}

function ModalProvider({ children }: IModalProviderProps) {
  const { state, closeModal, openModal } = useModal({ modalState });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider
        value={{
          openModal,
          closeModal,
        }}
      >
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default ModalProvider;
