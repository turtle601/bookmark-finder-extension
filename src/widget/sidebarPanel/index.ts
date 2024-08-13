import Header from './header.ui';
import Wrapper from './wrapper.ui';

import type { SidebarPanelHeaderFC } from './header.ui';
import type { SidebarPanelWrapperFC } from './wrapper.ui';

export interface ISidebarPanelWidget {
  Header: SidebarPanelHeaderFC;
  Wrapper: SidebarPanelWrapperFC;
}

const SidebarPanelWidget: ISidebarPanelWidget = Object.assign(
  {},
  {
    Header,
    Wrapper,
  },
);

export default SidebarPanelWidget;
