import React from 'react';
import root from 'react-shadow/emotion';

import { Global } from '@emotion/react';
import { globalStyle } from '@/shared/config/styles/global';

interface IShadowProviderProps {
  children: React.ReactNode;
}

export const ShadowProvider: React.FC<IShadowProviderProps> = ({
  children,
}) => {
  return (
    <root.div id="shadow-root">
      <Global styles={globalStyle} />
      {children}
    </root.div>
  );
};
