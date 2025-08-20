export interface IExtendedBookmarkTreeNode
  extends chrome.bookmarks.BookmarkTreeNode {
  isSelected?: boolean;
  children?: IExtendedBookmarkTreeNode[];
}

class BookmarkUtils {
  private _bookmarks: IExtendedBookmarkTreeNode[] = [];
  private _isSelectedAction: boolean = false;

  // 선택 불가능한 ID 목록
  private readonly _nonSelectableIds: string[] = ['0', '1', '2'];

  /**
   * 노드가 선택 가능한지 확인
   */
  private _isNodeSelectable(nodeId: string): boolean {
    return !this._nonSelectableIds.includes(nodeId);
  }

  /**
   * 북마크 트리를 초기화하고 내부 상태에 저장
   */
  public initialize(bookmarkTree: chrome.bookmarks.BookmarkTreeNode[]): void {
    const processNode = (
      node: chrome.bookmarks.BookmarkTreeNode,
    ): IExtendedBookmarkTreeNode => {
      return {
        ...node,
        isSelected: this.findNodeById(node.id)?.isSelected ?? false,
        children: node.children ? node.children.map(processNode) : undefined,
      };
    };

    this._bookmarks = bookmarkTree.map(processNode);
  }

  /**
   * 현재 북마크 트리 반환
   */
  public getBookmarks(): IExtendedBookmarkTreeNode[] {
    return structuredClone(this._bookmarks);
  }

  /**
   * 선택 액션 여부 반환
   */
  public getIsSelectedAction(): boolean {
    return this._isSelectedAction;
  }

  /**
   * 선택 액션 여부 설정
   */
  public setIsSelectedAction(isSelectedAction: boolean): void {
    this._isSelectedAction = isSelectedAction;
  }

  /**
   * 북마크 트리를 직접 설정
   */
  public setBookmarks(bookmarks: IExtendedBookmarkTreeNode[]): void {
    this._bookmarks = bookmarks;
  }

  public findNodeById(nodeId: string): IExtendedBookmarkTreeNode | null {
    const searchInNodes = (
      nodes: IExtendedBookmarkTreeNode[],
    ): IExtendedBookmarkTreeNode | null => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          return node;
        }

