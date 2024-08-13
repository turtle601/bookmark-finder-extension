import React from 'react';

import LargeXIcon from '@/shared/config/assets/largeX.svg';

import Flex from '@/shared/ui/flex';
import ModalLayer from '@/shared/ui/modalLayer';

interface IHeaderProps {
  children: React.ReactNode;
}

export type SidebarPanelHeaderFC = React.FC<IHeaderProps>;

const Header: SidebarPanelHeaderFC = ({ children }) => {
  return (
    <Flex align={'center'} justify={'space-between'}>
      <div>{children}</div>
      <div>
        <ModalLayer.Closer modalType="sidebar-panel">
          <LargeXIcon />
        </ModalLayer.Closer>
      </div>
    </Flex>
  );
};

export default Header;
