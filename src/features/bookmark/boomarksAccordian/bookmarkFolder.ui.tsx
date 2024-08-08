import React, { DragEventHandler } from 'react';
import { css } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import DnD from '@/shared/ui/dnd';
import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import Spacer from '@/shared/ui/spacer';
import Accordion from '@/shared/ui/accordion';
import FolderIcon from '@/shared/config/assets/folder.svg';
import BookmarkLink from '@/features/bookmark/boomarksAccordian/bookmarkLink.ui';
import BookmarkDropArea from '@/features/bookmark/boomarksAccordian/bookmarkDropArea.ui';

import { DND_BOOKMARK_KEY } from '@/shared/config/constant';

import { useMoveBookmark } from '@/entities/bookmark';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarkFolderProps {
  folderData: Bookmark;
  bookmarks: Bookmark[];
}

const BookmarkFolder: React.FC<IBookmarkFolderProps> = ({
  folderData,
  bookmarks,
}) => {
  const { mutate: moveBookmark } = useMoveBookmark();

  const handleDrag: React.DragEventHandler = (e) => {
    e.dataTransfer.setData(
      DND_BOOKMARK_KEY,
      JSON.stringify({
        id: folderData.id,
        parentId: folderData.parentId,
        index: folderData.index,
      }),
    );
  };

  const handleDrop: DragEventHandler = (e) => {
    const { id } = JSON.parse(e.dataTransfer.getData(DND_BOOKMARK_KEY));

    moveBookmark({
      id,
      parentId: folderData.id,
      index: 0,
    });
  };

  return (
    <li
      css={css({
        width: '100%',
      })}
    >
      <DnD.Dropable dropAction={handleDrop}>
        {({ isDragEnter }) => {
          return (
            <Flex
              align={'center'}
              etcStyles={{
                width: 'calc(100% - 2px)',
                height: '32px',
                border: isDragEnter
                  ? `2px solid ${color.purple}`
                  : `2px solid ${color.white}`,
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
              <DnD.Dragable
                dragAction={handleDrag}
                etcStyles={{ width: '100%' }}
              >
                {({ isDrag }) => {
                  return (
                    <Flex
                      align={'center'}
                      etcStyles={{
                        width: '100%',
                        backgroundColor: isDrag ? color.gray100 : 'transparent',
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
                      <Text
                        type="sm"
                        label={folderData.title}
                        etcStyles={{
                          width: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      />
                    </Flex>
                  );
                }}
              </DnD.Dragable>
            </Flex>
          );
        }}
      </DnD.Dropable>
      <Accordion.Panel id={folderData.id}>
        {bookmarks.map((bookmark, idx) => {
          return (
            <>
              {bookmark.children ? (
                <>
                  <Flex>
                    <Spacer direction="horizontal" space={spacer.spacing4} />
                    <div
                      css={css({
                        width: '100%',
                      })}
                    >
                      <BookmarkDropArea parentId={folderData.id} index={idx} />
                      <BookmarkFolder
                        folderData={bookmark}
                        bookmarks={bookmark.children as Bookmark[]}
                      />
                    </div>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex>
                    <Spacer direction="horizontal" space={spacer.spacing4} />
                    <div
                      css={css({
                        width: '100%',
                      })}
                    >
                      <BookmarkDropArea parentId={folderData.id} index={idx} />
                      <BookmarkLink bookmark={bookmark} />
                    </div>
                  </Flex>
                </>
              )}
            </>
          );
        })}
        <Flex>
          <Spacer direction="horizontal" space={spacer.spacing4} />
          <div
            css={css({
              width: '100%',
            })}
          >
            <BookmarkDropArea
              parentId={folderData.id}
              index={bookmarks.length}
            />
          </div>
        </Flex>
      </Accordion.Panel>
    </li>
  );
};

export default BookmarkFolder;
