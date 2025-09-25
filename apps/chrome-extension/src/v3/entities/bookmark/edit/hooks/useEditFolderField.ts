import { useState } from 'react';

import type { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';

import { useUpdateFolderTitleMutation } from '@/v3/entities/bookmark/tree/request/queries';
import { useEditFolderTitleStore } from '@/v3/entities/bookmark/edit/hooks/useEditFolderTitleStore';

export const useEditFolderField = ({ folder }: { folder: IFolder }) => {
  const [folderName, setFolderName] = useState(folder.title);

  const { setEditFolderTitle } = useEditFolderTitleStore();

  const { mutate: updateFolderTitle } = useUpdateFolderTitleMutation();

  const onChangeFolderTitle = (title: string) => {
    setFolderName(title);
  };

  const finishEdit = () => {
    setEditFolderTitle(null);

    updateFolderTitle({ id: folder.id, title: folderName });
  };

  return { folderName, onChangeFolderTitle, finishEdit };
};
