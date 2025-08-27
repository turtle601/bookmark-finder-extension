import { createChromeRequest } from '@/v3/shared/utils/request';

import type { ISearchBookmarkLink } from '@/v3/background/bookmark/utils';
import type { IGenericResponse } from '@/v3/shared/utils/request/type';

interface IBookmarkSearchResponse extends IGenericResponse {
  data: ISearchBookmarkLink[];
}

export const searchQuery = async (payload: {
  text: string;
}): Promise<ISearchBookmarkLink[]> => {
  const response = await createChromeRequest<IBookmarkSearchResponse>({
    action: 'searchBookmarks',
    payload: { ...payload },
  });

  return response.data;
};
