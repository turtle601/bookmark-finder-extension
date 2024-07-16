import { css } from '@emotion/react';
import { queryClient } from '@/shared/lib/react-query';

import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/test';
import { createMock, getMock } from 'storybook-addon-module-mock';

import type { Meta, StoryObj } from '@storybook/react';

import { bookmarkService } from '@/entities/bookmark/bookmark.queries';

import {
  createLinkMockData,
  makeBookmarkMockData,
} from '@/entities/bookmark/bookmark.mock';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import CreateLink from '@/features/bookmark/createLink';

const meta: Meta<typeof CreateLink> = {
  title: 'features/CreateLink',
  component: CreateLink,
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

type Story = StoryObj<typeof CreateLink>;

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

    const textElementList = canvas.getAllByRole('textbox');
    await userEvent.type(textElementList[0], '새 링크', {
      delay: 100,
    });

    await userEvent.type(textElementList[1], 'https://www.naver.com', {
      delay: 100,
    });

    const buttonElement = canvas.getByText('새로운 링크 만들기');
    await userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mock1).toBeCalled();
      expect(bookmarkService.getCache()).toEqual(createLinkMockData);
    });
  },
};
