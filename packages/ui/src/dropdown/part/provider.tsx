import { useState } from 'react';

import { DropDownContext } from '../model';

interface IDropDownProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: IDropDownProviderProps) {
  const [isOpen, setValue] = useState(false);

  const close = () => {
    setValue(false);
  };

  const toggle = () => {
    setValue((preValue) => !preValue);
  };

  const contextValue = {
    isOpen,
    toggle,
    close,
  };

  return (
    <DropDownContext.Provider value={contextValue}>
      {children}
    </DropDownContext.Provider>
  );
}

export default Provider;
