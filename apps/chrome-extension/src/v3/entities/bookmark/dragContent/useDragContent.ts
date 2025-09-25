import { useEffect, useState } from 'react';

import { useQueryBookmarkMutation } from '@/v3/entities/bookmark/request/queries';
import { useSelectBookmarkController } from '@/v3/entities/bookmark/select/hooks/useSelectBookmarkController';
import { isFolder, isLink } from '@/v3/entities/bookmark/types/bookmark';

const mappingContentText = (
  isWide: boolean,
  linkCount: number,
  folderCount: number,
) => {
  if (isWide) {
    return `🔷 Pick ${linkCount} links, ${folderCount} folders`;
  } else {
    return `🔷 Pick ${linkCount + folderCount}`;
  }
};

export const useDragContent = (isWide: boolean) => {
  const [contentText, setContentText] = useState('');

  const { selectedBookmarkIds } = useSelectBookmarkController();

  const { mutate: queryBookmark } = useQueryBookmarkMutation({
    onSuccess: (data) => {
      const linkCount = data.filter(isLink).length;
      const folderCount = data.filter(isFolder).length;

      setContentText(mappingContentText(isWide, linkCount, folderCount));
    },
  });

  useEffect(() => {
    if (selectedBookmarkIds?.size > 1) {
      queryBookmark({ ids: [...selectedBookmarkIds] });
    } else {
      setContentText('');
    }
  }, [queryBookmark, selectedBookmarkIds]);

  return {
    contentText,
  };
};
