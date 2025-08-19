import { DND_BOOKMARK_KEY } from '@/shared/config/constant';
import { slate } from '@/shared/config/styles';
import { createChromeRequest } from '@/shared/lib/fetch';
import Accordion from '@/shared/ui/accordion';
import { useAccordionActionContext } from '@/shared/ui/accordion/model';
import DnD from '@/shared/ui/dnd';
import Text from '@/shared/ui/text';
import { css, CSSObject } from '@emotion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const moveBookmarkMutation = async (payload: {
  id: string;
  parentId: string;
  index: number;
}) => {
  return await createChromeRequest({
    action: 'moveBookmark',
    payload: { ...payload },
  });
};

function BookmarkDroppable({
  onDrop,
  onDragEnter,
  children,
  etcStyles,
}: {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (isDragEnter: boolean) => void;
  children: React.ReactNode;
  etcStyles?: CSSObject;
}) {
  return (
    <DnD.Droppable
      dropAction={onDrop}
      etcStyles={{
        width: '100%',
        ...etcStyles,
      }}
    >
      {({ isDragEnter }) => {
        onDragEnter(isDragEnter);
        return <>{children}</>;
      }}
    </DnD.Droppable>
  );
}

export function EditBookmarkLink({
  link,
}: {
  link: chrome.bookmarks.BookmarkTreeNode;
}) {
  return (
    <>
      <div
        css={css({
          position: 'relative',
        })}
      >
        <DnD.Draggable
          dragAction={(e) => {
            e.dataTransfer.setData(
              DND_BOOKMARK_KEY,
              JSON.stringify({
                type: 'link',
                id: link.id,
              }),
            );
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
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: isDrag ? '#3b82f6' : 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: slate['600'],
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: 'none',
                  '&:hover': {
                    background: slate['50'],
                    borderColor: slate['300'],
                    color: slate['600'],
                  },
                  '&:active': {
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                  },
                })}
              >
                <div
                  css={css({
                    width: '16px',
                    height: '16px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  })}
                >
                  <img
                    src={`${new URL(link.url!).origin}/favicon.ico`}
                    alt={`${link.title} 아이콘`}
                    css={css({
                      width: '16px',
                      height: '16px',
                      objectFit: 'contain',
                      verticalAlign: 'middle',
                    })}
                  />
                </div>
                <p
                  css={css({
                    fontSize: '13px',
                    fontWeight: '500',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {link.title}
                </p>
                <div
                  css={css({
                    cursor: 'pointer',
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  ×
                </div>
              </div>
            );
          }}
        </DnD.Draggable>
      </div>
    </>
  );
}

export function EditBookmarkFolder({
  folder,
}: {
  folder: chrome.bookmarks.BookmarkTreeNode;
}) {
  const queryClient = useQueryClient();

  const [isDragEnter, setIsDragEnter] = useState(false);
  const { openAccordion } = useAccordionActionContext();

  const { mutate: moveBookmark } = useMutation({
    mutationKey: ['moveBookmark'],
    mutationFn: moveBookmarkMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  const handleDragEnter = (isDragEnter: boolean) => {
    setIsDragEnter(isDragEnter);
  };

  useEffect(() => {
    if (isDragEnter) {
      openAccordion(Number(folder.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragEnter]);

  console.log(folder, 'folder');

  return (
    <>
      <div
        css={css({
          width: '100%',
          height: '100%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: `2px solid ${isDragEnter ? '#3b82f6' : '#f1f5f9'}`,
          borderRadius: '4px',
        })}
      >
        <BookmarkDroppable
          onDrop={(e) => {
            const { id } = JSON.parse(e.dataTransfer.getData(DND_BOOKMARK_KEY));

            moveBookmark({
              id,
              parentId: folder.id,
              index: 0,
            });
          }}
          onDragEnter={handleDragEnter}
        >
          <DnD.Draggable
            dragAction={(e) => {
              e.dataTransfer.setData(
                DND_BOOKMARK_KEY,
                JSON.stringify({ type: 'folder', id: folder.id }),
              );
            }}
            etcStyles={{
              width: '100%',
            }}
          >
            {({ isDrag }) => {
              return (
                <>
                  <Accordion.Button
                    id={folder.id}
                    etcStyles={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      padding: '4px 8px',
                      color: slate['900'],
                      fontSize: '12px',
                      lineHeight: '16px',
                      backgroundColor: isDrag ? '#3b82f6' : slate['200'],
                      borderRadius: '4px',
                      gap: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Accordion.Icon id={folder.id} size={8} strokeWidth="8" />
                    <Text label={folder.title} type="sm" />
                  </Accordion.Button>
                </>
              );
            }}
          </DnD.Draggable>
        </BookmarkDroppable>
        <Accordion.Panel id={folder.id}>
          <div
            css={css({
              paddingLeft: '20px',
            })}
          >
            {folder.children?.map((child, index) => {
              return (
                <React.Fragment key={child.id}>
                  <DnD.Droppable
                    dropAction={(e) => {
                      const { id } = JSON.parse(
                        e.dataTransfer.getData(DND_BOOKMARK_KEY),
                      );

                      moveBookmark({
                        id,
                        parentId: folder.id,
                        index,
                      });
                    }}
                  >
                    {({ isDragEnter }) => {
                      return (
                        <div
                          css={css({
                            width: '100%',
                            height: '4px',
                            backgroundColor: isDragEnter
                              ? '#3b82f6'
                              : 'transparent',
                            borderRadius: '4px',
                          })}
                        ></div>
                      );
                    }}
                  </DnD.Droppable>
                  {child.children ? (
                    <EditBookmarkFolder folder={child} />
                  ) : (
                    <EditBookmarkLink link={child} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <DnD.Droppable
            dropAction={(e) => {
              const { id } = JSON.parse(
                e.dataTransfer.getData(DND_BOOKMARK_KEY),
              );

              moveBookmark({
                id,
                parentId: folder.id,
                index: folder.children?.length ?? 0,
              });
            }}
          >
            {({ isDragEnter }) => {
              return (
                <div
                  css={css({
                    width: '100%',
                    height: '4px',
                    backgroundColor: isDragEnter ? '#3b82f6' : 'transparent',
                    borderRadius: '4px',
                  })}
                ></div>
              );
            }}
          </DnD.Droppable>
        </Accordion.Panel>
      </div>
    </>
  );
}
