import { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
import { create, StoreApi, UseBoundStore } from 'zustand';

export const useEditBookmarkStore: UseBoundStore<
  StoreApi<{
    bookmark: IBookmarkTreeStorage | null;
    setBookmark: (bookmark: IBookmarkTreeStorage | null) => void;
  }>
> = create<{
  bookmark: IBookmarkTreeStorage | null;
  setBookmark: (bookmark: IBookmarkTreeStorage | null) => void;
}>((set) => ({
  bookmark: null,
  setBookmark: (bookmark) => set({ bookmark }),
}));
