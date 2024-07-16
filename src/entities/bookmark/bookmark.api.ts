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

export const createBoomarkMutation = async (
  payload: ICreateBookmarkMutationParameter,
) => {
  await createChromeRequest({
    action: 'createBookmark',
    payload: { ...payload },
  });
};

interface IDeleteBookmarkMutationParameter {
  bookmarkId: string;
}

export const deleteBookmarkMutation = async (
  paylaod: IDeleteBookmarkMutationParameter,
) => {
  await createChromeRequest({
    action: 'deleteBookmark',
    payload: { ...paylaod },
  });
};

interface IUpdateBookmarkMutationParameter {
  id: string;
  parentId: string;
  title: string;
  url?: string;
}

export const updateBookmarkMutation = async (
  paylaod: IUpdateBookmarkMutationParameter,
) => {
  await createChromeRequest({
    action: 'updateBookmark',
    payload: { ...paylaod },
  });
};
