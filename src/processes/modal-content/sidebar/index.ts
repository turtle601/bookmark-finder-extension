import Default from './default.ui';
import ClassifiedBookmarkForm from './classifiedBookmarkForm.ui';

import type { SidebarDefaultFC } from './default.ui';
import type { ClassifiedBookmarkFormFC } from './classifiedBookmarkForm.ui';

export interface ISidebarDefault {
  Default: SidebarDefaultFC;
  ClassifiedBookmarkForm: ClassifiedBookmarkFormFC;
}

const Sidebar: ISidebarDefault = Object.assign(
  {},
  {
    Default,
    ClassifiedBookmarkForm,
  },
);

export default Sidebar;
