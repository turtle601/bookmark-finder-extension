import Search from './search.ui';

import type { SearchFC } from './search.ui';

export interface IModal {
  Search: SearchFC;
}

const Modal: IModal = Object.assign(
  {},
  {
    Search,
  },
);

export default Modal;
