import React from 'react';

import BookmarkLink from '@/features/bookmark/boomarksAccordian/bookmarkLink.ui';
import BookmarkFolder from '@/features/bookmark/boomarksAccordian/bookmarkFolder.ui';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarksAccordianProps {
  bookmarks: Bookmark[];
}

const BookmarksAccordian: React.FC<IBookmarksAccordianProps> = ({
  bookmarks,
}) => {
  const rootBookmarkChildren = bookmarks[0].children as Bookmark[];

  return (
    <div>
      {rootBookmarkChildren.map((bookmark) => {
        return (
          <>
            {bookmark.children ? (
              <BookmarkFolder
                folderData={bookmark}
                bookmarks={bookmark.children}
              />
            ) : (
              <BookmarkLink bookmark={bookmark} />
            )}
          </>
        );
      })}
    </div>
  );
};

export default BookmarksAccordian;
