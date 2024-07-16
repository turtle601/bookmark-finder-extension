import { css } from '@emotion/react';
import { queryClient } from '@/shared/lib/react-query';

import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';

import type { Meta, StoryObj } from '@storybook/react';

import { bookmarkService } from '@/entities/bookmark/bookmark.queries';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import UpdateLink from '@/features/bookmark/updateLink';

import { makeBookmarkMockData, updateLinkMockData } from '@/entities/bookmark';

const meta: Meta<typeof UpdateLink> = {
  title: 'features/UpdateLink',
  component: UpdateLink,
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

type Story = StoryObj<typeof UpdateLink>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DefaultInteraction: Story = {
  args: {
    id: '5',
    parentId: '4',
    url: 'https://www.example.com',
    title: 'Example Site',
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

    const textElementList = canvas.getAllByRole('textbox');

    await userEvent.clear(textElementList[0]);

    await userEvent.type(textElementList[0], '수정한 링크', {
      delay: 100,
    });

    await userEvent.clear(textElementList[1]);

    await userEvent.type(textElementList[1], 'https://www.naver.com', {
      delay: 100,
    });

    const buttonElement = canvas.getByText('링크 수정하기');
    await userEvent.click(buttonElement);

    await sleep(1000);

    await waitFor(() => {
      expect(mock1).toBeCalled();
      expect(bookmarkService.getCache()).toEqual(updateLinkMockData);
    });
  },
};
