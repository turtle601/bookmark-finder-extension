import type { Bookmark } from '@/entities/bookmark';

export interface ICategoryBookmark {
  id: string;
  category: string;
  bookmark: Bookmark[];
}
