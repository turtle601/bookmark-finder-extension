import { css } from '@emotion/react';

import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';
import { queryClient } from '@/shared/lib/react-query';

import { makeBookmarkMockData } from '@/entities/bookmark';
import { bookmarkService } from '@/entities/bookmark/bookmark.queries';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import ModalLayer from '@/shared/ui/modalLayer';
import UpdateFolder from '@/features/bookmark/updateFolder';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UpdateFolder> = {
  title: 'features/UpdateFolder',
  component: UpdateFolder,
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

type Story = StoryObj<typeof UpdateFolder>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DefaultInteraction: Story = {
  args: {
    id: '4',
    parentId: '0',
    title: 'Other Bookmarks',
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(bookmarkApi, 'updateBookmarkMutation');

        return mock1;
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    const mock1 = getMock(parameters, bookmarkApi, 'updateBookmarkMutation');

    queryClient.clear();

    bookmarkService.setCache(makeBookmarkMockData());

    const canvas = within(canvasElement);

    const textElement = canvas.getByRole('textbox');

    await userEvent.clear(textElement);

    await sleep(1000);

    await userEvent.type(textElement, '수정된 폴더', {
      delay: 100,
    });

    const buttonElement = canvas.getByText('폴더 수정하기');
    await userEvent.click(buttonElement);

    await sleep(1000);

    await waitFor(() => {
      expect(mock1).toHaveBeenCalledTimes(1);
    });
  },
};
