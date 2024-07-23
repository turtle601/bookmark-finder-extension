import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef } from 'react';

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
  externalAction?: () => void | Promise<void>;
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

  const handleOpenModal = async () => {
    if (externalAction) await externalAction();
    openModal({ modalType, content: modalContent });
  };

  return (
    <Center
      as="button"
      type="button"
      {...attribute}
      onClick={handleOpenModal}
      css={css({
        ...etcStyles,
      })}
    >
      {children}
    </Center>
  );
};

export default Opener;
