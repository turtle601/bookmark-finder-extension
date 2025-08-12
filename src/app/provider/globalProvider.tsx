import React from 'react';

import { QueryClientProvider } from '@/app/provider/queryClientProvider';

import ShadowProvider from '@/app/provider/shadowProvider';
interface IGlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<IGlobalProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider>
      <ShadowProvider>{children}</ShadowProvider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
