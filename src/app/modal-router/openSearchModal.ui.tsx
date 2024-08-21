import React from 'react';

import ModalLayer from '@/shared/ui/modalLayer';

import Modal from '@/processes/modal-content/modal';

import type { CSSObject } from '@emotion/react';

interface IOpenSearchModalProps {
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
}

const OpenSearchModal: React.FC<IOpenSearchModalProps> = ({
  children,
  etcStyles,
  externalAction,
}) => {
  return (
    <ModalLayer.Opener
      modalType="search-modal"
      modalContent={<Modal.Search />}
      etcStyles={{ ...etcStyles }}
      externalAction={externalAction}
    >
      {children}
    </ModalLayer.Opener>
  );
};

export default OpenSearchModal;
