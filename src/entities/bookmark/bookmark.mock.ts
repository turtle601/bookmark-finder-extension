import { Bookmark } from '@/entities/bookmark/bookmark.type';

export const findParentBookmarkNode = (
  bookmarks: Bookmark[],
  parentId: string,
): Bookmark | undefined => {
  for (const bookmark of bookmarks) {
    if (bookmark.id === parentId) return bookmark;
    if (bookmark.children) {
      const found = findParentBookmarkNode(bookmark.children, parentId);
      if (found) return found;
    }
  }
};

interface ICreateBookmarkParameter {
  bookmarks?: Bookmark[];
  parentId: string;
  title: string;
  url?: string;
}

export const createBookmark = ({
  bookmarks,
  parentId,
  title,
  url,
}: ICreateBookmarkParameter) => {
  if (!bookmarks) return bookmarks;

  const parentBookmarkTarget = findParentBookmarkNode(bookmarks, parentId);
  const newBookmark: Bookmark = url
    ? {
        id: 'newId',
        parentId,
        title,
        url,
        dateAdded: 12345,
      }
    : {
        id: 'newId',
        parentId,
        title,
        dateAdded: 12345,
        children: [],
      };

  if (parentBookmarkTarget) {
    if (parentBookmarkTarget.children) {
      parentBookmarkTarget.children = [
        ...parentBookmarkTarget.children,
        {
          ...newBookmark,
          index: parentBookmarkTarget.children.length,
        },
      ];
    } else {
      parentBookmarkTarget.children = [
        {
          ...newBookmark,
          index: 1,
        },
      ];
    }
  }

  return bookmarks;
};

export interface IUpdateBookmarkParameter {
  bookmarks?: Bookmark[];
  id: string;
  parentId: string;
  title: string;
  url?: string;
}

export const updateBookmark = ({
  bookmarks,
  id,
  parentId,
  title,
  url,
}: IUpdateBookmarkParameter) => {
  if (!bookmarks) return bookmarks;

  const parentBookmarkTarget = findParentBookmarkNode(bookmarks, parentId);

  if (parentBookmarkTarget && parentBookmarkTarget.children) {
    parentBookmarkTarget.children = parentBookmarkTarget.children.map(
      (bookmark) => {
        if (bookmark.id === id) {
          const updatedBookmark = url
            ? {
                ...bookmark,
                title,
                url,
              }
            : {
                ...bookmark,
                title,
              };

          return updatedBookmark;
        }
        return bookmark;
      },
    );
  }

  return bookmarks;
};

export const makeBookmarkMockData = () => {
  const defaultBookmarkMockData: Bookmark[] = [
    {
      id: '0',
      title: '',
      children: [
        {
          id: '1',
          parentId: '0',
          title: 'Bookmarks Bar',
          index: 0,
          dateAdded: 1617881086536,
          children: [
            {
              id: '2',
              parentId: '1',
              title: 'Google',
              url: 'https://www.google.com',
              index: 0,
              dateAdded: 1617881086537,
            },
            {
              id: '3',
              parentId: '1',
              title: 'YouTube',
              url: 'https://www.youtube.com',
              index: 1,
              dateAdded: 1617881086538,
            },
          ],
        },
        {
          id: '4',
          parentId: '0',
          title: 'Other Bookmarks',
          index: 1,
          dateAdded: 1617881086539,
          children: [
            {
              id: '5',
              parentId: '4',
              title: 'Example Site',
              url: 'https://www.example.com',
              index: 0,
              dateAdded: 1617881086540,
            },
          ],
        },
      ],
    },
  ];

  return defaultBookmarkMockData;
};

export const createFolderMockData: Bookmark[] = [
  {
    id: '0',
    title: '',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'Bookmarks Bar',
        index: 0,
        dateAdded: 1617881086536,
        children: [
          {
            id: '2',
            parentId: '1',
            title: 'Google',
            url: 'https://www.google.com',
            index: 0,
            dateAdded: 1617881086537,
          },
          {
            id: '3',
            parentId: '1',
            title: 'YouTube',
            url: 'https://www.youtube.com',
            index: 1,
            dateAdded: 1617881086538,
          },
        ],
      },
      {
        id: '4',
        parentId: '0',
        title: 'Other Bookmarks',
        index: 1,
        dateAdded: 1617881086539,
        children: [
          {
            id: '5',
            parentId: '4',
            title: 'Example Site',
            url: 'https://www.example.com',
            index: 0,
            dateAdded: 1617881086540,
          },
          {
            id: 'newId',
            parentId: '4',
            title: '새 폴더',
            index: 1,
            dateAdded: 12345,
            children: [],
          },
        ],
      },
    ],
  },
];

export const createLinkMockData: Bookmark[] = [
  {
    id: '0',
    title: '',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'Bookmarks Bar',
        index: 0,
        dateAdded: 1617881086536,
        children: [
          {
            id: '2',
            parentId: '1',
            title: 'Google',
            url: 'https://www.google.com',
            index: 0,
            dateAdded: 1617881086537,
          },
          {
            id: '3',
            parentId: '1',
            title: 'YouTube',
            url: 'https://www.youtube.com',
            index: 1,
            dateAdded: 1617881086538,
          },
        ],
      },
      {
        id: '4',
        parentId: '0',
        title: 'Other Bookmarks',
        index: 1,
        dateAdded: 1617881086539,
        children: [
          {
            id: '5',
            parentId: '4',
            title: 'Example Site',
            url: 'https://www.example.com',
            index: 0,
            dateAdded: 1617881086540,
          },
          {
            id: 'newId',
            parentId: '4',
            title: '새 링크',
            index: 1,
            url: 'https://www.naver.com',
            dateAdded: 12345,
          },
        ],
      },
    ],
  },
];

export const updateFolderMockData: Bookmark[] = [
  {
    id: '0',
    title: '',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'Bookmarks Bar',
        index: 0,
        dateAdded: 1617881086536,
        children: [
          {
            id: '2',
            parentId: '1',
            title: 'Google',
            url: 'https://www.google.com',
            index: 0,
            dateAdded: 1617881086537,
          },
          {
            id: '3',
            parentId: '1',
            title: 'YouTube',
            url: 'https://www.youtube.com',
            index: 1,
            dateAdded: 1617881086538,
          },
        ],
      },
      {
        id: '4',
        parentId: '0',
        title: '수정된 폴더',
        index: 1,
        dateAdded: 1617881086539,
        children: [
          {
            id: '5',
            parentId: '4',
            title: 'Example Site',
            url: 'https://www.example.com',
            index: 0,
            dateAdded: 1617881086540,
          },
        ],
      },
    ],
  },
];

export const updateLinkMockData: Bookmark[] = [
  {
    id: '0',
    title: '',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'Bookmarks Bar',
        index: 0,
        dateAdded: 1617881086536,
        children: [
          {
            id: '2',
            parentId: '1',
            title: 'Google',
            url: 'https://www.google.com',
            index: 0,
            dateAdded: 1617881086537,
          },
          {
            id: '3',
            parentId: '1',
            title: 'YouTube',
            url: 'https://www.youtube.com',
            index: 1,
            dateAdded: 1617881086538,
          },
        ],
      },
      {
        id: '4',
        parentId: '0',
        title: 'Other Bookmarks',
        index: 1,
        dateAdded: 1617881086539,
        children: [
          {
            id: '5',
            parentId: '4',
            title: '수정한 링크',
            url: 'https://www.naver.com',
            index: 0,
            dateAdded: 1617881086540,
          },
        ],
      },
    ],
  },
];
