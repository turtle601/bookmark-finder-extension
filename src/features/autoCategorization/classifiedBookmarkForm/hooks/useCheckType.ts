import { useState } from 'react';

export const useCheckType = () => {
  const [checkType, setCheckType] = useState('');

  const toggleCheckType = (type: string) => () => {
    if (!checkType) {
      setCheckType(type);
      return;
    }

    setCheckType('');
  };

  return {
    checkType,
    toggleCheckType,
  };
};
