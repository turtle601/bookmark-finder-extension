import { IScreenState, ScreenContent } from '@/shared/ui/screen/model/context';

type ScreenAction =
  | { type: 'OPEN_SIDEBAR'; content: ScreenContent }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'OPEN_MODAL'; content: ScreenContent }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CLICK_OVERLAY' }
  | { type: 'PRESS_ESC' };

export const screenState: IScreenState = {
  sidebar: {
    isOpen: false,
    content: null,
  },
  modal: {
    isOpen: false,
    content: null,
  },
};

export function reducer(
  state: IScreenState,
  action: ScreenAction,
): IScreenState {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sidebar: {
          isOpen: true,
          content: action.content,
        },
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        sidebar: {
          isOpen: false,
          content: null,
        },
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: {
          isOpen: true,
          content: action.content,
        },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: {
          isOpen: false,
          content: null,
        },
      };
    case 'CLICK_OVERLAY':
      return closeActionForOverlay(state);

    case 'PRESS_ESC':
      return closeActionForOverlay(state);

    default:
      throw new Error('지정된 액션이 없습니다!!');
  }
}

function closeActionForOverlay(state: IScreenState) {
  const isAllOpen = state.modal.isOpen && state.sidebar.isOpen;
  const isJustSidbarOpen = !state.modal.isOpen && state.sidebar.isOpen;

  if (isAllOpen) {
    return {
      ...state,
      modal: {
        isOpen: false,
        content: null,
      },
    };
  } else if (isJustSidbarOpen) {
    return {
      modal: {
        isOpen: false,
        content: null,
      },
      sidebar: {
        isOpen: false,
        content: null,
      },
    };
  } else {
    return state;
  }
}
