import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';
import Sidebar from '@/processes/modal-content/sidebar';

import type { CSSObject } from '@emotion/react';

interface IOpenSidebarDefaultProps {
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

export const OpenSidebarDefault: React.FC<IOpenSidebarDefaultProps> = ({
  children,
  etcStyles = {},
  externalAction = () => {},
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar"
      modalContent={<Sidebar.Default />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
    >
      {children}
    </ModalLayer.Opener>
  );
};
