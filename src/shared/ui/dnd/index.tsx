import React from 'react';

import Dragable from '@/shared/ui/dnd/part/dragable';
import DragableLine from '@/shared/ui/dnd/part/dragable/dragableLine';
import Dropable from '@/shared/ui/dnd/part/dropable';
import DropableLine from '@/shared/ui/dnd/part/dropable/dropableLine';
import Overlay from '@/shared/ui/dnd/part/overlay';

import type { IDragableProps } from '@/shared/ui/dnd/part/dragable/dragable.ui';
import type { PolymorpicProps } from '@/shared/ui/util.type';
import type { IDropableProps } from '@/shared/ui/dnd/part/dropable/dropable.ui';
import type { IDragableLineProps } from '@/shared/ui/dnd/part/dragable/dragableLine/dragableLine.ui';
import type { IDropableLineProps } from '@/shared/ui/dnd/part/dropable/dropableLine/dropableLine.ui';
import type { IOverlayProps } from '@/shared/ui/dnd/part/overlay/overlay.ui';

export interface IDnD {
  Dragable: React.FC<PolymorpicProps<React.ElementType, IDragableProps>>;
  DragableLine: React.FC<
    PolymorpicProps<React.ElementType, IDragableLineProps>
  >;
  Dropable: React.FC<PolymorpicProps<React.ElementType, IDropableProps>>;
  DropableLine: React.FC<
    PolymorpicProps<React.ElementType, IDropableLineProps>
  >;
  Overlay: React.FC<IOverlayProps>;
}

const DnD: IDnD = Object.assign(
  {},
  {
    Dragable,
    DragableLine,
    Dropable,
    DropableLine,
    Overlay,
  },
);

export default DnD;
