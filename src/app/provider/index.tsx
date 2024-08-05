import { Global } from '@emotion/react';
import { globalStyle } from '@/shared/config/styles/global';
import { QueryClientProvider } from '@/app/provider/queryClientProvider';

import ModalLayer from '@/shared/ui/modalLayer';

import Home from '@/pages/home/home.ui';

const Provider = () => {
  return (
    <QueryClientProvider>
      <ModalLayer.Provider>
        <Global styles={globalStyle} />
        <Home />
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    </QueryClientProvider>
  );
};

export default Provider;
