import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('sidebarPanel') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
