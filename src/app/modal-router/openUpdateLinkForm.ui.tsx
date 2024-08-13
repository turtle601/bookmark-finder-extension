import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';
import SidebarPanel from '@/processes/modal-content/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';
import type { CSSObject } from '@emotion/react';

interface IOpenUpdateLinkFormProps {
  bookmark: Bookmark;
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

export const OpenUpdateLinkForm: React.FC<IOpenUpdateLinkFormProps> = ({
  bookmark,
  children,
  etcStyles = {},
  externalAction = () => {},
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={<SidebarPanel.UpdateLinkForm bookmark={bookmark} />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
    >
      {children}
    </ModalLayer.Opener>
  );
};
