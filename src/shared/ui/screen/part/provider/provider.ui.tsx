import React, { useMemo } from 'react';

import { useScreen } from '@/shared/ui/screen/hooks';
import { ScreenActionContext, ScreenContext } from '@/shared/ui/screen/model';

export interface IScreenProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<IScreenProviderProps> = ({ children }) => {
  const {
    state,
    openSidebar,
    closeSidebar,
    openModal,
    closeModal,
    clickOverlay,
    pressESC,
  } = useScreen();

  const action = useMemo(
    () => ({
      openSidebar,
      closeSidebar,
      openModal,
      closeModal,
      clickOverlay,
      pressESC,
    }),
    [clickOverlay, closeModal, closeSidebar, openModal, openSidebar, pressESC],
  );

  return (
    <ScreenContext.Provider value={state}>
      <ScreenActionContext.Provider value={action}>
        {children}
      </ScreenActionContext.Provider>
    </ScreenContext.Provider>
  );
};

export default Provider;
