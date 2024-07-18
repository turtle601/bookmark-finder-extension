import React from 'react';

import { Global } from '@emotion/react';

import { QueryClientProvider } from '../src/app/provider/queryClientProvider';
import { globalStyle } from '../src/shared/config/styles/global';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <QueryClientProvider>
        <Global styles={globalStyle} />
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
