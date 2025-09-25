interface ILinearizedTree {
  id: string;
  start: number;
  end: number;
  parentIds: Set<string>;
}

class BookmarkTreeOptimizer {
  private _linearizedTree: ILinearizedTree[] = []; // 캐시데이터

  public reset(tree: chrome.bookmarks.BookmarkTreeNode) {
    const result: ILinearizedTree[] = [];
    let count = 0;

    const traverse = (
      node: chrome.bookmarks.BookmarkTreeNode,
      parentIds: Set<string> = new Set(),
    ): number => {
      const start = count++;
      const nodeIndex = result.length;

      const currentParentIds = new Set([...parentIds, node.id]);

      // 노드를 먼저 추가 (end는 나중에 업데이트)
      result.push({
        id: node.id,
        start: start,
        end: start,
        parentIds: new Set(parentIds),
      });

      let end = start;

      if (node.children) {
        for (const child of node.children) {
          end = traverse(child, currentParentIds);
        }
      }

      result[nodeIndex].end = end;

      return end;
    };

    // 루트 노드의 모든 자식을 순회하도록 수정
    if (tree.children) {
      for (const child of tree.children) {
        traverse(child, new Set([tree.id]));
      }
    }

    this._linearizedTree = [...result];
  }

  public getLinearizedSubTree(id: string) {
    const node = this._linearizedTree.find((node) => node.id === id);

    return this._linearizedTree.filter(
      (v, i) => node.start < i && i <= node.end,
    );
  }

  public getLinearizedTree() {
    return this._linearizedTree;
  }

  public getAncestors(childId: string) {
    const node = this._linearizedTree.find((node) => node.id === childId);
    return node?.parentIds ?? new Set();
  }
}

export const bookmarkTreeOptimizer: BookmarkTreeOptimizer =
  new BookmarkTreeOptimizer();
