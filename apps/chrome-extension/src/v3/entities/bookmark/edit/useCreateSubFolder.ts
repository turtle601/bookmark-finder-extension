import { useAccordionActionContext } from 'bookmark-finder-extension-ui';

import { useEditFolderTitleStore } from '@/v3/entities/bookmark/model/store/useEditFolderTitleStore';
import { useCreateSubFolderMutation } from '@/v3/entities/bookmark/request/queries';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

export const useCreateSubFolder = (folder: IFolder) => {
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
