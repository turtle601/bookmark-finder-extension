import React from 'react';

import { css, CSSObject } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import { Center, DnD, Flex, Image } from 'bookmark-finder-extension-ui';

import { useSelectLink } from '@/v3/entities/bookmark/select/hooks/useSelectLink';
import { useMakeLinkEditButtonOptions } from '@/v3/entities/bookmark/edit/hooks/useEditLink';

import BookmarkEditButtonUI from '@/v3/entities/bookmark/ui/bookmarkEditButtonUI';

import type { ILink } from '@/v3/entities/bookmark/types/bookmark';

function BookmarkLink({ link }: { link: ILink }) {
  const { isSelected, select, toggle, deselect } = useSelectLink(link);

  const { editButtonOptions } = useMakeLinkEditButtonOptions(link);

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // shift + 좌 클릭 시 토글
    if (e.shiftKey && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      toggle();
      // 좌 클릭 시 새 탭 생성
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
        isSelected={isSelected}
        dragAction={(e) => {
          e.dataTransfer.setData('dragType', 'bookmark');
          select();
        }}
        dragEndAction={() => {
          setTimeout(() => {
            deselect('all');
          }, 100);
        }}
        etcStyles={{
          width: '100%',
        }}
      >
        {({ isDrag }) => {
          return (
            <Flex
              justify="space-between"
              align="center"
              gap="10px"
              etcStyles={getBookmarkLinkWrapperStyle({
                isDrag,
                isSelected,
              })}
            >
              <Center etcStyles={getBookmarkLinkIconWrapperStyle()}>
                <Image
                  css={css(getBookmarkLinkImageStyle())}
                  src={`http://www.google.com/s2/favicons?domain=${link.url}`}
                  alt={`${link.title} 아이콘`}
                  fallbackComponent={
                    <span aria-label={`${link.title} 아이콘`} role="img">
                      🎮
                    </span>
                  }
                />
              </Center>
              <p css={css(getBookmarkLinkTitleStyle())}>{link.title}</p>
              <BookmarkEditButtonUI options={editButtonOptions} />
            </Flex>
          );
        }}
      </DnD.MultiDraggable>
    </div>
  );
}

export default BookmarkLink;

function getBookmarkLinkWrapperStyle({
  isDrag,
  isSelected,
}: {
  isDrag: boolean;
  isSelected: boolean;
}): CSSObject {
  return {
    width: '100%',
    padding: '8px 12px',
    background: isDrag ? '#3b82f6' : 'white',
    border: `1px solid ${isSelected ? '#3b82f6' : color.slate['200']}`,
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
  };
}

function getBookmarkLinkIconWrapperStyle() {
  return {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    fontSize: '10px',
    flexShrink: 0,
  };
}

function getBookmarkLinkImageStyle(): CSSObject {
  return {
    width: '16px',
    height: '16px',
    objectFit: 'contain',
    verticalAlign: 'middle',
  };
}

function getBookmarkLinkTitleStyle(): CSSObject {
  return {
    fontSize: '13px',
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
}
