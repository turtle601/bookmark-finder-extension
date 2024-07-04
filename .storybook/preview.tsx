import React from 'react';
import { Global } from '@emotion/react';

import type { Preview } from '@storybook/react';

import { globalStyle } from '../src/shared/config/styles/global';

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
      <div>
        <Global styles={globalStyle} />
        <Story />
      </div>
    ),
  ],
};

export default preview;
