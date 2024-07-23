import { css, CSSObject } from '@emotion/react';
import React from 'react';

import Center from '@/shared/ui/center';
import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import FolderIcon from '@/shared/config/assets/folder.svg';

import { color, spacer } from '@/shared/config/styles';
import { getFaviconkitIcon } from '@/shared/lib/icon';

import type { Bookmark } from '@/entities/bookmark/bookmark.type';

interface IBookmarkProps {
  size: number;
  bookmark: Bookmark;
  etcStyles?: CSSObject;
}

const BookmarkNode: React.FC<IBookmarkProps> = ({
  bookmark,
  size = 24,
  etcStyles = {},
}) => {
  const handleNavigation = () => {
    if (bookmark.url) {
      window.location.href = bookmark.url;
    }
  };

  return (
    <li
      key={bookmark.id}
      css={css({
        width: '100%',
        padding: spacer.spacing2,
        ...etcStyles,
      })}
      onClick={handleNavigation}
    >
      {bookmark.url ? (
        <Flex align={'center'} gap={'12px'}>
          <Center
            css={css({
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color.white,
            })}
          >
            <img
              width={`${(size * 2) / 3}px`}
              height={`${(size * 2) / 3}px`}
              src={getFaviconkitIcon(bookmark.url, (size * 2) / 3)}
              alt={`${bookmark.title}'s icon`}
            />
          </Center>
          <Flex
            align={'center'}
            css={css({
              height: `${size}px`,
            })}
          >
            <Text type="sm" label={bookmark.title} />
          </Flex>
        </Flex>
      ) : (
        <Flex align={'center'} gap={'12px'}>
          <Center
            css={css({
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color.white,
            })}
          >
            <FolderIcon />
          </Center>
          <Flex
            align={'center'}
            css={css({
              height: `${size}px`,
            })}
          >
            <Text type="sm" label={bookmark.title} />
          </Flex>
        </Flex>
      )}
    </li>
  );
};

export default BookmarkNode;
