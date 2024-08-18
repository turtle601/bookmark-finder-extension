import { chromeError } from '@/shared/lib/fetch/fetch.error';
import { createChromeRequest } from '@/shared/lib/fetch';

import type { Bookmark } from '@/entities/bookmark';
import type { ICategoryBookmark } from '@/entities/classify';

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

interface IGetBookmarkChildrenMutationParameter {
  folderId: string;
}

interface IGetBookmarkChildrenMutationReturnType {
  isSuccess: boolean;
  data: Bookmark[];
}

export const getBookmarkChildrenMutation = async (
  payload: IGetBookmarkChildrenMutationParameter,
): Promise<IGetBookmarkChildrenMutationReturnType> => {
  return await createChromeRequest({
    action: 'getBookmarkChildren',
    payload: { ...payload },
  });
};

const removeChildren = async ({ folderId }: { folderId: string }) => {
  const { data: bookmarkbarFolderChildren } = await getBookmarkChildrenMutation(
    {
      folderId,
    },
  );

  bookmarkbarFolderChildren.forEach(async (bookmark) => {
    if (bookmark.url) {
      await deleteBookmarkLinkMutation({ bookmarkId: bookmark.id });
    } else {
      await deleteBookmarkFolderMutation({ folderId: bookmark.id });
    }
  });
};

const removeAllBookmark = async () => {
  await removeChildren({ folderId: '1' });
  await removeChildren({ folderId: '2' });
};

interface ICreateAIBookmarkParameter {
  parentId: '1' | '2';
  aiBookmarkData: ICategoryBookmark[];
}

const createAiBookmark = async ({
  parentId,
  aiBookmarkData,
}: ICreateAIBookmarkParameter) => {
  aiBookmarkData.forEach(async (aiBookmark) => {
    const { bookmark: folder } = await createBoomarkMutation({
      parentId,
      title: aiBookmark.category,
    });

    aiBookmark.bookmark.forEach(async (bookmark) => {
      await createBoomarkMutation({
        parentId: folder.id,
        title: bookmark.title,
        url: bookmark.url,
      });
    });
  });
};

interface IUpdateAIBookmarkMutationParameter {
  type: string;
  aiBookmarkData: ICategoryBookmark[];
}

export const updateAIBookmark = async ({
  type,
  aiBookmarkData,
}: IUpdateAIBookmarkMutationParameter) => {
  try {
    switch (type) {
      case 'TYPE-1':
        await removeAllBookmark();
        await createAiBookmark({ parentId: '1', aiBookmarkData });
        return;
      case 'TYPE-2':
        await removeAllBookmark();
        await createAiBookmark({ parentId: '2', aiBookmarkData });
        return;
      case 'TYPE-3':
        await createAiBookmark({ parentId: '2', aiBookmarkData });
        return;
      default:
        throw chromeError({
          isSuccess: false,
          error: Error('예측하지 못한 입력값이 들어왔습니다'),
        });
    }
  } catch (err: unknown) {
    throw chromeError({ isSuccess: false, error: err });
  }
};
