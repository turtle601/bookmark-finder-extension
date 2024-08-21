import React from 'react';

import { css } from '@emotion/react';

import { spacer } from '@/shared/config/styles';

import FolderIcon from '@/shared/config/assets/folder.svg';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import Spacer from '@/shared/ui/spacer';
import Accordion from '@/shared/ui/accordion';

import { ClassfiedBookmarkLink } from './classifiedBookmarkLink.ui';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarkFolderProps {
  folderData: Bookmark;
  bookmarks: Bookmark[];
}

export const ClassifiedBookmarkFolder: React.FC<IBookmarkFolderProps> = ({
  folderData,
  bookmarks,
}) => {
  return (
    <li>
      <Flex
        align={'center'}
        etcStyles={{
          width: '100%',
          height: '32px',
          boxSizing: 'content-box',
        }}
      >
        <Accordion.Button
          id={folderData.id}
          etcStyles={{
            width: `24px`,
            height: `32px`,
            flex: 'none',
          }}
        >
          <Accordion.Icon id={folderData.id} size={12} strokeWidth="12" />
        </Accordion.Button>
        <Flex
          align={'center'}
          etcStyles={{
            width: '100%',
          }}
        >
          <Center
            css={css({
              width: `24px`,
              height: `32px`,
              flex: 'none',
            })}
          >
            <FolderIcon />
          </Center>
          <Spacer direction="horizontal" space={spacer.spacing2} />
          <Text type="sm" label={folderData.title} />
        </Flex>
      </Flex>
      <Accordion.Panel id={folderData.id}>
        {bookmarks.map((bookmark) => {
          return (
            <>
              {bookmark.children ? (
                <Flex>
                  <Spacer direction="horizontal" space={spacer.spacing4} />
                  <div>
                    <ClassifiedBookmarkFolder
                      folderData={bookmark}
                      bookmarks={bookmark.children as Bookmark[]}
                    />
                  </div>
                </Flex>
              ) : (
                <>
                  <Flex>
                    <Spacer direction="horizontal" space={spacer.spacing4} />
                    <div>
                      <ClassfiedBookmarkLink bookmark={bookmark} />
                    </div>
                  </Flex>
                </>
              )}
            </>
          );
        })}
      </Accordion.Panel>
    </li>
  );
};
