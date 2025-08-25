import React from 'react';

import { css } from '@emotion/react';

import DnD from '@/v3/shared/ui/dnd';
import { color } from '@/v3/shared/styles';

import {
  useDeselectAllBookmarksMutation,
  useSelectBookmarkMutation,
  useToggleSelectedBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';

function BookmarkLink({ link }: { link: IBookmarkTreeStorage }) {
  const { mutate: toggleBookmarks } = useToggleSelectedBookmarkMutation(
    link.id,
  );

  const { mutate: selectBookmarks } = useSelectBookmarkMutation(link.id);
  const { mutate: deselectAllBookmarks } = useDeselectAllBookmarksMutation();

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggleBookmarks({ nodeId: link.id });
    } else {
      chrome.tabs.create({ url: link.url });
    }
  };

  return (
    <div
      css={css({
        position: 'relative',
      })}
      onClick={handleSelectClick}
    >
      <DnD.MultiDraggable
        isSelected={link.isSelected ?? false}
        dragAction={(e) => {
          e.dataTransfer.setData('dragType', 'bookmark');

          selectBookmarks({ id: link.id });
        }}
        dragEndAction={() => {
          setTimeout(() => {
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
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                background: isDrag ? '#3b82f6' : 'white',
                border: `1px solid ${link.isSelected ? '#3b82f6' : color.slate['200']}`,
                borderRadius: '8px',
                cursor: 'pointer',
                color: isDrag ? 'white' : color.slate['600'],
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: 'none',
                ...(!isDrag && {
                  '&:hover': {
                    background: color.slate['50'],
                    color: color.slate['600'],
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
                ☰
              </div>
            </div>
          );
        }}
      </DnD.MultiDraggable>
    </div>
  );
}

export default BookmarkLink;
