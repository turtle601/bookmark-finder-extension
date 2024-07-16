import { expect } from '@storybook/jest';
import { css } from '@emotion/react';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';

import type { Meta, StoryObj } from '@storybook/react';

import { bookmarkService } from '@/entities/bookmark/bookmark.queries';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import CreateFolder from '@/features/bookmark/createFolder';

import {
  createFolderMockData,
  makeBookmarkMockData,
} from '@/entities/bookmark/bookmark.mock';
import { queryClient } from '@/shared/lib/react-query';

const meta: Meta<typeof CreateFolder> = {
  title: 'features/CreateFolder',
  component: CreateFolder,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div
        css={css({
          width: '340px',
          height: '210px',
        })}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CreateFolder>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DefaultInteraction: Story = {
  args: {
    parentId: '4',
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(bookmarkApi, 'createBoomarkMutation');

        return mock1;
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    const mock1 = getMock(parameters, bookmarkApi, 'createBoomarkMutation');

    queryClient.clear();

    bookmarkService.setCache(makeBookmarkMockData());

    const canvas = within(canvasElement);

    const textElement = canvas.getByRole('textbox');

    await userEvent.type(textElement, '새 폴더', {
      delay: 100,
    });

    const buttonElement = canvas.getByText('폴더 만들기');
    await userEvent.click(buttonElement);

    await sleep(1000);

    await waitFor(() => {
      expect(mock1).toBeCalled();
      expect(bookmarkService.getCache()).toEqual(createFolderMockData);
    });
  },
};
