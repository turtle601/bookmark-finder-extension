import React, { ComponentPropsWithoutRef } from 'react';
import { css } from '@emotion/react';

import {
  IModalLayerState,
  useModalLayerActionContext,
} from '@/shared/ui/modalLayer/model';

import type { CSSObject } from '@emotion/react';

import Center from '@/shared/ui/center';

export interface IOpenerProps extends ComponentPropsWithoutRef<'button'> {
  modalType: IModalLayerState['modalType'];
  modalContent: IModalLayerState['content'];
  children: React.ReactNode;
  isActionable?: boolean;
  etcStyles?: CSSObject;
  externalAction?: (e?: React.MouseEvent) => void | Promise<void>;
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

  const handleOpenModal = async (e?: React.MouseEvent) => {
    if (externalAction) await externalAction(e);
    openModal({ modalType, content: modalContent });
  };

  return (
    <Center
      as="button"
      type="button"
      css={css({
        ...etcStyles,
      })}
      onClick={handleOpenModal}
      {...attribute}
    >
      {children}
    </Center>
  );
};

export default Opener;
