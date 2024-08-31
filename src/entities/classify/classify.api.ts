import { createGeminiRequest } from '@/shared/lib/fetch/createGeminiRequest';

import { bookmarkService } from '@/entities/bookmark';

import { mapAIBookmarks } from './classify.lib';

import { ICategoryBookmark } from './classify.type';

export interface ICategoriesParameter {
  categories: string[];
}

export const classifyAIBookmarksMutation = async ({
  categories,
}: ICategoriesParameter): Promise<ICategoryBookmark[] | null> => {
  const bookmarkCache = bookmarkService.getCache();
  if (!bookmarkCache) return null;

  const prompt = `${JSON.stringify(bookmarkCache)}에 있는 링크들을 ${JSON.stringify(categories)} 배열의 각 category 별로 링크들을 분류해줘. 이때 리턴 값은 { id, category: 카테고리명, bookmark: [{ id, title, url }] 형태의 배열값으로 줘. 그리고 category의 값이 중복되어서는 안돼. 부가적인 설명은 필요하지 않아.`;
  const response = await createGeminiRequest({ prompt });

  const result = mapAIBookmarks(response);

  return result;
};
