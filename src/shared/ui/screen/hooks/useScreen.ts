import { useCallback, useReducer } from 'react';

import { reducer, ScreenContent, screenState } from '@/shared/ui/screen/model';

export const useScreen = () => {
  const [state, dispatch] = useReducer(reducer, screenState);

  const openSidebar = useCallback((content: ScreenContent) => {
    dispatch({
      type: 'OPEN_SIDEBAR',
      content,
    });
  }, []);

  const openModal = useCallback((content: ScreenContent) => {
    dispatch({
      type: 'OPEN_MODAL',
      content,
    });
  }, []);

  const closeSidebar = useCallback(() => {
    dispatch({
      type: 'CLOSE_SIDEBAR',
    });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  }, []);

  const clickOverlay = useCallback(() => {
    dispatch({
      type: 'CLICK_OVERLAY',
    });
  }, []);

  const pressESC = useCallback(() => {
    dispatch({
      type: 'PRESS_ESC',
    });
  }, []);

  return {
    state,
    openSidebar,
    closeSidebar,
    openModal,
    closeModal,
    clickOverlay,
    pressESC,
  };
};
