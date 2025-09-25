import { renderHook, act } from '@testing-library/react'; // React v18 이후

import { bookmarkTreeOptimizer } from '@/v3/entities/bookmark/model/bookmarkTreeOptimizer';

import { useSelectBookmarkController } from './useSelectBookmarkController';
import { useSelectBookmarkStore } from '@/v3/entities/bookmark/model/store/useSelectBookmarkStore';

const createRealisticBookmarkTree = (): chrome.bookmarks.BookmarkTreeNode => {
  return {
    id: '0',
    title: '북마크 바',
    children: [
      {
        id: '1',
        parentId: '0',
        title: '북마크',
        children: [
          {
            id: '3',
            parentId: '1',
            title: '북마크 관리자',
            children: [
              {
                id: '4',
                parentId: '3',
                title: 'Google',
                url: 'https://www.google.com',
                dateAdded: 1640995200000,
              },
              {
                id: '5',
                parentId: '3',
                title: 'YouTube',
                url: 'https://www.youtube.com',
                dateAdded: 1640995200000,
              },
            ],
          },
          {
            id: '2',
            parentId: '0',
            title: '기타 북마크',
            children: [
              {
                id: '6',
                parentId: '2',
                title: '개발',
                children: [
                  {
                    id: '7',
                    parentId: '6',
                    title: 'GitHub',
                    url: 'https://github.com',
                    dateAdded: 1640995200000,
                  },
                  {
                    id: '8',
                    parentId: '6',
                    title: 'Stack Overflow',
                    url: 'https://stackoverflow.com',
                    dateAdded: 1640995200000,
                  },
                  {
                    id: '9',
                    parentId: '6',
                    title: 'MDN',
                    url: 'https://developer.mozilla.org',
                    dateAdded: 1640995200000,
                  },
                ],
              },
              {
                id: '10',
                parentId: '2',
                title: '뉴스',
                children: [
                  {
                    id: '11',
                    parentId: '10',
                    title: 'BBC News',
                    url: 'https://www.bbc.com/news',
                    dateAdded: 1640995200000,
                  },
                  {
                    id: '12',
                    parentId: '10',
                    title: 'CNN',
                    url: 'https://www.cnn.com',
                    dateAdded: 1640995200000,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};

describe('useBookmarkSelector hook 동작 검증', () => {
  beforeEach(() => {
    useSelectBookmarkStore.setState({ selectedBookmarkIds: new Set() });
    bookmarkTreeOptimizer.reset(createRealisticBookmarkTree());
  });

  it('단일 선택: 개발 폴더(id: 6) 선택 시 하위 북마크(id: 7, 8, 9)들도 선택된다.', () => {
    const { result } = renderHook(() => useSelectBookmarkController());

    const selectedBookmark = {
      id: '10',
      parentId: '2',
      title: '뉴스',
      children: [
        {
          id: '11',
          parentId: '10',
          title: 'BBC News',
          url: 'https://www.bbc.com/news',
          dateAdded: 1640995200000,
        },
        {
          id: '12',
          parentId: '10',
          title: 'CNN',
          url: 'https://www.cnn.com',
          dateAdded: 1640995200000,
        },
      ],
    };

    act(() => {
      result.current.selectBookmark(selectedBookmark);
    });

    expect(result.current.selectedBookmarkIds).toEqual(
      new Set(['10', '11', '12']),
    );
  });

  it('단일 선택 해제: 개발 폴더(id: 10) 선택 후 하위 북마크(id: 11) 선택 해제 시 개발 폴더(id: 10)도 선택 해제된다.', () => {
    const { result } = renderHook(() => useSelectBookmarkController());

    const selectedBookmark = {
      id: '10',
      parentId: '2',
      title: '뉴스',
      children: [
        {
          id: '11',
          parentId: '10',
          title: 'BBC News',
          url: 'https://www.bbc.com/news',
          dateAdded: 1640995200000,
        },
        {
          id: '12',
          parentId: '10',
          title: 'CNN',
          url: 'https://www.cnn.com',
          dateAdded: 1640995200000,
        },
      ],
    };

    act(() => {
      result.current.selectBookmark(selectedBookmark);
    });

    act(() => {
      result.current.deselectBookmark(selectedBookmark.children[0]);
    });

    // 북마크 선택 해제 시 하위 북마크도 선택 해제된다. (개발 폴더(id: 10), 하위북마크 (id: 11) 이 선택 해제되어 id: 12만 선택된 상태가 된다.)
    expect(result.current.selectedBookmarkIds).toEqual(new Set(['12']));
  });

  it('전체 선택: 개발 폴더(id: 6) 선택 시 하위 북마크(id: 7, 8, 9)들도 선택된다.', () => {
    const { result } = renderHook(() => useSelectBookmarkController());

    const selectedBookmark = {
      id: '10',
      parentId: '2',
      title: '뉴스',
      children: [
        {
          id: '11',
          parentId: '10',
          title: 'BBC News',
          url: 'https://www.bbc.com/news',
          dateAdded: 1640995200000,
        },
        {
          id: '12',
          parentId: '10',
          title: 'CNN',
          url: 'https://www.cnn.com',
          dateAdded: 1640995200000,
        },
      ],
    };

    act(() => {
      result.current.selectBookmark(selectedBookmark);
    });

    expect(result.current.selectedBookmarkIds).toEqual(
      new Set(['10', '11', '12']),
    );
  });
});
