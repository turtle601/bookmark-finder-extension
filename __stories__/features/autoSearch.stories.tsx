import { css } from '@emotion/react';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';

import type { Meta, StoryObj } from '@storybook/react';

import AutoSearch from '@/features/search/autoSearch';

import { queryClient } from '@/shared/lib/react-query';

import * as searchApi from '@/entities/search/search.api';

const meta: Meta<typeof AutoSearch> = {
  title: 'features/AutoSearch',
  component: AutoSearch,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div
        css={css({
          width: '640px',
          height: '320px',
        })}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AutoSearch>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const NameSearchInteraction: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(searchApi, 'searchQuery');

        mock1.mockReturnValue(
          Promise.resolve([
            {
              id: '3',
              title: 'Google',
              url: 'https://www.google.com',
            },
            {
              id: '4',
              title: 'GitHub',
              url: 'https://www.github.com',
            },
            {
              id: '5',
              title: 'G리는 폴더',
            },
          ]),
        );

        return mock1;
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    const mock1 = getMock(parameters, searchApi, 'searchQuery');

    queryClient.clear();

    const canvas = within(canvasElement);

    const textElement = canvas.getByRole('textbox');

    await userEvent.type(textElement, 'G', {
      delay: 100,
    });

    await sleep(2000);

    await waitFor(() => {
      expect(mock1).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(canvas.getByText('Google')).toBeInTheDocument();
      expect(canvas.getByText('GitHub')).toBeInTheDocument();
    });
  },
};

export const AISearchInteraction: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(searchApi, 'searchAIQuery');

        mock1.mockReturnValue(
          Promise.resolve([
            {
              id: '3',
              title: 'Google',
              url: 'https://www.google.com',
            },
          ]),
        );

        return mock1;
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    const mock1 = getMock(parameters, searchApi, 'searchAIQuery');
    queryClient.clear();

    const canvas = within(canvasElement);
    const buttonElement = canvas.getByRole('button');
    await userEvent.click(buttonElement);

    const textElement = canvas.getByRole('textbox');
    await userEvent.type(textElement, 'Google 사이트', {
      delay: 100,
    });

    await sleep(2000);

    await waitFor(() => {
      expect(mock1).toHaveBeenCalledTimes(1);
      expect(canvas.getByText('Google')).toBeInTheDocument();
    });
  },
};
