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

interface IDeleteBookmarkLinkMutationParameter {
  bookmarkId: string;
}

export const deleteBookmarkLinkMutation = async (
  payload: IDeleteBookmarkLinkMutationParameter,
) => {
  return await createChromeRequest({
    action: 'deleteBookmarkLink',
    payload: { ...payload },
  });
};

interface IDeleteBookmarkFolderMutationParameter {
  folderId: string;
}

export const deleteBookmarkFolderMutation = async (
  payload: IDeleteBookmarkFolderMutationParameter,
) => {
  return await createChromeRequest({
    action: 'deleteBookmarkFolder',
    payload: { ...payload },
  });
};

interface IMoveBookmarkMutationParameter {
  id: Bookmark['id'];
  parentId: Bookmark['parentId'];
  index: Bookmark['index'];
}

export const moveBookmarkMutation = async (
  payload: IMoveBookmarkMutationParameter,
) => {
  return await createChromeRequest({
    action: 'moveBookmark',
    payload: { ...payload },
  });
};

// export const createNewChromeBookmarksMutation = async (
//   selectedBookmarks: Bookmark[],
// ) => {
//   const createNewBookmarks = async (bookmark: Bookmark) => {
//     const { parentId, title, url } = bookmark;

//     await createBoomarkMutation({ parentId: parentId as string, title, url });
//   };

//   const removeOldBookmarks = async (bookmark: Bookmark) => {
//     const { id } = bookmark;

//     await deleteBookmarkMutation({ bookmarkId: id });
//   };

//   const chromeBookmarks = bookmarkService.getCache();

//   if (chromeBookmarks) {
//     await traverseBookmarks(chromeBookmarks, removeOldBookmarks);
//   }

//   await traverseBookmarks(selectedBookmarks, createNewBookmarks);
// };
