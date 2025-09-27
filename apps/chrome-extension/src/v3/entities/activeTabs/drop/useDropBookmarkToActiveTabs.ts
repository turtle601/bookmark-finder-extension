import { useAddChromeTabMutation } from '@/v3/entities/activeTabs/request';
import { useSelectedBookmarksData } from '@/v3/entities/bookmark/select/hooks/useSelectedBookmarksData';

import { isLink } from '@/v3/entities/bookmark/types/bookmark';

export const useDropBookmarkToActiveTabs = () => {
  const { mutate: addChromeTabs } = useAddChromeTabMutation();

  const { getSelectedBookmarksData } = useSelectedBookmarksData();

  const dropBookmark = async (startIdx: number) => {
    const data = await getSelectedBookmarksData();

    data.filter(isLink).forEach((bookmark, idx) => {
      addChromeTabs({ url: bookmark.url, index: startIdx + idx });
    });
  };

  return {
    dropBookmark,
  };
};
