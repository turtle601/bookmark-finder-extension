import { IFolder } from '@/v3/entities/bookmark/types/bookmark';

import { useAddBookmarkMutation } from '@/v3/entities/bookmark/request/queries';

export const useDropTab = (folder: IFolder) => {
  const { mutate: addBookmark } = useAddBookmarkMutation();

  const handleDropTab = (draggedTab: chrome.tabs.Tab, startIdx: number = 0) => {
    addBookmark({
      parentId: folder.id,
      title: draggedTab.title,
      url: draggedTab.url,
      index: startIdx,
    });
  };

  return { dropTab: handleDropTab };
};
