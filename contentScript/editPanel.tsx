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
import { IExtendedBookmarkTreeNode } from '@background/bookmark';

const getBookmarks = async (): Promise<IExtendedBookmarkTreeNode[]> => {
  const response = await createChromeRequest<{
    isSuccess: boolean;
    data: IExtendedBookmarkTreeNode[];
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
    ?.children as IExtendedBookmarkTreeNode[];

  if (!rootBookmarkChildren) return null;

  return (
    <div>
      {rootBookmarkChildren.map((bookmark) => (
        <>
          {bookmark.children ? (
            <EditBookmarkFolder key={bookmark.id} folder={bookmark} />
          ) : (
            <EditBookmarkLink link={bookmark} />
          )}
        </>
      ))}
    </div>
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
              width: '100%',
              height: '360px',
              overflow: 'auto',
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
