import type { Bookmark } from '@/entities/bookmark';

export interface IClassifiedBookmark {
  type: string;
  bookmarks: Bookmark[];
}
