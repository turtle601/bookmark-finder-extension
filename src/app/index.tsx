import { createRoot } from 'react-dom/client';

import Provider from '@/app/provider';

export const makeContentScript = () => {
  const appContainer = document.createElement('div');
  const root = createRoot(appContainer);

  root.render(<Provider />);
};
