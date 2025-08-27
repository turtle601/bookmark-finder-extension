import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Fragment } from 'react';

import { color } from '@/v3/shared/styles';

import {
  useAddBookmarkMutation,
  useDeselectAllBookmarksMutation,
  useMoveBookmarkMutation,
  useSelectBookmarkMutation,
  useToggleSelectedBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import {
  useAccordionActionContext,
  useAccordionContext,
} from '@/v3/shared/ui/accordion/model';

import DnD from '@/v3/shared/ui/dnd';

import { Accordion } from '@/v3/shared/ui/accordion';

import { useEditBookmarkStore } from '@/v3/features/edit/store/useEditBookmarkStore';
import BookmarkFolderEditButton from '@/v3/features/edit/bookmarkTree/bookmarkFolder/bookmarkFolderEditButton';
import BookmarkFolderField from '@/v3/features/edit/bookmarkTree/bookmarkFolder/bookmarkFolderField';
import BookmarkLink from '@/v3/features/edit/bookmarkTree/bookmarkLink/bookmarkLink';
import BookmarkTreeDropArea from '@/v3/features/edit/bookmarkTree/bookmarkDropArea/bookmarkTreeDropArea';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

function BookmarkFolder({ folder }: { folder: IBookmarkTreeStorage }) {
  const { editBookmark } = useEditBookmarkStore();
  const [isFolderDragEnter, setIsFolderDragEnter] = useState(false);

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const { moveBookmark } = useMoveBookmarkMutation(folder.id);
  const { mutate: toggleBookmarks } = useToggleSelectedBookmarkMutation(
    folder.id,
  );
  const { mutate: selectBookmarks } = useSelectBookmarkMutation(folder.id);
  const { mutate: deselectAllBookmarks } = useDeselectAllBookmarksMutation();
  const { mutate: addBookmark } = useAddBookmarkMutation();

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggleBookmarks({ nodeId: folder.id });

      if (!selectedIdSet.has(Number(folder.id))) {
        openAccordion(Number(folder.id));
      }
    }
  };

  useEffect(() => {
    if (isFolderDragEnter && !selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
  }, [isFolderDragEnter, openAccordion, folder.id, selectedIdSet]);

  return (
    <>
      {editBookmark?.id === folder.id ? (
        <div
          css={css({
            border: `1px solid transparent`,
          })}
        >
          <BookmarkFolderField folder={folder} />
        </div>
      ) : (
        <div
          css={css({
            width: '100%',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            borderRadius: '4px',
            border: `1px solid ${
              folder.isSelected ? color.primary : color.slate['100']
            }`,
            backgroundColor: color.slate['100'],
          })}
          onClick={handleSelectClick}
        >
          <DnD.Droppable
            dropAction={async (e) => {
              const draggedType = e.dataTransfer.getData('dragType');

              switch (draggedType) {
                case 'tab':
                  const draggedTab = JSON.parse(e.dataTransfer.getData('tab'));

                  addBookmark({
                    title: draggedTab.title,
                    url: draggedTab.url,
                    parentId: folder.id,
                    index: 0,
                  });

                  break;
                case 'bookmark':
                  moveBookmark({
                    parentId: folder.id,
                    startIdx: 0,
                  });
                  break;
                default:
                  break;
              }
            }}
            etcStyles={{
              width: '100%',
            }}
          >
            {({ isDragEnter }) => {
              setIsFolderDragEnter(isDragEnter);
              return (
                <DnD.MultiDraggable
                  isSelected={folder.isSelected ?? false}
                  dragAction={(e) => {
                    e.dataTransfer.setData('dragType', 'bookmark');

                    selectBookmarks({ id: folder.id });
                  }}
                  dragEndAction={(e) => {
                    setTimeout(() => {
                      e.dataTransfer.clearData();
                      deselectAllBookmarks();
                    }, 100);
                  }}
                  etcStyles={{
                    width: '100%',
                  }}
                >
                  {({ isDrag }) => {
                    return (
                      <div
                        css={css({
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: '2px',
                          padding: '4px 8px',
                          border: isDrag
                            ? isFolderDragEnter
                              ? `2px dashed ${color.slate['500']}`
                              : `2px dashed ${color.primary}`
                            : isFolderDragEnter
                              ? `2px dashed ${color.slate['500']}`
                              : `2px dashed ${color.slate['200']}`,
                          backgroundColor: isDrag
                            ? '#3b82f6'
                            : color.slate['200'],
                          transition: 'all 0.2s ease',
                          ...(!isDrag && {
                            '&:hover': {
                              '& [data-bookmark-edit-button]': {
                                opacity: 1,
                              },
                            },
                          }),
                        })}
                      >
                        <Accordion.Button
                          id={folder.id}
                          etcStyles={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            color: color.slate['900'],
                            fontSize: '12px',
                            lineHeight: '16px',
                          }}
                        >
                          <Accordion.Icon
                            id={folder.id}
                            size={8}
                            strokeWidth="8"
                          />
                          <div
                            css={css({
                              marginLeft: '4px',
                            })}
                          >
                            <p
                              css={css({
                                fontSize: '12px',
                                lineHeight: '16px',
                              })}
                            >
                              {folder.title}
                            </p>
                          </div>
                        </Accordion.Button>
                        <BookmarkFolderEditButton bookmark={folder} />
                      </div>
                    );
                  }}
                </DnD.MultiDraggable>
              );
            }}
          </DnD.Droppable>
          <Accordion.Panel id={folder.id}>
            <div
              css={css({
                paddingLeft: '20px',
              })}
            >
              {folder.children?.map((child, index) => {
                return (
                  <Fragment key={child.id}>
                    <BookmarkTreeDropArea
                      folder={folder}
                      startIdx={index}
                      isFolderDragEnter={isFolderDragEnter}
                    />
                    {child.children ? (
                      <BookmarkFolder folder={child} />
                    ) : (
                      <BookmarkLink link={child} />
                    )}
                  </Fragment>
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
      )}
    </>
  );
}

export default BookmarkFolder;
