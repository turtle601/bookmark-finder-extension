import { Context, createContext, useContext } from 'react';

export interface ITabsActionContextProps {
  selectTab: (id: string) => void;
}

export interface ITabsContextProps {
  selectedId: string;
}

export const TabsContext: Context<ITabsContextProps | null> =
  createContext<ITabsContextProps | null>(null);

export const TabsActionContext: Context<ITabsActionContextProps | null> =
  createContext<ITabsActionContextProps | null>(null);

export const useTabsContext = () => {
  const state = useContext(TabsContext);
  if (state === null) throw new Error('Cannot find TabsContext');
  return state;
};

export const useTabsActionContext = () => {
  const state = useContext(TabsActionContext);
  if (state === null) throw new Error('Cannot find TabsActionContext');
  return state;
};
