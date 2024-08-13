import React from 'react';

import { borderRadius, color, spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';

interface IHeaderProps {
  children: React.ReactNode;
}

export type SidebarHeaderFC = React.FC<IHeaderProps>;

const Header: SidebarHeaderFC = ({ children }) => {
  return (
    <Flex
      justify={'flex-end'}
      align={'center'}
      etcStyles={{
        width: '100%',
        height: '100px',
        padding: `0 ${spacer.spacing4}`,
        borderRadius: `0 ${borderRadius.large} 0 0`,
        backgroundColor: color.gray,
      }}
    >
      {children}
    </Flex>
  );
};

export default Header;
