import { css } from '@emotion/react';

import Center from '@/v3/shared/ui/layout/center';
import Flex from '@/v3/shared/ui/layout/flex';

import { color } from '@/v3/shared/styles';

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
