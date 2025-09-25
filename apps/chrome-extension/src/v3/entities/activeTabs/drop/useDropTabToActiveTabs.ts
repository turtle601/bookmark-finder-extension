import { useMoveTabMutation } from '@/v3/entities/chromeTab/request';

export const useDropTabToActiveTabs = () => {
  const { mutate: moveTab } = useMoveTabMutation();

  const dropTab = (tab: chrome.tabs.Tab, startIdx: number) => {
    if (!tab.id) return;

    const isSamePosition = tab.index + 1 === startIdx || tab.index === startIdx;

    if (!isSamePosition) {
      moveTab({ tabId: tab.id, index: startIdx });
    }
  };

  return {
    dropTab,
  };
};
