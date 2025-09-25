import { useUpdateFolderTitleMutation } from '@/v3/entities/bookmark/request/queries';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

export const useUpdateFolderTitle = (folder: IFolder) => {
  const { mutate: updateFolderTitle } = useUpdateFolderTitleMutation();

  const updateTitle = () => {
    updateFolderTitle({ id: folder.id, title: folder.title });
  };

  return { updateTitle };
};
