import Wrapper from './wrapper.ui';

import type { ModalWrapperFC } from './wrapper.ui';

export interface IModalWidget {
  Wrapper: ModalWrapperFC;
}

const ModalWidget: IModalWidget = Object.assign(
  {},
  {
    Wrapper,
  },
);

export default ModalWidget;
