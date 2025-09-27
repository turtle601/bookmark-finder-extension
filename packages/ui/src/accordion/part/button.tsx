import React, { ComponentPropsWithoutRef, useCallback } from 'react';

import { css, type CSSObject } from '@emotion/react';

import Center from '@/layout/center';

import { useAccordionActionContext, useAccordionContext } from '../model';

export interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  id: string;
  children: React.ReactNode;
  etcStyles?: CSSObject;
  externalOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => boolean | void;
}

const Button: React.FC<IButtonProps> = ({
  id,
  children,
  etcStyles,
  externalOnClick,
  ...attribute
}) => {
  const buttonId = Number(id);

  const { selectedIdSet } = useAccordionContext();
  const { closeAccordion, openAccordion } = useAccordionActionContext();

  const toggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const result = !externalOnClick ? true : externalOnClick(e);

      if (result) {
        if (selectedIdSet.has(buttonId)) {
          closeAccordion(buttonId);
        } else {
          openAccordion(buttonId);
        }

        return;
      }
    },
    [buttonId, closeAccordion, openAccordion, selectedIdSet, externalOnClick],
  );

  return (
    <Center
      as="button"
      onClick={toggle}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    >
      {children}
    </Center>
  );
};

export default Button;
