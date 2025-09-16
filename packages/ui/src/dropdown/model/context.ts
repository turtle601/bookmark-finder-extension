import { createContext, useContext } from 'react';

interface IDropDownContextProps {
  isOpen: boolean;
  close: VoidFunction;
  toggle: VoidFunction;
}

export const DropDownContext: React.Context<IDropDownContextProps | null> =
  createContext<IDropDownContextProps | null>(null);

export const useDropDownContext = () => {
  const state = useContext(DropDownContext);
  if (!state) throw new Error('Cannot find DropDownProvider');

  return state;
};
