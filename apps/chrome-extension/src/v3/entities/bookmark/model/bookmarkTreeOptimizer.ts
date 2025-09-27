interface ILinearizedTree {
  id: string;
  start: number;
  end: number;
  parentIds: Set<string>;
}

class BookmarkTreeOptimizer {
  private _linearizedTree: ILinearizedTree[] = []; // 캐시데이터
  private _nodeIndexMap: Map<string, number> = new Map(); // ID를 인덱스로 매핑하는 맵

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

    this._nodeIndexMap.clear();
    this._linearizedTree.forEach((node, index) => {
      this._nodeIndexMap.set(node.id, index);
    });
  }

  public getLinearizedSubTree(id: string) {
    const nodeIndex = this._nodeIndexMap.get(id);
    if (nodeIndex === undefined) return [];

    const node = this._linearizedTree[nodeIndex];
    return this._linearizedTree.slice(node.start + 1, node.end + 1);
  }

  public getLinearizedTree() {
    return this._linearizedTree;
  }

  public getAncestors(childId: string): Set<string> {
    const nodeIndex = this._nodeIndexMap.get(childId);
    if (nodeIndex === undefined) return new Set();

    return this._linearizedTree[nodeIndex].parentIds;
  }

  public getTopLevelBookmarkIds(selectedBookmarkIds: Set<string>) {
    return Array.from(selectedBookmarkIds).filter((id) => {
      const ancestors = this.getAncestors(id);
      return !Array.from(ancestors).some((ancestorId) =>
        selectedBookmarkIds.has(ancestorId),
      );
    });
  }
}

export const bookmarkTreeOptimizer: BookmarkTreeOptimizer =
  new BookmarkTreeOptimizer();
