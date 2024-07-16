import { css } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import FolderIcon from '@/shared/config/assets/folder.svg';

import { getFaviconkitIcon } from '@/shared/lib/icon';

import type { IMapSearchLink } from '@/entities/search';

interface IAutoSearchLinkItem {
  bookmark: IMapSearchLink;
}

const AutoSearchLinkItem = ({ bookmark }: IAutoSearchLinkItem) => {
  const handleNavigation = () => {
    if (bookmark.url) {
      window.location.href = bookmark.url;
    }
  };

  return (
    <li
      key={bookmark.id}
      onClick={handleNavigation}
      css={css({
        width: '100%',
        padding: spacer.spacing3,
        '&:hover': {
          backgroundColor: color.gray100,
        },
      })}
    >
      {bookmark.url ? (
        <Flex align={'center'} gap={'12px'}>
          <Center
            css={css({
              width: '24px',
              height: '24px',
              backgroundColor: color.white,
            })}
          >
            <img
              width={'16px'}
              height={'16px'}
              src={getFaviconkitIcon(bookmark.url, 16)}
              alt={`${bookmark.title}'s icon`}
            />
          </Center>
          <Flex
            align={'center'}
            css={css({
              height: '24px',
            })}
          >
            <a href={bookmark.url}>
              <Text type="sm" label={bookmark.title} />
            </a>
          </Flex>
        </Flex>
      ) : (
        <Flex align={'center'} gap={'12px'}>
          <Center
            css={css({
              width: '24px',
              height: '24px',
              backgroundColor: color.white,
            })}
          >
            <FolderIcon />
          </Center>
          <Flex
            align={'center'}
            css={css({
              height: '24px',
            })}
          >
            <Text type="sm" label={bookmark.title} />
          </Flex>
        </Flex>
      )}
    </li>
  );
};

export default AutoSearchLinkItem;
