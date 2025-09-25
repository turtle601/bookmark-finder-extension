import { create, StoreApi, UseBoundStore } from 'zustand';

interface ISelectBookmarkStore {
  selectedBookmarkIds: Set<string>;
  setSelectedBookmarkIds: (selectedBookmarkIds: Set<string>) => void;
}

export const useSelectBookmarkStore: UseBoundStore<
  StoreApi<ISelectBookmarkStore>
> = create<ISelectBookmarkStore>((set) => ({
  selectedBookmarkIds: new Set(),
  setSelectedBookmarkIds: (selectedBookmarkIds) => set({ selectedBookmarkIds }),
}));
