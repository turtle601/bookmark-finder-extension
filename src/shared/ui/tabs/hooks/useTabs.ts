import { useCallback, useState } from 'react';

export const useTabs = () => {
  const [selectedId, setSelectedId] = useState('0');

  const selectTab = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return {
    selectedId,
    selectTab,
  };
};
