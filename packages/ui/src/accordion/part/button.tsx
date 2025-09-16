import React, { ComponentPropsWithoutRef, useCallback } from 'react';

import { css, type CSSObject } from '@emotion/react';

import Center from '@/layout/center';

import { useAccordionActionContext, useAccordionContext } from '../model';

export interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  id: string;
  children: React.ReactNode;
  etcStyles?: CSSObject;
}

const Button: React.FC<IButtonProps> = ({
  id,
  children,
  etcStyles,
  ...attribute
}) => {
  const buttonId = Number(id);

  const { selectedIdSet } = useAccordionContext();
  const { closeAccordion, openAccordion } = useAccordionActionContext();

  const toggle = useCallback(() => {
    if (selectedIdSet.has(buttonId)) {
      closeAccordion(buttonId);
      return;
    }

    openAccordion(buttonId);
  }, [buttonId, closeAccordion, openAccordion, selectedIdSet]);

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
