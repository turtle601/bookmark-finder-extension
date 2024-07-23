import { useState } from 'react';

interface IArrayItem {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const useArray = <T extends IArrayItem>(initialValue: T[] = []) => {
  const [value, setValue] = useState<T[]>(initialValue);

  const push = (newValue: T) => {
    setValue((oldValue) => [...oldValue, newValue]);
  };

  const remove = (id: string) => {
    setValue((oldValue) => oldValue.filter(({ oldIdx }) => oldIdx !== id));
  };

  const pick = (id: string) => {
    setValue((oldValue) => oldValue.filter(({ oldIdx }) => oldIdx === id));
  };

  const isEmpty = () => value.length === 0;

  return { value, setValue, push, remove, isEmpty, pick };
};
