import type { IGenericResponse } from '@/v3/shared/utils/request/type';

import { createChromeRequest } from '@/v3/shared/utils/request';

interface IBookmarkTreeResponse extends IGenericResponse {
  data: chrome.bookmarks.BookmarkTreeNode[];
}

export const getBookmarkTree = async (): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> => {
  const response = await createChromeRequest<IBookmarkTreeResponse>({
    action: 'getBookmarkTree',
  });

  return response.data;
};

export const moveBookmark = async (payload: {
  id: string;
  parentId: string;
  index: number;
}) => {
  return await createChromeRequest({
    action: 'moveBookmark',
    payload: { ...payload },
  });
};

export const toggleSelectedBookmark = async (payload: { nodeId: string }) => {
  return await createChromeRequest({
    action: 'toggleSelectedBookmark',
    payload: { ...payload },
  });
};

export const selectBookmark = async (payload: { id: string }) => {
  return await createChromeRequest({
    action: 'selectBookmark',
    payload: { ...payload },
  });
};

export const selectAllBookmarks = async () => {
  return await createChromeRequest({
    action: 'selectAllBookmarks',
  });
};

export const deselectAllBookmarks = async () => {
  return await createChromeRequest({
    action: 'deselectAllBookmarks',
  });
};

export const getTopLevelSelectedNodes = async () => {
  return await createChromeRequest<{
    isSuccess: boolean;
    data: string[];
  }>({
    action: 'getTopLevelSelectedNodes',
  });
};

export const deleteBookmark = async (payload: { id: string }) => {
  return await createChromeRequest({
    action: 'deleteBookmark',
    payload: { ...payload },
  });
};
