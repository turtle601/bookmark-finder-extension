import { CreateBookmarkForm } from './createBookmarkForm.ui';
import { UpdateFolderForm } from './updateFolderForm.ui';
import { UpdateLinkForm } from './updateLinkForm.ui';
import { CreateFolderCategoryForm } from '@/processes/modal-content/sidebarPanel/createFolderCategoryForm.ui';

import type { CreateBookmarkFormFC } from './createBookmarkForm.ui';
import type { UpdateFolderFormFC } from './updateFolderForm.ui';
import type { UpdateLinkFormFC } from './updateLinkForm.ui';
import type { CreateFolderCategoryFormFC } from './createFolderCategoryForm.ui';

export interface ISidebarPanel {
  CreateBookmarkForm: CreateBookmarkFormFC;
  UpdateFolderForm: UpdateFolderFormFC;
  UpdateLinkForm: UpdateLinkFormFC;
  CreateFolderCategoryForm: CreateFolderCategoryFormFC;
}

const SidebarPanel: ISidebarPanel = Object.assign(
  {},
  {
    CreateBookmarkForm,
    UpdateFolderForm,
    UpdateLinkForm,
    CreateFolderCategoryForm,
  },
);

export default SidebarPanel;
