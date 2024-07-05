import { Global } from '@emotion/react';
import { globalStyle } from '@/shared/config/styles/global';
import ModalProvider from '@/shared/ui/modal/provider';

const Provider = () => {
  return (
    <ModalProvider>
      <Global styles={globalStyle} />
    </ModalProvider>
  );
};

export default Provider;
