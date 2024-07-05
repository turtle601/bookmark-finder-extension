import React from 'react';
import { createPortal } from 'react-dom';

import {
  getModalContentStyle,
  getModalOverlayStyle,
  getModalWrapperStyle,
} from '@/shared/ui/modal/modal.style';

import { useCommand } from '@/shared/hooks';

import {
  useModalState,
  ModalType,
  useModalAction,
} from '@/shared/ui/modal/model';

export interface IModalProps {
  name: ModalType;
}

function Modal({ name }: IModalProps) {
  const { isOpen, content, zIndex } = useModalState()[name];
  const { closeModal } = useModalAction();

  const handleCloseModal = React.useCallback(() => {
    closeModal(name);
  }, [closeModal, name]);

  useCommand({ cmdKeys: ['esc'], action: handleCloseModal });

  return (
    <>
      {isOpen &&
        createPortal(
          <div css={getModalWrapperStyle(zIndex)}>
            <div
              css={getModalOverlayStyle(zIndex)}
              onClick={handleCloseModal}
            ></div>
            <div css={getModalContentStyle(zIndex)}>{content}</div>
          </div>,
          document.getElementById(name) as HTMLElement,
        )}
    </>
  );
}

export default Modal;
