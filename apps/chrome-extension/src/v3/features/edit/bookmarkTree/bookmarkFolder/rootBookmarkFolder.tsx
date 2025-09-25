import React, { useEffect } from 'react';
import { css } from '@emotion/react';

import { Fragment } from 'react';

import { Accordion, DnD, Flex, Spacer } from 'bookmark-finder-extension-ui';

import BookmarkLink from '@/v3/features/edit/bookmarkTree/bookmarkLink/bookmarkLink';
import BookmarkFolder from '@/v3/features/edit/bookmarkTree/bookmarkFolder/bookmarkFolder';

import { mappingComponentByBookmarkType } from '@/v3/entities/bookmark/mapping/bookmark';

import {
  useFolderDragEnter,
  useOpenFolder,
} from '@/v3/entities/bookmark/dragEnter/useFolderDragEnter';

import { useDropTab } from '@/v3/entities/bookmark/drop/useDropTab';
import { useDropBookmark } from '@/v3/entities/bookmark/drop/useDropBookmark';
import { useMakeRootFolderEditButtonOptions } from '@/v3/entities/bookmark/edit/useMakeFolderEditButtonOptions';

// styles
import {
  getBookmarkFolderAccordionButtonStyle,
  getBookmarkFolderDepthStyle,
  getBookmarkFolderDragSectionStyle,
  getBookmarkFolderTextStyle,
  getBookmarkFolderWrapperStyle,
} from '@/v3/features/edit/bookmarkTree/bookmarkFolder/folder.style';

import BookmarkDropArea from '@/v3/features/edit/bookmarkTree/bookmarkDropArea/bookmarkDropArea';
import BookmarkEditButtonUI from '@/v3/entities/bookmark/ui/bookmarkEditButtonUI';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

function RootBookmarkFolder({ folder }: { folder: IFolder }) {
  const { isFolderDragEnter, dragEnterFolder } = useFolderDragEnter(folder);

  const { dropTab } = useDropTab(folder);
  const { dropBookmark } = useDropBookmark(folder);

  const { editButtonOptions } = useMakeRootFolderEditButtonOptions(folder);

  const { openFolder } = useOpenFolder(folder);

  // 초기 렌더링 시 루트 폴더 열기
  useEffect(() => {
    openFolder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropFolder = async (e: React.DragEvent<Element>) => {
    const draggedType = e.dataTransfer.getData('dragType');

    switch (draggedType) {
      case 'tab':
        dropTab(JSON.parse(e.dataTransfer.getData('tab')));
        break;
      case 'bookmark':
        dropBookmark(0);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div css={css(getBookmarkFolderWrapperStyle())}>
        <DnD.Droppable
          dropAction={handleDropFolder}
          etcStyles={{
            width: '100%',
          }}
        >
          {({ isDragEnter }) => {
            dragEnterFolder(isDragEnter);
            return (
              <Flex
                justify="space-between"
                align="center"
                css={css(getBookmarkFolderDragSectionStyle(isDragEnter))}
              >
                <Accordion.Button
                  id={folder.id}
                  etcStyles={getBookmarkFolderAccordionButtonStyle()}
                >
                  <Accordion.Icon id={folder.id} size={12} />
                  <Spacer direction="horizontal" space={4} />
                  <p css={css(getBookmarkFolderTextStyle())}>{folder.title}</p>
                </Accordion.Button>
                <BookmarkEditButtonUI options={editButtonOptions} />
              </Flex>
            );
          }}
        </DnD.Droppable>
        <Accordion.Panel id={folder.id}>
          <div css={css(getBookmarkFolderDepthStyle())}>
            {folder.children?.map((child, index) => {
              return (
                <Fragment key={child.id}>
                  <BookmarkDropArea
                    folder={folder}
                    startIdx={index}
                    isFolderDragEnter={isFolderDragEnter}
                  />
                  {mappingComponentByBookmarkType(child, {
                    folder: BookmarkFolder,
                    link: BookmarkLink,
                  })}
                </Fragment>
              );
            })}
            <BookmarkDropArea
              folder={folder}
              startIdx={folder.children?.length ?? 0}
              isFolderDragEnter={isFolderDragEnter}
            />
          </div>
        </Accordion.Panel>
      </div>
    </>
  );
}

export default RootBookmarkFolder;
