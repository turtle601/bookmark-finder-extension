import { expect } from '@storybook/jest';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

import ClassifiedBookmarkForm from '@/features/autoCategorization/classifiedBookmarkForm';
import ModalLayer from '@/shared/ui/modalLayer';

import * as bookmarkApi from '@/entities/bookmark/bookmark.api';

import { createMock, getMock } from 'storybook-addon-module-mock';
import { classifyService } from '@/entities/classify';
import { IClassifiedBookmark } from '@/entities/classify/classify.type';
import { userEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof ClassifiedBookmarkForm> = {
  title: 'features/ClassifiedBookmarkForm',
  component: ClassifiedBookmarkForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div
        css={css({
          width: '340px',
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

type Story = StoryObj<typeof ClassifiedBookmarkForm>;

const classifiedBookmarks: IClassifiedBookmark[] = [
  {
    type: 'type 1',
    bookmarks: [
      {
        id: '1',
        title: 'Bookmarks Bar',
        dateAdded: Date.now(),
        children: [
          {
            id: '2',
            title: 'Tech Sites',
            dateAdded: Date.now(),
            children: [
              {
                id: '3',
                title: 'Google',
                url: 'https://www.google.com',
                dateAdded: Date.now(),
                parentId: '2',
                index: 0,
              },
            ],
            parentId: '1',
            dateGroupModified: Date.now(),
            index: 0,
          },
        ],
        index: 0,
      },
    ],
  },
  {
    type: 'type 2',
    bookmarks: [
      {
        id: '4',
        title: 'Bookmarks Bar2',
        dateAdded: Date.now(),
        children: [
          {
            id: '5',
            title: 'Tech Sites2',
            dateAdded: Date.now(),
            children: [
              {
                id: '6',
                title: 'Google',
                url: 'https://www.google.com',
                dateAdded: Date.now(),
                parentId: '5',
                index: 0,
              },
            ],
            parentId: '4',
            dateGroupModified: Date.now(),
            index: 0,
          },
        ],
        index: 0,
      },
    ],
  },
];

export const Default: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock1 = createMock(
          bookmarkApi,
          'createNewChromeBookmarksMutation',
        );
        return mock1;
      },
    },
  },

  play: async ({ canvasElement, parameters }) => {
    const mock1 = getMock(
      parameters,
      bookmarkApi,
      'createNewChromeBookmarksMutation',
    );

    classifyService.setCache(classifiedBookmarks);

    const canvas = within(canvasElement);
    const checkbox = await canvas.findByTestId('type 1');

    await userEvent.click(checkbox);

    const button = await canvas.findByText('type 1 수정');
    await userEvent.click(button);

    await waitFor(() => {
      expect(mock1).toHaveBeenCalledTimes(1);
    });
  },
};
