import React from 'react';

import { css } from '@emotion/react';

import ActiveTabs from './tabs';

import { slate } from '@/shared/config/styles';
import Spacer from '@/shared/ui/spacer';
import { createChromeRequest } from '@/shared/lib/fetch';
import { useQuery } from '@tanstack/react-query';
import Accordion from '@/shared/ui/accordion';

import DnD from '@/shared/ui/dnd';

import {
  EditBookmarkFolder,
  EditBookmarkLink,
} from '@contentScript/bookmark/bookmarkFolder';

const getBookmarks = async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
  const response = await createChromeRequest<{
    isSuccess: boolean;
    data: chrome.bookmarks.BookmarkTreeNode[];
  }>({
    action: 'getBookmarks',
  });

  return response.data;
};

function EditBookmark() {
  const { data: bookmarks } = useQuery({
    queryKey: ['getBookmarks'],
    queryFn: () => getBookmarks(),
  });

  const rootBookmarkChildren = bookmarks?.[0]
    ?.children as chrome.bookmarks.BookmarkTreeNode[];

  console.log(rootBookmarkChildren, 'rootBookmarkChildren');

  if (!rootBookmarkChildren) return null;

  return (
    <>
      {rootBookmarkChildren.map((bookmark) => (
        <>
          {bookmark.children ? (
            <EditBookmarkFolder key={bookmark.id} folder={bookmark} />
          ) : (
            <EditBookmarkLink link={bookmark} />
          )}
        </>
      ))}
    </>
  );
}

function EditPanel() {
  return (
    <DnD.Provider>
      <Accordion.Provider>
        <DnD.PointerContent />
        <DnD.Boundary width={'100%'} height={'100%'}>
          <Spacer space={'12px'} direction="vertical" />
          <ActiveTabs />
          <Spacer space={'12px'} direction="vertical" />
          <div
            css={css({
              height: '1px',
              backgroundColor: slate['200'],
            })}
          />
          <Spacer space={'12px'} direction="vertical" />
          <div
            css={css({
              color: slate['900'],
            })}
          >
            <EditBookmark />
          </div>
        </DnD.Boundary>
      </Accordion.Provider>
    </DnD.Provider>
  );
}

export default EditPanel;
