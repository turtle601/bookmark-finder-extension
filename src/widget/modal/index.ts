import Wrapper from './wrapper.ui';

import type { ModalWrapperFC } from './wrapper.ui';

export interface ISidebarWidget {
  Wrapper: ModalWrapperFC;
}

const ModalWidget: ISidebarWidget = Object.assign(
  {},
  {
    Wrapper,
  },
);

export default ModalWidget;
