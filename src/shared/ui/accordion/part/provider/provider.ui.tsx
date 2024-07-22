import React, { useMemo } from 'react';

import { useAccordion } from '@/shared/ui/accordion/hooks';
import {
  AccordionActionContext,
  AccordionContext,
} from '@/shared/ui/accordion/model';

export interface IProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProviderProps> = ({ children }) => {
  const { selectedIdSet, openAccordion, closeAccordion } = useAccordion();

  const action = useMemo(
    () => ({
      openAccordion,
      closeAccordion,
    }),
    [closeAccordion, openAccordion],
  );

  return (
    <AccordionContext.Provider value={{ selectedIdSet }}>
      <AccordionActionContext.Provider value={action}>
        {children}
      </AccordionActionContext.Provider>
    </AccordionContext.Provider>
  );
};

export default Provider;
