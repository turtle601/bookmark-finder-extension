import { create } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';

import type { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';

interface IEditFolderTitleStore {
  editFolder: IFolder | null;
  setEditFolderTitle: (folder: IFolder | null) => void;
}

export const useEditFolderTitleStore: UseBoundStore<
  StoreApi<IEditFolderTitleStore>
> = create<{
  editFolder: IFolder | null;
  setEditFolderTitle: (folder: IFolder | null) => void;
}>((set) => ({
  editFolder: null,
  setEditFolderTitle: (folder) => set({ editFolder: folder }),
}));
