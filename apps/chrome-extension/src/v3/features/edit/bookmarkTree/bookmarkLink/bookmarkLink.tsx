import React from 'react';

import { css } from '@emotion/react';

import { DnD, Image } from 'bookmark-finder-extension/ui';
import { color } from '@/v3/shared/styles';

import {
  useDeselectAllBookmarksMutation,
  useSelectBookmarkMutation,
  useToggleSelectedBookmarkMutation,
} from '@/v3/entities/bookmark/tree/request/queries';

import BookmarkLinkEditButton from '@/v3/features/edit/bookmarkTree/bookmarkLink/bookmarkLinkEditButton';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/storage';

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
                justifyContent: 'space-between',
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
                    '& [data-bookmark-edit-button]': {
                      opacity: 1,
                    },
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
                <Image
                  src={link.faviconUrl}
                  alt={`${link.title} 아이콘`}
                  fallbackComponent={
                    <span aria-label={`${link.title} 아이콘`} role="img">
                      🎮
                    </span>
                  }
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
              <BookmarkLinkEditButton bookmark={link} />
            </div>
          );
        }}
      </DnD.MultiDraggable>
    </div>
  );
}

export default BookmarkLink;
