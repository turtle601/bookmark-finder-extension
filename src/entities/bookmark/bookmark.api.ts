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

  for (const bookmark of bookmarkbarFolderChildren) {
    if (bookmark.url) {
      await deleteBookmarkLinkMutation({ bookmarkId: bookmark.id });
    } else {
      await deleteBookmarkFolderMutation({ folderId: bookmark.id });
    }
  }
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
  for (const aiBookmark of aiBookmarkData) {
    const { bookmark: folder } = await createBoomarkMutation({
      parentId,
      title: aiBookmark.category,
    });

    for (const bookmark of aiBookmark.bookmark) {
      await createBoomarkMutation({
        parentId: folder.id,
        title: bookmark.title,
        url: bookmark.url,
      });
    }
  }
};

interface IUpdateAIBookmarkMutationParameter {
  type: string;
  aiBookmarkData: ICategoryBookmark[];
}

export const updateAIBookmarkMutation = async ({
  type,
  aiBookmarkData,
}: IUpdateAIBookmarkMutationParameter) => {
  try {
    switch (type) {
      case 'TYPE-1':
        await removeAllBookmark();
        await createAiBookmark({ parentId: '1', aiBookmarkData });
        break;
      case 'TYPE-2':
        await removeAllBookmark();
        await createAiBookmark({ parentId: '2', aiBookmarkData });
        console.log('Mutation 성공');
        break;
      case 'TYPE-3':
        await createAiBookmark({ parentId: '2', aiBookmarkData });
        break;
      default:
        throw chromeError({
          isSuccess: false,
          error: Error('북마크 수정 하는 도중 에러가 발생하였습니다'),
        });
    }
  } catch (err: unknown) {
    throw chromeError({ isSuccess: false, error: err });
  }
};
