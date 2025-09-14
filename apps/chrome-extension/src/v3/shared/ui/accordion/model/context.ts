import { Context, createContext, useContext } from 'react';

export interface IAccordionActionContextProps {
  openAccordion: (id: number) => void;
  closeAccordion: (id: number) => void;
}

export interface IAccordionContextProps {
  selectedIdSet: Set<number>;
}

export const AccordionContext: Context<IAccordionContextProps | null> =
  createContext<IAccordionContextProps | null>(null);

export const AccordionActionContext: Context<IAccordionActionContextProps | null> =
  createContext<IAccordionActionContextProps | null>(null);

export const useAccordionContext = () => {
  const state = useContext(AccordionContext);
  if (state === null) throw new Error('Cannot find AccordionContext');
  return state;
};

export const useAccordionActionContext = () => {
  const state = useContext(AccordionActionContext);
  if (state === null) throw new Error('Cannot find AccordionActionContext');
  return state;
};
