import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef, MouseEvent } from 'react';

import {
  IModalLayerState,
  useModalLayerActionContext,
} from '@/shared/ui/modalLayer/model';

import type { CSSObject } from '@emotion/react';

import Center from '@/shared/ui/center';

export interface ICloserProps extends ComponentPropsWithoutRef<'button'> {
  modalType: IModalLayerState['modalType'];
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalAction?: (e?: MouseEvent) => void | Promise<void>;
}

const Closer: React.FC<ICloserProps> = ({
  modalType,
  children,
  externalAction,
  etcStyles = {},
  ...attribute
}) => {
  const { closeModal } = useModalLayerActionContext();

  const handleCloseModal = async (e?: MouseEvent) => {
    if (externalAction) await externalAction(e);
    closeModal(modalType);
  };

  return (
    <Center
      as="button"
      type="button"
      css={css({
        ...etcStyles,
      })}
      onClick={handleCloseModal}
      {...attribute}
    >
      {children}
    </Center>
  );
};

export default Closer;
