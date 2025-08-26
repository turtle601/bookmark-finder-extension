import { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';

export const getSelectedBookmarks = (data: IBookmarkTreeStorage[]) => {
  const selectedNodes: IBookmarkTreeStorage[] = [];

  const collectSelected = (nodes: IBookmarkTreeStorage[]): void => {
    nodes.forEach((node) => {
      if (node.isSelected) {
        selectedNodes.push(node);
      }

      if (node.children) {
        collectSelected(node.children);
      }
    });
  };

  collectSelected(data);

  return selectedNodes;
};

export const getSelectedBookmarkLinks = (data: IBookmarkTreeStorage[]) => {
  const selectedNodes: IBookmarkTreeStorage[] = [];

  const collectSelected = (nodes: IBookmarkTreeStorage[]): void => {
    nodes.forEach((node) => {
      if (node.isSelected && node.url) {
        selectedNodes.push(node);
      }

      if (node.children) {
        collectSelected(node.children);
      }
    });
  };

  collectSelected(data);

  return selectedNodes;
};

export const getRootBookmarks = (data: IBookmarkTreeStorage[]) => {
  return data[0].children;
};
