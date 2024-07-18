import { createChromeRequest } from '@/shared/lib/fetch';

import { createGeminiRequest } from '@/shared/lib/fetch/createGeminiRequest';
import { bookmarkService } from '@/entities/bookmark';

import type { Bookmark } from '@/entities/bookmark/bookmark.type';

interface IBookmarkQueryResponse {
  isSuccess: boolean;
  data: Bookmark[];
}

export interface ISearchBookmarkParameter {
  text: string;
}

export const searchQuery = async (
  payload: ISearchBookmarkParameter,
): Promise<Bookmark[]> => {
  const response = await createChromeRequest<IBookmarkQueryResponse>({
    action: 'searchBookmarks',
    payload: { ...payload },
  });

  return response.data;
};

export interface IAISearchBookmarkParameter {
  text: string;
}

export const searchAIQuery = async (
  payload: IAISearchBookmarkParameter,
): Promise<Bookmark[]> => {
  const bookmarkCache = bookmarkService.getCache();
  if (!bookmarkCache) return [];
  const prompt = `${bookmarkCache} 데이터를 기반, ${payload.text}를 기준으로 데이터를 골라줘. 결과값은 어떠한 멘트도 치지 말고 오직 {id, title, url} 형태의 배열로만 나타내줘`;
  const response = await createGeminiRequest({ prompt });

  return JSON.parse(response);
};
