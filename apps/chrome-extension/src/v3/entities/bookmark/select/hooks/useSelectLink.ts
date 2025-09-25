import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';
import { ILink } from '@/v3/entities/bookmark/tree/types/bookmark';

export const useSelectLink = (link: ILink) => {
  const {
    checkIsSelected,
    toggleBookmark,
    selectBookmark,
    deselectBookmark,
    deselectAllBookmark,
  } = useSelectBookmarkController();

  const toggle = () => {
    toggleBookmark(link);
  };

  const select = () => {
    selectBookmark(link);
  };

  const deselect = (type: 'single' | 'all') => {
    if (type === 'single') {
      deselectBookmark(link);
    } else {
      deselectAllBookmark();
    }
  };

  return { isSelected: checkIsSelected(link), select, toggle, deselect };
};
