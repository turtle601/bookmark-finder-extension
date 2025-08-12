import { createRoot } from 'react-dom/client';

import App from './app';

const ROOT_ID = 'bookmark-ai-finder-root' as const;

const checkRoot = () => {
  const existingRoot = document.getElementById(ROOT_ID);

  return !!existingRoot;
};

const makeContentScript = () => {
  if (checkRoot()) {
    return;
  }

  const hostElement = document.createElement('div');
  hostElement.id = ROOT_ID;

  document.body.appendChild(hostElement);

  const root = createRoot(hostElement);

  root.render(<App />);
};

makeContentScript();
