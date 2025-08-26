import { useCallback, useState } from 'react';

export const useAccordion = () => {
  const [selectedIdSet, setSelectedIdSet] = useState<Set<number>>(new Set());

  const openAccordion = useCallback(
    (id: number) => {
      setSelectedIdSet((prev) => {
        const copiedSet = new Set([...prev]);
        copiedSet.add(id);
        return copiedSet;
      });
    },
    [], // 의존성 배열 비움
  );

  const closeAccordion = useCallback(
    (id: number) => {
      setSelectedIdSet((prev) => {
        const copiedSet = new Set([...prev]);
        copiedSet.delete(id);
        return copiedSet;
      });
    },
    [], // 의존성 배열 비움
  );

  return {
    selectedIdSet,
    openAccordion,
    closeAccordion,
  };
};
