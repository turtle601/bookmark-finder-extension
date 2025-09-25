import {
  useAccordionActionContext,
  useAccordionContext,
} from 'bookmark-finder-extension-ui';

import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

export const useSelectFolder = (folder: IFolder) => {
  const {
    checkIsSelected,
    toggleBookmark,
    selectBookmark,
    deselectBookmark,
    deselectAllBookmark,
  } = useSelectBookmarkController();

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const toggle = () => {
    toggleBookmark(folder);

    if (!selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
  };

  const select = () => {
    selectBookmark(folder);
  };

  const deselect = (type: 'single' | 'all') => {
    if (type === 'single') {
      deselectBookmark(folder);
    } else {
      deselectAllBookmark();
    }
  };

  return { isSelected: checkIsSelected(folder), select, toggle, deselect };
};
