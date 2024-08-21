import type { Bookmark } from '@/entities/bookmark/bookmark.type';

export interface IMapSearchLink {
  id: string;
  title: string;
  url?: string;
}

export const mapSearchLinks = (bookmarkNodes: Bookmark[]): IMapSearchLink[] => {
  return bookmarkNodes.map((bookmark) => {
    return {
      id: bookmark.id,
      title: bookmark.title,
      ...(bookmark.url && { url: bookmark.url }),
    };
  });
};

export const mapAISearchLinks = (aiResponse: string): IMapSearchLink[] => {
  const result = aiResponse.replace(/^```json|```$/g, '');

  return JSON.parse(result);
};
