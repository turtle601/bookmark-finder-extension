import { useState, useEffect, useCallback } from 'react';

interface IUseToggleState {
  isVisible: boolean;
  isLoading: boolean;
  error: string | null;
}

interface IUseToggleReturn extends IUseToggleState {
  toggle: () => Promise<void>;
  getState: () => Promise<void>;
}

const useToggle = (): IUseToggleReturn => {
  const [state, setState] = useState<IUseToggleState>({
    isVisible: false,
    isLoading: false,
    error: null,
  });

  // 토글 상태 가져오기
  const getState = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await chrome.runtime.sendMessage({
        action: 'getToggleState',
      });

      if (response?.success) {
        setState((prev) => ({
          ...prev,
          isVisible: response.isVisible,
          isLoading: false,
        }));
      } else {
        throw new Error('Failed to get toggle state');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, []);

  // 토글 실행
  const toggle = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await chrome.runtime.sendMessage({
        action: 'toggle',
      });

      if (response?.success) {
        // 토글 후 상태 다시 가져오기
        await getState();
      } else {
        throw new Error('Failed to toggle');
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, [getState]);

  // 초기 상태 가져오기
  useEffect(() => {
    getState();
  }, [getState]);

  return {
    ...state,
    toggle,
    getState,
  };
};

export default useToggle;
