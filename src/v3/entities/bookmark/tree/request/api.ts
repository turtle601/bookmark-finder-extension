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
