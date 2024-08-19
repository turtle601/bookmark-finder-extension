import React from 'react';
import { css } from '@emotion/react';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import Spacer from '@/shared/ui/spacer';

import { spacer } from '@/shared/config/styles';
import { getFaviconkitIcon } from '@/shared/lib/icon';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarkLinkProps {
  bookmark: Bookmark;
}

export const ClassfiedBookmarkLink: React.FC<IBookmarkLinkProps> = ({
  bookmark,
}) => {
  return (
    <li>
      <Flex
        align={'center'}
        etcStyles={{
          width: '100%',
        }}
      >
        <Center
          css={css({
            width: `24px`,
            height: `32px`,
            flex: 'none',
          })}
        >
          <img
            width={`16px`}
            height={`16px`}
            src={getFaviconkitIcon(bookmark.url as string, 16)}
            alt={`${bookmark.title}'s icon`}
          />
        </Center>
        <Spacer direction="horizontal" space={spacer.spacing2} />
        <Text type="sm" label={bookmark.title} />
      </Flex>
    </li>
  );
};
