import { createChromeRequest } from '@/shared/lib/fetch';

import type { Bookmark } from '@/entities/bookmark';

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
