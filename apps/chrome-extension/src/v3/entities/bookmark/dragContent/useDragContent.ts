import { useCallback, useEffect, useState } from 'react';

import { isFolder, isLink } from '@/v3/entities/bookmark/types/bookmark';
import { useSelectedBookmarksData } from '@/v3/entities/bookmark/select/hooks/useSelectedBookmarksData';

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

  const { selectedBookmarkIds, getSelectedBookmarksData } =
    useSelectedBookmarksData();

  // 🔥 useCallback으로 함수 메모이제이션
  const updateContentText = useCallback(async () => {
    if (selectedBookmarkIds?.size <= 1) {
      setContentText('');
      return;
    }

    const data = await getSelectedBookmarksData();
    const linkCount = data.filter(isLink).length;
    const folderCount = data.filter(isFolder).length;
    setContentText(mappingContentText(isWide, linkCount, folderCount));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBookmarkIds.size]);

  useEffect(() => {
    updateContentText();
  }, [updateContentText]);

  return {
    contentText,
  };
};
