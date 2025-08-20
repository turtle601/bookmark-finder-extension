import { slate } from '@/shared/config/styles';
import { createChromeRequest } from '@/shared/lib/fetch';
import Accordion from '@/shared/ui/accordion';
import { useAccordionActionContext } from '@/shared/ui/accordion/model';
import DnD from '@/shared/ui/dnd';
import Text from '@/shared/ui/text';

import { IExtendedBookmarkTreeNode } from '@/utils/bookmark';
import BookmarkDraggable from '@contentScript/bookmark/bookmarkDraggable';

import { css, CSSObject } from '@emotion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

// 단체 이동으로 변경
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

const toggleBookmarksMutation = async (payload: { nodeId: string }) => {
  return await createChromeRequest({
    action: 'toggleBookmarks',
    payload: { ...payload },
  });
};

const selectBookmarksMutation = async (payload: { id: string }) => {
  return await createChromeRequest({
    action: 'selectBookmarks',
    payload: { ...payload },
  });
};

const deselectAllBookmarksMutation = async () => {
  return await createChromeRequest({
    action: 'deselectAllBookmarks',
  });
};

const getTopLevelSelectedNodes = async () => {
  return await createChromeRequest<{
    isSuccess: boolean;
    data: string[];
  }>({
    action: 'getTopLevelSelectedNodes',
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
  link: IExtendedBookmarkTreeNode;
}) {
  const queryClient = useQueryClient();

  const { mutate: toggleBookmarks } = useMutation({
    mutationKey: ['toggleBookmarks', link.id],
    mutationFn: toggleBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  // 선택 mutation api
  const { mutate: selectBookmarks } = useMutation({
    mutationKey: ['selectBookmarks', link.id],
    mutationFn: selectBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  const { mutate: deselectAllBookmarks } = useMutation({
    mutationKey: ['deselectAllBookmarks'],
    mutationFn: deselectAllBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggleBookmarks({ nodeId: link.id });
    } else {
      console.log('좌클릭:', link.title, link.url);
    }
  };

  return (
    <>
      <div
        css={css({
          position: 'relative',
        })}
        onClick={handleSelectClick}
      >
        <BookmarkDraggable
          isSelected={link.isSelected ?? false}
          onDragStart={() => {
            selectBookmarks({ id: link.id });
          }}
          onDragEnd={() => {
            setTimeout(() => {
              deselectAllBookmarks();
            }, 100);
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
                  border: `1px solid ${link.isSelected ? '#3b82f6' : slate['200']}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: isDrag ? 'white' : slate['600'],
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: 'none',
                  ...(!isDrag && {
                    '&:hover': {
                      background: slate['50'],
                      color: slate['600'],
                    },
                  }),
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
        </BookmarkDraggable>
      </div>
    </>
  );
}

export function EditBookmarkFolder({
  folder,
}: {
  folder: IExtendedBookmarkTreeNode;
}) {
  const queryClient = useQueryClient();

  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isWholeDrag, setIsWholeDrag] = useState(false);
  const { openAccordion } = useAccordionActionContext();

  useEffect(() => {
    if (isDragEnter) {
      openAccordion(Number(folder.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragEnter]);

  const { mutate: moveBookmark } = useMutation({
    mutationKey: ['moveBookmark', folder.id],
    mutationFn: moveBookmarkMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  const { mutate: toggleBookmarks } = useMutation({
    mutationKey: ['toggleBookmarks', folder.id],
    mutationFn: toggleBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['getTopLevelSelectedNodes'] });
    },
  });

  // 선택 mutation api
  const { mutate: selectBookmarks } = useMutation({
    mutationKey: ['selectBookmarks', folder.id],
    mutationFn: selectBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['getTopLevelSelectedNodes'] });
    },
  });

  const { mutate: deselectAllBookmarks } = useMutation({
    mutationKey: ['deselectAllBookmarks'],
    mutationFn: deselectAllBookmarksMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarks'] });
    },
  });

  const handleDragEnter = (isDragEnter: boolean) => {
    setIsDragEnter(isDragEnter);
  };

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggleBookmarks({ nodeId: folder.id });
    }
  };

  return (
    <>
      <div
        css={css({
          width: '100%',
          height: '100%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          borderRadius: '4px',
          border: `2px solid ${'transparent'}`,
          ...(folder.isSelected &&
            !isWholeDrag && {
              border: `2px solid ${'#3b82f6'}`,
            }),
        })}
        onClick={handleSelectClick}
      >
        <BookmarkDroppable
          onDrop={async (e) => {
            const selectedTopLevelNodes = await getTopLevelSelectedNodes();

            selectedTopLevelNodes?.data?.forEach((id, indexing) => {
              moveBookmark({
                id,
                parentId: folder.id,
                index: 0,
              });
            });
          }}
          onDragEnter={handleDragEnter}
        >
          <BookmarkDraggable
            isSelected={folder.isSelected ?? false}
            onDragStart={() => {
              selectBookmarks({ id: folder.id });
            }}
            onDragEnd={() => {
              setTimeout(() => {
                deselectAllBookmarks();
              }, 500);
            }}
          >
            {({ isDrag }) => {
              setIsWholeDrag(isDrag);
              return (
                <div
                  css={css({
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderRadius: '2px',
                    padding: '4px 8px',
                    border: `2px solid ${isDragEnter ? '#3b82f6' : slate['200']}`,
                    background: isDrag ? '#3b82f6' : slate['200'],
                    width: '100%',
                  })}
                >
                  <Accordion.Button
                    id={folder.id}
                    etcStyles={{
                      color: slate['900'],
                      fontSize: '12px',
                      lineHeight: '16px',
                    }}
                  >
                    <Accordion.Icon id={folder.id} size={8} strokeWidth="8" />
                    <div
                      css={css({
                        marginLeft: '4px',
                      })}
                    >
                      <Text label={folder.title} type="sm" />
                    </div>
                  </Accordion.Button>
                </div>
              );
            }}
          </BookmarkDraggable>
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
                    dropAction={async (e) => {
                      const selectedTopLevelNodes =
                        await getTopLevelSelectedNodes();

                      selectedTopLevelNodes?.data?.forEach((id, indexing) => {
                        moveBookmark({
                          id,
                          parentId: folder.id,
                          index: 0 + indexing,
                        });
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
            dropAction={async (e) => {
              const selectedTopLevelNodes = await getTopLevelSelectedNodes();

              selectedTopLevelNodes?.data?.forEach((id, indexing) => {
                moveBookmark({
                  id,
                  parentId: folder.id,
                  index: (folder.children?.length ?? 0) + indexing,
                });
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
