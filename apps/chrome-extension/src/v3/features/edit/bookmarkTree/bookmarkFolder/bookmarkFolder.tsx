import React from 'react';
import { css } from '@emotion/react';

import { Accordion, DnD, Flex, Spacer } from 'bookmark-finder-extension-ui';

import BookmarkFolderField from '@/v3/features/edit/bookmarkTree/bookmarkFolder/bookmarkFolderField';
import BookmarkLink from '@/v3/features/edit/bookmarkTree/bookmarkLink/bookmarkLink';
import BookmarkTreeDropArea from '@/v3/features/edit/bookmarkTree/bookmarkDropArea/bookmarkTreeDropArea';

import { mappingComponentByBookmarkType } from '@/v3/entities/bookmark/tree/mapping/bookmark';

import { useEditFolderTitleStore } from '@/v3/entities/bookmark/edit/hooks/useEditFolderTitleStore';
import { useDropTab } from '@/v3/entities/bookmark/drop/useDropTab';
import { useDropBookmark } from '@/v3/entities/bookmark/drop/useDropBookmark';
import { useFolderDragEnter } from '@/v3/entities/bookmark/dragEnter/useFolderDragEnter';
import { useSelectFolder } from '@/v3/entities/bookmark/select/hooks/useSelectFolder';

import type { IFolder } from '@/v3/entities/bookmark/tree/types/bookmark';
import {
  getBookmarkFolderAccordionButtonStyle,
  getBookmarkFolderDepthStyle,
  getBookmarkFolderDragSectionStyle,
  getBookmarkFolderTextStyle,
  getBookmarkFolderWrapperStyle,
} from '@/v3/features/edit/bookmarkTree/bookmarkFolder/folder.style';
import BookmarkEditButton from '@/v3/features/edit/bookmarkTree/ui/bookmarkEditButton';
import { useMakeFolderEditButtonOptions } from '@/v3/entities/bookmark/edit/hooks/useEditFolder';

function BookmarkFolder({ folder }: { folder: IFolder }) {
  const { editFolder } = useEditFolderTitleStore();

  const { dropTab } = useDropTab(folder);
  const { dropBookmark } = useDropBookmark(folder);
  const { isSelected, select, deselect, toggle } = useSelectFolder(folder);
  const { isFolderDragEnter, dragEnterFolder } = useFolderDragEnter(folder);
  const { editButtonOptions } = useMakeFolderEditButtonOptions(folder);

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // 폴더 좌 클릭
    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggle();
    }
  };

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

  const handleDragEnd = (e: React.DragEvent<Element>) => {
    setTimeout(() => {
      e.dataTransfer.clearData();
      deselect('all');
    }, 100);
  };

  const handleDrag = (e: React.DragEvent<Element>) => {
    e.dataTransfer.setData('dragType', 'bookmark');
    select();
  };

  if (editFolder?.id === folder.id) {
    return <BookmarkFolderField folder={folder} />;
  }

  return (
    <div
      css={css(getBookmarkFolderWrapperStyle(isSelected))}
      onClick={handleSelectClick}
    >
      <DnD.Droppable
        dropAction={handleDropFolder}
        etcStyles={{
          width: '100%',
        }}
      >
        {({ isDragEnter }) => {
          dragEnterFolder(isDragEnter);
          return (
            <DnD.MultiDraggable
              isSelected={isSelected}
              dragAction={handleDrag}
              dragEndAction={handleDragEnd}
              etcStyles={{
                width: '100%',
              }}
            >
              {({ isDrag }) => {
                return (
                  <Flex
                    justify="space-between"
                    align="center"
                    etcStyles={getBookmarkFolderDragSectionStyle(
                      isDragEnter,
                      isDrag,
                    )}
                  >
                    <Accordion.Button
                      id={folder.id}
                      etcStyles={getBookmarkFolderAccordionButtonStyle()}
                    >
                      <Accordion.Icon id={folder.id} size={12} />
                      <Spacer direction="horizontal" space={4} />
                      <p css={css(getBookmarkFolderTextStyle())}>
                        {folder.title}
                      </p>
                    </Accordion.Button>
                    <BookmarkEditButton options={editButtonOptions} />
                  </Flex>
                );
              }}
            </DnD.MultiDraggable>
          );
        }}
      </DnD.Droppable>
      <Accordion.Panel id={folder.id}>
        <div css={css(getBookmarkFolderDepthStyle())}>
          {folder.children?.map((child, index) => {
            return (
              <React.Fragment key={child.id}>
                <BookmarkTreeDropArea
                  folder={folder}
                  startIdx={index}
                  isFolderDragEnter={isFolderDragEnter}
                />
                {mappingComponentByBookmarkType(child, {
                  folder: BookmarkFolder,
                  link: BookmarkLink,
                })}
              </React.Fragment>
            );
          })}
          <BookmarkTreeDropArea
            folder={folder}
            startIdx={folder.children?.length ?? 0}
            isFolderDragEnter={isFolderDragEnter}
          />
        </div>
      </Accordion.Panel>
    </div>
  );
}

export default BookmarkFolder;
