import {
  useDeleteBookmarkMutation,
  useCreateSubFolderMutation,
  useUpdateFolderTitleMutation,
} from '@/v3/entities/bookmark/request/queries';

import { useAccordionActionContext } from 'bookmark-finder-extension-ui';
import { useEditFolderTitleStore } from '@/v3/entities/bookmark/model/store/useEditFolderTitleStore';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

const useCreateSubFolder = (folder: IFolder) => {
  const { setEditFolderTitle } = useEditFolderTitleStore();
  const { openAccordion } = useAccordionActionContext();

  const { mutate: createBookmarkFolder } = useCreateSubFolderMutation(
    (bookmark) => {
      openAccordion(Number(bookmark.parentId));
      setEditFolderTitle(bookmark as IFolder);
    },
  );

  return { create: createBookmarkFolder };
};

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

  const { mutate: updateBookmarkTitle } = useUpdateFolderTitleMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const createSubFolder = () => {
    create({ parentId: folder.id });
  };

  const updateTitle = () => {
    updateBookmarkTitle({ id: folder.id, title: folder.title });
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
        action: updateTitle,
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
