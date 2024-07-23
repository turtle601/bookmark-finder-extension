import { useState } from 'react';

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  const toggle = () => {
    setValue((v: boolean) => !v);
  };

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
};
