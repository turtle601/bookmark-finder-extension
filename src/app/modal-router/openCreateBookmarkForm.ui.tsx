import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';
import SidebarPanel from '@/processes/modal-content/sidebarPanel';

import type { Bookmark } from '@/entities/bookmark';
import type { CSSObject } from '@emotion/react';

interface IOpenCreateBookmarkFormProps {
  folderData: Bookmark;
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

export const OpenCreateBookmarkForm: React.FC<IOpenCreateBookmarkFormProps> = ({
  folderData,
  children,
  etcStyles = {},
  externalAction = () => {},
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={<SidebarPanel.CreateBookmarkForm folderData={folderData} />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
    >
      {children}
    </ModalLayer.Opener>
  );
};
