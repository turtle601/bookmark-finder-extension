import { useCallback, useState } from 'react';

export const useAccordion = () => {
  const [selectedIdSet, setSelectedIdSet] = useState<Set<number>>(new Set());

  const openAccordion = useCallback(
    (id: number) => {
      const copiedSet = new Set([...selectedIdSet]);
      copiedSet.add(id);

      setSelectedIdSet(copiedSet);
    },
    [selectedIdSet],
  );

  const closeAccordion = useCallback(
    (id: number) => {
      const copiedSet = new Set([...selectedIdSet]);
      copiedSet.delete(id);

      setSelectedIdSet(copiedSet);
    },
    [selectedIdSet],
  );

  return {
    selectedIdSet,
    openAccordion,
    closeAccordion,
  };
};
