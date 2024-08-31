import React from 'react';
import root from 'react-shadow/emotion';

import { GlobalProvider } from './provider';

import Home from '@/pages/home';

const App: React.FC = () => {
  return (
    <root.div id="shadow-root">
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </root.div>
  );
};

export default App;
