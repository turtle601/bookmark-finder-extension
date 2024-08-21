import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';
import SidebarPanel from '@/processes/modal-content/sidebarPanel';

import type { CSSObject } from '@emotion/react';

interface IOpenCreateFolderCategoryFormProps {
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

const OpenCreateFolderCategoryForm: React.FC<
  IOpenCreateFolderCategoryFormProps
> = ({ children, etcStyles, externalAction }) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-panel"
      modalContent={<SidebarPanel.CreateFolderCategoryForm />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
    >
      {children}
    </ModalLayer.Opener>
  );
};

export default OpenCreateFolderCategoryForm;
