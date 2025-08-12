import ReactDOM from 'react-dom/client';

import App from './app';

// eslint-disable-next-line @rushstack/typedef-var
const root = ReactDOM.createRoot(
  document.getElementById('popup') as HTMLElement,
);

root.render(<App />);
