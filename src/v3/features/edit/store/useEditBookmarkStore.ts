import { create, StoreApi, UseBoundStore } from 'zustand';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';

interface IEditBookmarkStore {
  editBookmark: IBookmarkTreeStorage | null;
  setEditBookmark: (bookmark: IBookmarkTreeStorage | null) => void;
}

export const useEditBookmarkStore: UseBoundStore<StoreApi<IEditBookmarkStore>> =
  create<{
    editBookmark: IBookmarkTreeStorage | null;
    setEditBookmark: (bookmark: IBookmarkTreeStorage | null) => void;
  }>((set) => ({
    editBookmark: null,
    setEditBookmark: (bookmark) => set({ editBookmark: bookmark }),
  }));
