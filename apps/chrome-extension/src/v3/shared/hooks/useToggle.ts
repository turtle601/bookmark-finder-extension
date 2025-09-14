import { useState } from 'react';

export const useToggle = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue);

  const close = () => {
    setValue(false);
  };

  const toggle = () => {
    setValue((preValue) => !preValue);
  };

  return { value, close, toggle };
};
