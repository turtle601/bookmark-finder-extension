import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { Fragment } from 'react';

import { color } from '@/v3/shared/styles';

import {
  useMoveBookmarkMutation,
  useToggleSelectedBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import DnD from '@/v3/shared/ui/dnd';

import BookmarkLink from './bookmarkLink';

import {
  useAccordionActionContext,
  useAccordionContext,
} from '@/v3/shared/ui/accordion/model';
import { Accordion } from '@/v3/shared/ui/accordion';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';
import BookmarkFolder from '@/v3/features/edit/bookmarkTree/bookmarkFolder';
import BookmarkTreeDropArea from '@/v3/features/edit/bookmarkTree/bookmarkTreeDropArea';

function RootBookmarkFolder({ folder }: { folder: IBookmarkTreeStorage }) {
  const [isFolderDragEnter, setIsFolderDragEnter] = useState(false);

  const { selectedIdSet } = useAccordionContext();
  const { openAccordion } = useAccordionActionContext();

  const { moveBookmark } = useMoveBookmarkMutation(folder.id);
  const { mutate: toggleBookmarks } = useToggleSelectedBookmarkMutation(
    folder.id,
  );

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

  useEffect(() => {
    if (!selectedIdSet.has(Number(folder.id))) {
      openAccordion(Number(folder.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        css={css({
          width: '100%',
          height: '100%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          borderRadius: '4px',
          border: `2px solid ${
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
              <div
                css={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '2px',
                  padding: '4px 8px',
                  border: isFolderDragEnter
                    ? `2px dashed ${color.slate['500']}`
                    : `2px dashed ${color.slate['200']}`,
                  background: color.slate['200'],
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
                  <Accordion.Icon id={folder.id} size={8} strokeWidth="8" />
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
              </div>
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

export default RootBookmarkFolder;
