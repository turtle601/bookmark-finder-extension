import Header from './header.ui';
import Wrapper from './wrapper.ui';

import type { SidebarHeaderFC } from './header.ui';
import type { SidebarWrapperFC } from './wrapper.ui';

export interface ISidebarWidget {
  Header: SidebarHeaderFC;
  Wrapper: SidebarWrapperFC;
}

const SidebarWidget: ISidebarWidget = Object.assign(
  {},
  {
    Header,
    Wrapper,
  },
);

export default SidebarWidget;
