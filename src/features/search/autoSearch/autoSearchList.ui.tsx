import Flex from '@/shared/ui/flex';
import AutoSearchLinkItem from '@/features/search/autoSearch/autoSearchItem.ui';

import type { Bookmark } from '@/entities/bookmark';

interface IAutoSearchListProps {
  bookmarks: Bookmark[];
}

const AutoSearchList = ({ bookmarks }: IAutoSearchListProps) => {
  return (
    <Flex
      as="ul"
      direction={'column'}
      etcStyles={{
        width: '100%',
        height: '240px',
      }}
    >
      {bookmarks.map((bookmark) => {
        return <AutoSearchLinkItem key={bookmark.id} bookmark={bookmark} />;
      })}
    </Flex>
  );
};

export default AutoSearchList;
