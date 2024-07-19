import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef, MouseEventHandler } from 'react';

import {
  IModalLayerState,
  useModalLayerActionContext,
} from '@/shared/ui/modalLayer/model';

import type { CSSObject } from '@emotion/react';

export interface IOpenerProps extends ComponentPropsWithoutRef<'button'> {
  modalType: IModalLayerState['modalType'];
  modalContent: IModalLayerState['content'];
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: MouseEventHandler;
}

const Opener: React.FC<IOpenerProps> = ({
  modalType,
  modalContent,
  children,
  externalAction,
  etcStyles = {},
  ...attribute
}) => {
  const { openModal } = useModalLayerActionContext();

  const handleOpenModal: MouseEventHandler = (e) => {
    openModal({ modalType, content: modalContent });

    if (externalAction) externalAction(e);
  };

  return (
    <button
      type="button"
      {...attribute}
      onClick={handleOpenModal}
      css={css({
        ...etcStyles,
      })}
    >
      {children}
    </button>
  );
};

export default Opener;
