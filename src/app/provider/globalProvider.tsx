import React from 'react';

import { Global } from '@emotion/react';
import { globalStyle } from '@/shared/config/styles/global';
import { QueryClientProvider } from '@/app/provider/queryClientProvider';

import ModalLayer from '@/shared/ui/modalLayer';

interface IGlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<IGlobalProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider>
      <ModalLayer.Provider>
        <Global styles={globalStyle} />
        {children}
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    </QueryClientProvider>
  );
};
