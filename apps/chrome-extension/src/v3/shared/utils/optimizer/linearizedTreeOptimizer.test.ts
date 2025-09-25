import { linearizedTreeOptimizer } from './linearizedTreeOptimizer';

const makeTwoDepthTree = () => {
  return {
    id: 'root',
    children: [
      {
        id: 'A',
        children: [
          {
            id: 'A1',
            children: [{ id: 'A1a' }, { id: 'A1b' }],
          },
          {
            id: 'A2',
            children: [{ id: 'A2a' }],
          },
        ],
      },
      {
        id: 'B',
        children: [{ id: 'B1' }, { id: 'B2' }],
      },
    ],
  };
};

const makeThreeDepthTree = () => {
  return {
    id: 'root',
    children: [
      {
        id: 'A',
        children: [
          {
            id: 'A1',
            children: [
              {
                id: 'A1a',
                children: [{ id: 'A1a1' }, { id: 'A1a2' }],
              },
              {
                id: 'A1b',
                children: [{ id: 'A1b1' }],
              },
            ],
          },
          {
            id: 'A2',
            children: [
              {
                id: 'A2a',
                children: [{ id: 'A2a1' }],
              },
            ],
          },
        ],
      },
      {
        id: 'B',
        children: [
          {
            id: 'B1',
            children: [{ id: 'B1a' }, { id: 'B1b' }],
          },
          {
            id: 'B2',
            children: [{ id: 'B2a' }],
          },
        ],
      },
    ],
  };
};

