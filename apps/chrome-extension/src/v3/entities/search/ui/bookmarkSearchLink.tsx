import { css, CSSObject } from '@emotion/react';
import { Center, Flex, Image } from 'bookmark-finder-extension-ui';

import type { ISearchBookmarkLink } from '@/v3/background/utils';

interface IBookmarkSearchLinkUIProps {
  bookmark: ISearchBookmarkLink;
  onClick: () => void;
}

function BookmarkSearchLinkUI({
  bookmark,
  onClick,
}: IBookmarkSearchLinkUIProps) {
  return (
    <div css={css(getBookmarkSearchLinkUIWrapperStyle())} onClick={onClick}>
      <Flex
        align="center"
        direction="row"
        etcStyles={css({
          marginBottom: '4px',
        })}
      >
        <Flex gap="8px" align="center">
          <Center css={css(getBookmarkSearchLinkUIIconWrapperStyle())}>
            <Image
              src={bookmark.faviconUrl}
              alt={`${bookmark.title} 아이콘`}
              fallbackComponent={
                <span aria-label={`${bookmark.title} 아이콘`} role="img">
                  🎮
                </span>
              }
              css={css(getBookmarkSearchLinkUIIconStyle())}
            />
          </Center>
          <span css={css(getBookmarkSearchLinkUITitleStyle())}>
            {bookmark.title}
          </span>
        </Flex>
      </Flex>
      <div css={css(getBookmarkSearchLinkUIUrlStyle())}>{bookmark.url}</div>
    </div>
  );
}

export default BookmarkSearchLinkUI;

function getBookmarkSearchLinkUIWrapperStyle(): CSSObject {
  return {
    padding: '8px 12px',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: '6px',
    '&:hover': {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderBottom: '1px solid transparent',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
  };
}

function getBookmarkSearchLinkUIIconWrapperStyle(): CSSObject {
  return {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    fontSize: '10px',
  };
}

function getBookmarkSearchLinkUIIconStyle(): CSSObject {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    verticalAlign: 'middle',
  };
}

function getBookmarkSearchLinkUITitleStyle(): CSSObject {
  return {
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '1.4',
  };
}

function getBookmarkSearchLinkUIUrlStyle(): CSSObject {
  return {
    fontSize: '11px',
    color: '#64748b',
    marginLeft: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '3px',
  };
}
