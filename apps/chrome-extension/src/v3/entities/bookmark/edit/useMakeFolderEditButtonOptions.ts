import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/request/queries';

import { useEditFolderTitleStore } from '@/v3/entities/bookmark/model/store/useEditFolderTitleStore';

import { useCreateSubFolder } from '@/v3/entities/bookmark/edit/useCreateSubFolder';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

export const useMakeRootFolderEditButtonOptions = (folder: IFolder) => {
  const { create } = useCreateSubFolder(folder);

  const createSubFolder = () => {
    create({ parentId: folder.id });
  };

  return {
    editButtonOptions: [
      {
        label: 'Create Sub Folder',
        action: createSubFolder,
      },
    ],
  };
};

export const useMakeFolderEditButtonOptions = (folder: IFolder) => {
  const { editFolder, setEditFolderTitle } = useEditFolderTitleStore();

  const { create } = useCreateSubFolder(folder);

  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const createSubFolder = () => {
    create({ parentId: folder.id });
  };

  const updateEditMode = () => {
    setEditFolderTitle(folder);
  };

  const deleteFolder = () => {
    deleteBookmark({ id: folder.id });
  };

  return {
    editFolder,
    setEditFolderTitle,
    editButtonOptions: [
      {
        label: 'Rename',
        action: updateEditMode,
      },
      {
        label: 'Create Sub Folder',
        action: createSubFolder,
      },
      {
        label: 'Delete',
        action: deleteFolder,
      },
    ],
  };
};
