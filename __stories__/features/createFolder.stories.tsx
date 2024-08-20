import { expect } from '@storybook/jest';
import { css } from '@emotion/react';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';

import type { Meta, StoryObj } from '@storybook/react';

import { queryClient } from '@/shared/lib/react-query';
import { bookmarkService } from '@/entities/bookmark/bookmark.queries';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import CreateFolder from '@/features/bookmark/createFolder';
import ModalLayer from '@/shared/ui/modalLayer';

import { makeBookmarkMockData } from '@/entities/bookmark/bookmark.mock';

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
        <ModalLayer.Provider>
          <Story />
        </ModalLayer.Provider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CreateFolder>;

export const DefaultInteraction: Story = {
  args: {
    parentId: '4',
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(bookmarkApi, 'createBoomarkMutation');
        mock1.mockReturnValue(
          Promise.resolve({
            isSuccess: true,
            bookmark: {
              id: 'newId',
              parentId: '4',
              title: '새 폴더',
              index: 1,
              dateAdded: 12345,
              children: [],
            },
          }),
        );

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

    const buttonElement = canvas.getByText('새 폴더 만들기');
    await userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mock1).toHaveBeenCalledTimes(1);
    });
  },
};