const makeFourDepthTree = () => {
  return {
    id: 'root',
    children: [
      {
        id: 'A',
        children: [
          {
            id: 'A1',
            children: [
              {
                id: 'A1a',
                children: [
                  {
                    id: 'A1a1',
                    children: [{ id: 'A1a1a' }, { id: 'A1a1b' }],
                  },
                  {
                    id: 'A1a2',
                    children: [{ id: 'A1a2a' }],
                  },
                ],
              },
              {
                id: 'A1b',
                children: [
                  {
                    id: 'A1b1',
                    children: [{ id: 'A1b1a' }],
                  },
                ],
              },
            ],
          },
          {
            id: 'A2',
            children: [
              {
                id: 'A2a',
                children: [
                  {
                    id: 'A2a1',
                    children: [{ id: 'A2a1a' }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'B',
        children: [
          {
            id: 'B1',
            children: [
              {
                id: 'B1a',
                children: [
                  {
                    id: 'B1a1',
                    children: [{ id: 'B1a1a' }, { id: 'B1a1b' }],
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

describe('트리 탐색 최적화 관련 로직(linearizedTreeOptimizer) 테스트', () => {
  it('2 depth 트리에서 특정 노드(id: A1)의 자식 노드(id: A1a, A1b)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeTwoDepthTree());

    const result = linearizedTreeOptimizer.getLinearizedSubTree('A1');

    expect(result.map((node) => node.id)).toEqual(['A1a', 'A1b']);
  });

  it('2 depth 트리에서 특정 노드(id: A1a)의 부모 노드(id: A1, root)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeTwoDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('A1a');

    expect(result).toEqual(new Set(['root', 'A', 'A1']));
  });

  it('3 depth 트리에서 특정 노드(id: A1)의 자식 노드(id: A1a, A1b)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeThreeDepthTree());

    const result = linearizedTreeOptimizer.getLinearizedSubTree('A1');

    expect(result.map((node) => node.id)).toEqual([
      'A1a',
      'A1a1',
      'A1a2',
      'A1b',
      'A1b1',
    ]);
  });

  it('3 depth 트리에서 특정 노드(id: A1a)의 부모 노드(id: A1, A, root)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeThreeDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('A1a');

    expect(result).toEqual(new Set(['root', 'A', 'A1']));
  });

  it('3 depth 트리에서 특정 노드(id: A1a1)의 부모 노드(id: A1a, A1, A, root)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeThreeDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('A1a1');

    expect(result).toEqual(new Set(['root', 'A', 'A1', 'A1a']));
  });

  it('4 depth 트리에서 특정 노드(id: A1)의 자식 노드들을 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getLinearizedSubTree('A1');

    expect(result.map((node) => node.id)).toEqual([
      'A1a',
      'A1a1',
      'A1a1a',
      'A1a1b',
      'A1a2',
      'A1a2a',
      'A1b',
      'A1b1',
      'A1b1a',
    ]);
  });

  it('4 depth 트리에서 특정 노드(id: A1a)의 부모 노드(id: A1, A, root)를 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('A1a');

    expect(result).toEqual(new Set(['root', 'A', 'A1']));
  });

  it('4 depth 트리에서 특정 노드(id: A1a1a)의 부모 노드들을 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('A1a1a');

    expect(result).toEqual(new Set(['root', 'A', 'A1', 'A1a', 'A1a1']));
  });

  it('4 depth 트리에서 특정 노드(id: B1a1a)의 부모 노드들을 찾을 수 있다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('B1a1a');

    expect(result).toEqual(new Set(['root', 'B', 'B1', 'B1a', 'B1a1']));
  });

  it('루트 노드의 조상은 없다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('root');

    expect(result).toEqual(new Set());
  });

  it('존재하지 않는 노드의 조상을 찾으면 빈 Set을 반환한다.', () => {
    linearizedTreeOptimizer.reset(makeFourDepthTree());

    const result = linearizedTreeOptimizer.getAncestors('nonExistent');

    expect(result).toEqual(new Set());
  });
});

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

describe('크롬 북마크 데이터를 이용한 LinearizedTreeOptimizer 테스트', () => {
  describe('실제 북마크 구조 테스트', () => {
    it('실제 북마크 트리에서 특정 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // '개발' 폴더의 자식들 찾기
      const result = linearizedTreeOptimizer.getLinearizedSubTree('6');
      const expectedChildIds = ['7', '8', '9']; // GitHub, Stack Overflow, MDN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 특정 북마크의 조상들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // 'GitHub' 북마크의 조상들 찾기
      const result = linearizedTreeOptimizer.getAncestors('7');
      const expectedAncestors = new Set(['0', '5', '6']); // 북마크 바, 기타 북마크, 개발

      expect(result).toEqual(expectedAncestors);
    });

    it('실제 북마크 트리에서 루트 레벨 폴더들의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // '북마크' 폴더의 자식들 찾기
      const result = linearizedTreeOptimizer.getLinearizedSubTree('1');
      const expectedChildIds = ['2', '3', '4']; // 북마크 관리자, Google, YouTube

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 뉴스 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // '뉴스' 폴더의 자식들 찾기
      const result = linearizedTreeOptimizer.getLinearizedSubTree('10');
      const expectedChildIds = ['11', '12']; // BBC News, CNN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });

    it('실제 북마크 트리에서 YouTube 북마크의 조상들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // 'YouTube' 북마크의 조상들 찾기
      const result = linearizedTreeOptimizer.getAncestors('4');
      const expectedAncestors = new Set(['0', '1', '2']); // 북마크 바, 북마크, 북마크 관리자

      expect(result).toEqual(expectedAncestors);
    });

    it('실제 북마크 트리에서 기타 북마크 폴더의 자식들을 찾을 수 있다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // '기타 북마크' 폴더의 자식들 찾기
      const result = linearizedTreeOptimizer.getLinearizedSubTree('5');
      const expectedChildIds = ['6', '7', '8', '9', '10', '11', '12']; // 개발, GitHub, Stack Overflow, MDN, 뉴스, BBC News, CNN

      expect(result.map((node) => node.id)).toEqual(expectedChildIds);
    });
  });

  describe('엣지 케이스 테스트', () => {
    it('루트 노드의 조상은 없다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      const result = linearizedTreeOptimizer.getAncestors('0');

      expect(result).toEqual(new Set());
    });

    it('존재하지 않는 노드의 조상을 찾으면 빈 Set을 반환한다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      const result = linearizedTreeOptimizer.getAncestors('nonExistent');

      expect(result).toEqual(new Set());
    });

    it('리프 노드(북마크)의 자식은 없다', () => {
      const bookmarkTree = createRealisticBookmarkTree();

      linearizedTreeOptimizer.reset(bookmarkTree);

      // 'Google' 북마크의 자식들 찾기 (리프 노드)
      const result = linearizedTreeOptimizer.getLinearizedSubTree('3');

      expect(result).toEqual([]);
    });
  });
});
