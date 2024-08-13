import { CreateBookmarkForm } from './createBookmarkForm.ui';
import { UpdateFolderForm } from './updateFolderForm.ui';
import { UpdateLinkForm } from './updateLinkForm.ui';

import type { CreateBookmarkFormFC } from './createBookmarkForm.ui';
import type { UpdateFolderFormFC } from './updateFolderForm.ui';
import type { UpdateLinkFormFC } from './updateLinkForm.ui';

export interface ISidebarPanel {
  CreateBookmarkForm: CreateBookmarkFormFC;
  UpdateFolderForm: UpdateFolderFormFC;
  UpdateLinkForm: UpdateLinkFormFC;
}

const SidebarPanel: ISidebarPanel = Object.assign(
  {},
  {
    CreateBookmarkForm,
    UpdateFolderForm,
    UpdateLinkForm,
  },
);

export default SidebarPanel;
