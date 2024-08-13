import Default from './default.ui';

import type { SidebarDefaultFC } from './default.ui';

export interface ISidebarDefault {
  Default: SidebarDefaultFC;
}

const Sidebar: ISidebarDefault = Object.assign(
  {},
  {
    Default,
  },
);

export default Sidebar;
