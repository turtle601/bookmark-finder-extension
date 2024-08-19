import { createGeminiRequest } from '@/shared/lib/fetch/createGeminiRequest';

import { bookmarkService } from '@/entities/bookmark';

import { mapAICategorList } from './category.lib';

import type { ICategory } from '@/entities/category/category.type';

export const categoryAIQuery = async (): Promise<ICategory[]> => {
  const bookmarkCache = bookmarkService.getCache();
  if (!bookmarkCache) return [];

  const prompt = `${JSON.stringify(bookmarkCache)} 데이터를 기반, 어떠한 폴더를 기준으로 북마크를 분류해야할지 추천해줘. 리턴 값은 { id: 추천하는 폴더명, text: 추천하는 폴더명 }의 배열값으로 줘. 부가적인 설명은 필요하지 않아.`;
  const response = await createGeminiRequest({ prompt });

  const result = mapAICategorList(response);

  return result;
};
