import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Fragment } from 'react';

import { color } from '@/v3/shared/styles';

import {
  useDeselectAllBookmarksMutation,
  useMoveBookmarkMutation,
  useSelectBookmarkMutation,
  useToggleSelectedBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import DnD from '@/v3/shared/ui/dnd';

import BookmarkLink from './bookmarkLink';

import {
  useAccordionActionContext,
  useAccordionContext,
} from '@/v3/shared/ui/accordion/model';
import { Accordion } from '@/v3/shared/ui/accordion';

import BookmarkTreeDropArea from '@/v3/features/edit/bookmarkTree/bookmarkTreeDropArea';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
import Center from '@/v3/shared/ui/layout/center';
import { DropDown } from '@/v3/shared/ui/dropdown';

function BookmarkFolderEditButton() {
  return (
    <DropDown.Provider>
      <div
        css={css({
          position: 'relative',
        })}
      >
        <DropDown.Trigger aria-label="폴더 수정 버튼">
          <Center
            as="button"
            data-folder-edit-button
            etcStyles={{
              width: '12px',
              height: '100%',
              opacity: 0,
              borderRadius: '2px',
              transition: 'opacity 0.2s ease',
              background: 'transparent',
              '&:hover': {
                background: color.slate['50'],
                opacity: 1,
              },
            }}
          >
            ⋮
          </Center>
        </DropDown.Trigger>

        <DropDown.Options
          etcStyles={{
            position: 'absolute',
            top: '20px',
            right: 0,
            width: '160px',
            zIndex: 999999,
            background: color.white,
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: `1px solid ${color.slate['200']}`,
            padding: '4px 8px',
            'li + li': {
              borderTop: `1px solid ${color.slate['200']}`,
            },
          }}
        >
          <DropDown.Option>
            <p
              css={css({
                padding: '4px 0',
              })}
            >
              이름 바꾸기
            </p>
          </DropDown.Option>
          <DropDown.Option>
            <p
              css={css({
                padding: '4px 0',
              })}
            >
              하위 폴더 생성
            </p>
          </DropDown.Option>
        </DropDown.Options>
      </div>
    </DropDown.Provider>
  );
}

function BookmarkFolder({ folder }: { folder: IBookmarkTreeStorage }) {
  const [isFolderDragEnter, setIsFolderDragEnter] = useState(false);

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const { moveBookmark } = useMoveBookmarkMutation(folder.id);
  const { mutate: toggleBookmarks } = useToggleSelectedBookmarkMutation(
    folder.id,
  );
  const { mutate: selectBookmarks } = useSelectBookmarkMutation(folder.id);
  const { mutate: deselectAllBookmarks } = useDeselectAllBookmarksMutation();

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggleBookmarks({ nodeId: folder.id });
    }
  };

  useEffect(() => {
    if (isFolderDragEnter && !selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
  }, [isFolderDragEnter, openAccordion, folder.id, selectedIdSet]);

  return (
    <>
      <div
        css={css({
          width: '100%',
          height: '100%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          borderRadius: '4px',
          border: `1px solid ${
            folder.isSelected ? color.primary : 'transparent'
          }`,
        })}
        onClick={handleSelectClick}
      >
        <DnD.Droppable
          dropAction={async () => {
            moveBookmark({
              parentId: folder.id,
              startIdx: 0,
            });
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
                  }, 500);
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
                        background: isDrag ? '#3b82f6' : color.slate['200'],
                        transition: 'all 0.2s ease',
                        ...(!isDrag && {
                          '&:hover': {
                            '& [data-folder-edit-button]': {
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
                      <BookmarkFolderEditButton />
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
    </>
  );
}

export default BookmarkFolder;
