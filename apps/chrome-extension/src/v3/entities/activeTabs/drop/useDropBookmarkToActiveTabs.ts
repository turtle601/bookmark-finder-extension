import { useQueryBookmarkMutation } from '@/v3/entities/bookmark/request/queries';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';
import { isLink } from '@/v3/entities/bookmark/types/bookmark';
import { useAddChromeTabMutation } from '@/v3/entities/activeTabs/request';

export const useDropBookmarkToActiveTabs = () => {
  const { mutate: addChromeTabs } = useAddChromeTabMutation();
  const { getSelectedBookmarks } = useSelectBookmarkController();

  const { mutate: queryBookmark } = useQueryBookmarkMutation({
    onSuccess: (data, variable) => {
      data.filter(isLink).forEach((bookmark, idx) => {
        addChromeTabs({ url: bookmark.url, index: variable.startIdx + idx });
      });
    },
  });

  const dropBookmark = (startIdx: number) => {
    queryBookmark({
      ids: getSelectedBookmarks().map((bookmark) => bookmark.id),
      startIdx,
    });
  };

  return {
    dropBookmark,
  };
};
