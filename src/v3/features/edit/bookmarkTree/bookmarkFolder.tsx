import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Fragment } from 'react';

import { color } from '@/v3/shared/styles';

import {
  useAddBookmarkMutation,
  useCreateBookmarkFolderMutation,
  useDeselectAllBookmarksMutation,
  useMoveBookmarkMutation,
  useSelectBookmarkMutation,
  useToggleSelectedBookmarkMutation,
  useUpdateBookmarkTitleMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import {
  useAccordionActionContext,
  useAccordionContext,
} from '@/v3/shared/ui/accordion/model';

import DnD from '@/v3/shared/ui/dnd';
import Center from '@/v3/shared/ui/layout/center';

import { Accordion } from '@/v3/shared/ui/accordion';
import { DropDown } from '@/v3/shared/ui/dropdown';

import BookmarkLink from './bookmarkLink';
import BookmarkTreeDropArea from './bookmarkTreeDropArea';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
import Flex from '@/v3/shared/ui/layout/flex';
import { useEditBookmarkStore } from '@/v3/features/edit/bookmarkTree/store/useEditBookmarkStore';

interface IBookmarkFolderFieldProps {
  folder: IBookmarkTreeStorage;
  closeEdit: VoidFunction;
}

function BookmarkFolderField({ folder, closeEdit }: IBookmarkFolderFieldProps) {
  const [folderName, setFolderName] = useState(folder.title);
  const { mutate: updateBookmarkTitle } = useUpdateBookmarkTitleMutation();

  const inputRef = useCallback((el: HTMLInputElement) => {
    let timer: NodeJS.Timeout | null = null;

    if (el) {
      timer = setTimeout(() => {
        el.focus();
        el.select();
      }, 0);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, []);

  const finishEdit = () => {
    closeEdit();

    updateBookmarkTitle({
      id: folder.id,
      title: folderName,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      finishEdit();
    }
  };

  const handleBlur = () => {
    finishEdit();
  };

  return (
    <Flex
      align="center"
      gap={'4px'}
      etcStyles={{
        width: '100%',
        height: '100%',
        padding: '4px 8px',
        background: color.slate['200'],
        borderRadius: '2px',
        border: `2px solid ${color.slate['200']}`,
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        css={css({
          flex: 1,
          width: '100%',
          height: '100%',
          outline: 'none',
          background: 'white',
          fontSize: '12px',
          color: color.slate['900'],
          border: `2px solid ${color.slate['200']}`,
          '&::placeholder': {
            color: color.slate['500'],
          },
          '&:focus': {
            border: `2px solid ${color.primary}`,
          },
        })}
        placeholder="새 폴더"
      />
    </Flex>
  );
}

interface IBookmarkFolderEditButtonProps {
  folder: IBookmarkTreeStorage;
  options: {
    label: string;
    action: VoidFunction;
  }[];
}

function BookmarkFolderEditButton({ options }: IBookmarkFolderEditButtonProps) {
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
          {options.map((option) => {
            return (
              <DropDown.Option
                key={option.label}
                onClick={option.action}
                etcStyles={{
                  padding: '4px 0',
                }}
              >
                <p>{option.label}</p>
              </DropDown.Option>
            );
          })}
        </DropDown.Options>
      </div>
    </DropDown.Provider>
  );
}

function BookmarkFolder({ folder }: { folder: IBookmarkTreeStorage }) {
  const { bookmark, setBookmark } = useEditBookmarkStore();
  const [isFolderDragEnter, setIsFolderDragEnter] = useState(false);

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const { mutate: createBookmarkFolder } = useCreateBookmarkFolderMutation();

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
    }
  };

  useEffect(() => {
    if (isFolderDragEnter && !selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
  }, [isFolderDragEnter, openAccordion, folder.id, selectedIdSet]);

  return (
    <>
      {bookmark?.id === folder.id ? (
        <div
          css={css({
            border: `1px solid transparent`,
          })}
        >
          <BookmarkFolderField
            folder={folder}
            closeEdit={() => setBookmark(null)}
          />
        </div>
      ) : (
        <div
          css={css({
            width: '100%',
            height: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            borderRadius: '4px',
            border: `1px solid ${
              folder.isSelected ? color.primary : 'transparent'
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
                          backgroundColor: isDrag
                            ? '#3b82f6'
                            : color.slate['200'],
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
                        <BookmarkFolderEditButton
                          folder={folder}
                          options={[
                            {
                              label: '이름 바꾸기',
                              action: () => {
                                setBookmark(folder);
                              },
                            },
                            {
                              label: '하위 폴더 생성',
                              action: () => {
                                createBookmarkFolder({
                                  parentId: folder.id,
                                });
                              },
                            },
                          ]}
                        />
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
