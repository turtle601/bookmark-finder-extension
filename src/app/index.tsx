import { createRoot } from 'react-dom/client';

import Provider from '@/app/provider';

export const makeContentScript = () => {
  const appContainer = document.createElement('div');
  const screenContainer = document.createElement('div');
  appContainer.id = 'bookmark';
  screenContainer.id = 'screen';

  document.body.appendChild(appContainer);
  document.body.appendChild(screenContainer);

  const root = createRoot(appContainer);

  root.render(<Provider />);
};
