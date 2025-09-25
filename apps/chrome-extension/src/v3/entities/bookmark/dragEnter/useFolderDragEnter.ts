import { useCallback, useState } from 'react';

import {
  useAccordionActionContext,
  useAccordionContext,
} from 'bookmark-finder-extension-ui';

import type { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';

export const useOpenFolder = (folder: IFolder) => {
  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const openFolder = useCallback(() => {
    if (!selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
  }, [openAccordion, folder.id, selectedIdSet]);

  return {
    openFolder,
  };
};

export const useFolderDragEnter = (folder: IFolder) => {
  const [isDragEnter, setIsDragEnter] = useState(false);

  const { openFolder } = useOpenFolder(folder);

  const handleDragEnterChange = useCallback(
    (isDragEnter: boolean) => {
      setIsDragEnter(isDragEnter);

      if (isDragEnter) {
        openFolder();
      }
    },
    [openFolder],
  );

  return {
    isFolderDragEnter: isDragEnter,
    dragEnterFolder: handleDragEnterChange,
  };
};
