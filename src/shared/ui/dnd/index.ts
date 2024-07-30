import Provider from '@/shared/ui/dnd/part/provider';
import Dragable from '@/shared/ui/dnd/part/dragable';
import Dropable from '@/shared/ui/dnd/part/dropable';
import PointerContent from '@/shared/ui/dnd/part/pointerContent';

import type { DragableFC } from '@/shared/ui/dnd/part/dragable/dragable.ui';
import type { DropableFC } from '@/shared/ui/dnd/part/dropable/dropable.ui';
import type { DnDProviderFC } from '@/shared/ui/dnd/part/provider/provider.ui';
import type { PointerContentFC } from '@/shared/ui/dnd/part/pointerContent/pointerContent.ui';

export interface IDnD {
  Dragable: DragableFC;
  Dropable: DropableFC;
  Provider: DnDProviderFC;
  PointerContent: PointerContentFC;
}

const DnD: IDnD = Object.assign(
  {},
  {
    Dragable,
    Dropable,
    Provider,
    PointerContent,
  },
);

export default DnD;
