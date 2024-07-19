import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef, MouseEventHandler } from 'react';

import {
  IModalLayerState,
  useModalLayerActionContext,
} from '@/shared/ui/modalLayer/model';

import type { CSSObject } from '@emotion/react';

export interface ICloserProps extends ComponentPropsWithoutRef<'button'> {
  modalType: IModalLayerState['modalType'];
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: MouseEventHandler;
}

const Closer: React.FC<ICloserProps> = ({
  modalType,
  children,
  externalAction,
  etcStyles = {},
  ...attribute
}) => {
  const { closeModal } = useModalLayerActionContext();

  const handleCloseModal: MouseEventHandler = (e) => {
    closeModal(modalType);

    if (externalAction) externalAction(e);
  };

  return (
    <button
      type="button"
      {...attribute}
      onClick={handleCloseModal}
      css={css({
        ...etcStyles,
      })}
    >
      {children}
    </button>
  );
};

export default Closer;
