import { bookmarkTreeOptimizer } from './bookmarkTreeOptimizer';

// 실제 크롬 북마크 구조를 모방한 테스트 데이터
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
            id: '2',
            parentId: '1',
            title: '북마크 관리자',
            children: [
              {
                id: '3',
                parentId: '2',
                title: 'Google',
                url: 'https://www.google.com',
                dateAdded: 1640995200000,
              },
              {
                id: '4',
                parentId: '2',
                title: 'YouTube',
                url: 'https://www.youtube.com',
                dateAdded: 1640995200000,
              },
            ],
          },
        ],
      },
      {
        id: '5',
        parentId: '0',
        title: '기타 북마크',
        children: [
          {
            id: '6',
            parentId: '5',
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
            parentId: '5',
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
  };
};

describe('크롬 북마크 데이터를 이용한 bookmarkTreeOptimizer 테스트', () => {
  describe('실제 북마크 구조 테스트', () => {
    it('실제 북마크 트리에서 특정 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // '개발' 폴더의 자식들 찾기
      const result = bookmarkTreeOptimizer.getLinearizedSubTree('6');
      const expectedChildIds = ['7', '8', '9']; // GitHub, Stack Overflow, MDN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 특정 북마크의 조상들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // 'GitHub' 북마크의 조상들 찾기
      const result = bookmarkTreeOptimizer.getAncestors('7');
      const expectedAncestors = new Set(['0', '5', '6']); // 북마크 바, 기타 북마크, 개발

      expect(result).toEqual(expectedAncestors);
    });

    it('실제 북마크 트리에서 루트 레벨 폴더들의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // '북마크' 폴더의 자식들 찾기
      const result = bookmarkTreeOptimizer.getLinearizedSubTree('1');
      const expectedChildIds = ['2', '3', '4']; // 북마크 관리자, Google, YouTube

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 뉴스 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // '뉴스' 폴더의 자식들 찾기
      const result = bookmarkTreeOptimizer.getLinearizedSubTree('10');
      const expectedChildIds = ['11', '12']; // BBC News, CNN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 YouTube 북마크의 조상들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // 'YouTube' 북마크의 조상들 찾기
      const result = bookmarkTreeOptimizer.getAncestors('4');
      const expectedAncestors = new Set(['0', '1', '2']); // 북마크 바, 북마크, 북마크 관리자

      expect(result).toEqual(expectedAncestors);
    });

    it('실제 북마크 트리에서 기타 북마크 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // '기타 북마크' 폴더의 자식들 찾기
      const result = bookmarkTreeOptimizer.getLinearizedSubTree('5');
      const expectedChildIds = ['6', '7', '8', '9', '10', '11', '12']; // 개발, GitHub, Stack Overflow, MDN, 뉴스, BBC News, CNN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });
  });

  describe('엣지 케이스 테스트', () => {
    it('루트 노드의 조상은 없다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      const result = bookmarkTreeOptimizer.getAncestors('0');

      expect(result).toEqual(new Set());
    });

    it('존재하지 않는 노드의 조상을 찾으면 빈 Set을 반환한다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      const result = bookmarkTreeOptimizer.getAncestors('nonExistent');

      expect(result).toEqual(new Set());
    });

    it('리프 노드(북마크)의 자식은 없다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      bookmarkTreeOptimizer.reset(bookmarkTree);

      // 'Google' 북마크의 자식들 찾기 (리프 노드)
      const result = bookmarkTreeOptimizer.getLinearizedSubTree('3');

      expect(result).toEqual([]);
    });
  });
});
