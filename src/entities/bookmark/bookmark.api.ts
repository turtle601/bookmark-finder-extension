import { createChromeRequest } from '@/shared/lib/fetch';

import { bookmarkService, type Bookmark } from '@/entities/bookmark';
import { traverseBookmarks } from '@/entities/bookmark/bookmark.lib';

interface IBookmarkQueryResponse {
  isSuccess: boolean;
  data: Bookmark[];
}

export const bookmarkQuery = async (): Promise<Bookmark[]> => {
  const response = await createChromeRequest<IBookmarkQueryResponse>({
    action: 'getBookmarks',
  });

  return response.data;
};

interface ICreateBookmarkMutationParameter {
  title: string;
  parentId: string;
  url?: string;
}

interface ICreateBookmarkReturnType {
  isSuccess: boolean;
  bookmark: Bookmark;
}

export const createBoomarkMutation = async (
  payload: ICreateBookmarkMutationParameter,
): Promise<ICreateBookmarkReturnType> => {
  return await createChromeRequest({
    action: 'createBookmark',
    payload: { ...payload },
  });
};

interface IUpdateBookmarkMutationParameter {
  id: string;
  parentId: string;
  title: string;
  url?: string;
}

interface IUpdateBookmarkReturnType {
  isSuccess: boolean;
  bookmark: Bookmark;
}

export const updateBookmarkMutation = async (
  paylaod: IUpdateBookmarkMutationParameter,
): Promise<IUpdateBookmarkReturnType> => {
  return await createChromeRequest({
    action: 'updateBookmark',
    payload: { ...paylaod },
  });
};

interface IDeleteBookmarkMutationParameter {
  bookmarkId: string;
}

interface IDeleteBookmarkReturnType {
  isSuccess: boolean;
}

export const deleteBookmarkMutation = async (
  paylaod: IDeleteBookmarkMutationParameter,
): Promise<IDeleteBookmarkReturnType> => {
  return await createChromeRequest({
    action: 'deleteBookmark',
    payload: { ...paylaod },
  });
};

export const createNewChromeBookmarksMutation = async (
  selectedBookmarks: Bookmark[],
) => {
  const createNewBookmarks = async (bookmark: Bookmark) => {
    const { parentId, title, url } = bookmark;

    await createBoomarkMutation({ parentId: parentId as string, title, url });
  };

  const removeOldBookmarks = async (bookmark: Bookmark) => {
    const { id } = bookmark;

    await deleteBookmarkMutation({ bookmarkId: id });
  };

  const chromeBookmarks = bookmarkService.getCache();

  if (chromeBookmarks) {
    await traverseBookmarks(chromeBookmarks, removeOldBookmarks);
  }

  await traverseBookmarks(selectedBookmarks, createNewBookmarks);
};
