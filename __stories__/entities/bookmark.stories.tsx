import { BookmarkNode } from '@/entities/bookmark';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BookmarkNode> = {
  title: 'entities/BookmarkNode',
  component: BookmarkNode,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof BookmarkNode>;

export const Link: Story = {
  args: {
    size: 24,
    bookmark: {
      id: '3',
      title: 'Google',
      url: 'https://www.google.com',
      dateAdded: Date.now(),
      parentId: '2',
      index: 0,
    },
  },
};

export const Folder: Story = {
  args: {
    bookmark: {
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
  },
};
