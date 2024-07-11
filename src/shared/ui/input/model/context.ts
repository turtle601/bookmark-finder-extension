import { ChangeEventHandler, Context, createContext, useContext } from 'react';

export interface IInputActionContextProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleFocus: ChangeEventHandler<HTMLInputElement>;
  handleBlur: ChangeEventHandler<HTMLInputElement>;
  validate?: (value: string) => boolean;
}

export interface IInputContextProps {
  name: string;
  value: string;
  touched: boolean;
  isError: boolean;
}

export const InputContext: Context<IInputContextProps | null> =
  createContext<IInputContextProps | null>(null);

export const InputActionContext: Context<IInputActionContextProps | null> =
  createContext<IInputActionContextProps | null>(null);

export const useInputContext = () => {
  const state = useContext(InputContext);
  if (state === null) throw new Error('Cannot find InputContext');
  return state;
};

export const useInputActionContext = () => {
  const state = useContext(InputActionContext);
  if (state === null) throw new Error('Cannot find InputContext');
  return state;
};
