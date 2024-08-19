import React, { ComponentPropsWithoutRef } from 'react';

import ModalLayer from '@/shared/ui/modalLayer';

import Sidebar from '@/processes/modal-content/sidebar';

import type { CSSObject } from '@emotion/react';

interface IOpenClassifyBookmarkFormProps
  extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

const OpenClassifyBookmarkForm: React.FC<IOpenClassifyBookmarkFormProps> = ({
  children,
  etcStyles = {},
  externalAction = () => {},
  ...attribute
}) => {
  return (
    <ModalLayer.Opener
      modalType="sidebar"
      modalContent={<Sidebar.ClassifiedBookmarkForm />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
      {...attribute}
    >
      {children}
    </ModalLayer.Opener>
  );
};

export default OpenClassifyBookmarkForm;
