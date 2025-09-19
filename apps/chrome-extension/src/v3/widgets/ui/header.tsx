import { css } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import { Center, Flex } from 'bookmark-finder-extension-ui';

function Header() {
  return (
    <Flex as="header" align="center" gap="10px">
      <Center
        etcStyles={{
          width: '28px',
          height: '28px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        🔖
      </Center>
      <span
        css={css({
          fontSize: '18px',
          fontWeight: '600',
          color: color.slate['900'],
        })}
      >
        Bookmark Finder
      </span>
    </Flex>
  );
}

export default Header;
