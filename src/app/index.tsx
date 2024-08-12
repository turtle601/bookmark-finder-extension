import React from 'react';

import { GlobalProvider } from './provider';

import Home from '@/pages/home';

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
};

export default App;
