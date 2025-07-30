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

  const unshift = (newValue: T) => {
    setValue((oldValue) => [newValue, ...oldValue]);
  };

  const remove = (idx: string) => {
    setValue((oldValue) =>
      oldValue.filter(({ id }) => {
        return id !== idx;
      }),
    );
  };

  const removeAll = () => {
    setValue([]);
  };

  const isEmpty = () => value.length === 0;

  return { value, setValue, push, unshift, remove, isEmpty, removeAll };
};