        if (node.children) {
          const found = searchInNodes(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    return searchInNodes(this._bookmarks);
  }

  public findParentNode(
    targetNodeId: string,
  ): IExtendedBookmarkTreeNode | null {
    const searchInNodes = (
      nodes: IExtendedBookmarkTreeNode[],
    ): IExtendedBookmarkTreeNode | null => {
      for (const node of nodes) {
        if (node.children) {
          if (node.children.some((child) => child.id === targetNodeId)) {
            return node;
          }

          const parent = searchInNodes(node.children);
          if (parent) return parent;
        }
      }
      return null;
    };

    return searchInNodes(this._bookmarks);
  }

  private _setChildrenSelection(
    node: IExtendedBookmarkTreeNode,
    isSelected: boolean,
  ): void {
    if (node.children) {
      node.children.forEach((child) => {
        child.isSelected = isSelected;
        this._setChildrenSelection(child, isSelected);
      });
    }
  }

  private _areAllChildrenSelected(node: IExtendedBookmarkTreeNode): boolean {
    if (!node.children || node.children.length === 0) {
      return true;
    }

    return node.children.every((child) => {
      return child.isSelected && this._areAllChildrenSelected(child);
    });
  }

  private _hasAnySelectedChildren(node: IExtendedBookmarkTreeNode): boolean {
    if (!node.children || node.children.length === 0) {
      return false;
    }

    return node.children.some((child) => {
      return child.isSelected || this._hasAnySelectedChildren(child);
    });
  }

  private _updateParentSelection(nodeId: string): void {
    const parent = this.findParentNode(nodeId);

    if (parent) {
      // 모든 자식이 선택되어 있으면 부모도 선택
      if (this._areAllChildrenSelected(parent)) {
        parent.isSelected = true;
      }
      // 선택된 자식이 하나도 없으면 부모도 해제
      else if (!this._hasAnySelectedChildren(parent)) {
        parent.isSelected = false;
      }
      // 일부만 선택된 경우 부모는 해제 (또는 indeterminate 상태로 처리 가능)
      else {
        parent.isSelected = false;
      }

      // 재귀적으로 상위 부모들도 업데이트
      this._updateParentSelection(parent.id);
    }
  }

  /**
   * 특정 노드를 선택
   */
  public selectNode(nodeId: string): boolean {
    if (!this._isNodeSelectable(nodeId)) {
      return false;
    }

    const targetNode = this.findNodeById(nodeId);

    if (!targetNode || targetNode.isSelected) {
      return false;
    }

    targetNode.isSelected = true;

    // 폴더인 경우: 모든 하위 노드들도 선택
    if (!targetNode.url) {
      this._setChildrenSelection(targetNode, true);
    }

    // // 상위 폴더들의 선택 상태 업데이트
    // this._updateParentSelection(nodeId);

    return true;
  }

  /**
   * 특정 노드의 선택을 해제
   */
  public deselectNode(nodeId: string): boolean {
    if (!this._isNodeSelectable(nodeId)) {
      return false;
    }

    const targetNode = this.findNodeById(nodeId);

    if (!targetNode || !targetNode.isSelected) {
      return false;
    }

    targetNode.isSelected = false;

    // 폴더인 경우: 모든 하위 노드들도 해제
    if (!targetNode.url) {
      this._setChildrenSelection(targetNode, false);
    }

    // 상위 폴더들의 선택 상태 업데이트
    this._updateParentSelection(nodeId);

    return true;
  }

  /**
   * 특정 노드의 선택 상태를 토글
   */
  public toggleSelection(nodeId: string): boolean {
    if (!this._isNodeSelectable(nodeId)) {
      return false;
    }

    const targetNode = this.findNodeById(nodeId);

    if (!targetNode) {
      return false;
    }

    if (targetNode.isSelected) {
      return this.deselectNode(nodeId);
    } else {
      return this.selectNode(nodeId);
    }
  }

  /**
   * 여러 노드를 한번에 선택
   */
  public selectMultiple(nodeIds: string[]): void {
    nodeIds
      .filter((id) => this._isNodeSelectable(id))
      .forEach((nodeId) => this.selectNode(nodeId));
  }

  /**
   * 모든 선택을 해제
   */
  public clearAllSelections(): void {
    const clearNode = (node: IExtendedBookmarkTreeNode): void => {
      node.isSelected = false;
      if (node.children) {
        node.children.forEach(clearNode);
      }
    };

    this._bookmarks.forEach(clearNode);
  }

  /**
   * 선택된 모든 노드들을 반환
   */
  public getSelectedNodes(): IExtendedBookmarkTreeNode[] {
    const selectedNodes: IExtendedBookmarkTreeNode[] = [];

    const collectSelected = (nodes: IExtendedBookmarkTreeNode[]): void => {
      nodes.forEach((node) => {
        if (node.isSelected && this._isNodeSelectable(node.id)) {
          selectedNodes.push(node);
        }
        if (node.children) {
          collectSelected(node.children);
        }
      });
    };

    collectSelected(this._bookmarks);
    return selectedNodes;
  }

  /**
   * 선택된 노드들의 ID 목록을 반환
   */
  public getSelectedIds(): string[] {
    return this.getSelectedNodes().map((node) => node.id);
  }

  /**
   * 선택된 노드 개수 반환
   */
  public getSelectedCount(): number {
    return this.getSelectedNodes().length;
  }

  /**
   * 특정 노드가 선택되어 있는지 확인
   */
  public isNodeSelected(nodeId: string): boolean {
    if (!this._isNodeSelectable(nodeId)) {
      return false;
    }

    const node = this.findNodeById(nodeId);
    return node ? !!node.isSelected : false;
  }

  /**
   * 모든 노드를 선택
   */
  public selectAll(): void {
    const selectNode = (node: IExtendedBookmarkTreeNode): void => {
      if (this._isNodeSelectable(node.id)) {
        node.isSelected = true;
      }

      if (node.children) {
        node.children.forEach(selectNode);
      }
    };

    this._bookmarks.forEach(selectNode);
  }

  /**
   * 선택된 노드가 있는지 확인
   */
  public hasSelectedNodes(): boolean {
    return this.getSelectedCount() > 0;
  }

  /**
   * 모든 노드를 선택
   */
  public deselectAll(): void {
    const selectNode = (node: IExtendedBookmarkTreeNode): void => {
      node.isSelected = false;
      if (node.children) {
        node.children.forEach(selectNode);
      }
    };

    this._bookmarks.forEach(selectNode);
  }

  public getTopLevelSelectedNodes(): string[] {
    const selectedNodes: IExtendedBookmarkTreeNode[] = [];

    const collectSelected = (nodes: IExtendedBookmarkTreeNode[]): void => {
      nodes.forEach((node) => {
        if (node.isSelected && this._isNodeSelectable(node.id)) {
          selectedNodes.push(node);
        }

        if (node.children && !node.isSelected) {
          collectSelected(node.children);
        }
      });
    };

    collectSelected(this._bookmarks);

    return selectedNodes.map((node) => node.id);
  }
}

export const bookmarkUtils: BookmarkUtils = new BookmarkUtils();
