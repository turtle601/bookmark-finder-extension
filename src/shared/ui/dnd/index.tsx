import React from 'react';

import Item from '@/shared/ui/dnd/part/item';
import DropArea from '@/shared/ui/dnd/part/drop-area';
import Overlay from '@/shared/ui/dnd/part/overlay';

import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { IDropAreaProps } from '@/shared/ui/dnd/part/drop-area/drop-area.ui';
import type { IItemProps } from '@/shared/ui/dnd/part/item/item.ui';
import type { IOverlayProps } from '@/shared/ui/dnd/part/overlay/overlay.ui';

export interface IDnD {
  DropArea: React.FC<PolymorpicProps<React.ElementType, IDropAreaProps>>;
  Item: React.FC<IItemProps>;
  Overlay: React.FC<IOverlayProps>;
}

const DnD: IDnD = Object.assign(
  {},
  {
    DropArea,
    Item,
    Overlay,
  },
);

export default DnD;
