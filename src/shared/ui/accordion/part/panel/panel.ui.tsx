import React, { ComponentPropsWithoutRef } from 'react';

import { useAccordionContext } from '@/shared/ui/accordion/model';

export interface IPanelProps extends ComponentPropsWithoutRef<'div'> {
  id: string;
  children: React.ReactNode;
}

const Panel: React.FC<IPanelProps> = ({ id, children }) => {
  const buttonId = Number(id);
  const { selectedIdSet } = useAccordionContext();

  return selectedIdSet.has(buttonId) && <div>{children}</div>;
};

export default Panel;
