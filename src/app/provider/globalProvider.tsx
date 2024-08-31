import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';

import { ShadowProvider } from '@/app/provider/shadowProvider';
import { QueryClientProvider } from '@/app/provider/queryClientProvider';

interface IGlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<IGlobalProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider>
      <ModalLayer.Provider>
        <ShadowProvider>{children}</ShadowProvider>
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    </QueryClientProvider>
  );
};
