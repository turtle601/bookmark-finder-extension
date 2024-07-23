import { createGeminiRequest } from '@/shared/lib/fetch/createGeminiRequest';

import { Bookmark, bookmarkService } from '@/entities/bookmark';

export interface ICategoriesParameter {
  categories: string[];
}

export const createAIBookmarksTypesMutation = async ({
  categories,
}: ICategoriesParameter): Promise<Bookmark[]> => {
  const bookmarkCache = bookmarkService.getCache();
  if (bookmarkCache) return [];

  const prompt = `${bookmarkCache}에 있는 링크들을 ${categories} 배열의 각 catory 별로 링크를 분류해줘. 이때 리턴 값은 크롬 북마크 데이터 타입과 유사하게 주라`;
  const response = await createGeminiRequest({ prompt });

  return JSON.parse(response);
};
