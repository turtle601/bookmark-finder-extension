import { DragEventHandler, forwardRef, memo, Ref } from 'react';

import { CSSObject } from '@emotion/react';

import SingleDraggable from '@/v3/shared/ui/dnd/part/draggable/singleDraggable';
import { useDnDContext } from '@/v3/shared/ui/dnd/model';

export interface IMultiDraggableProps {
  children: ({ isDrag }: { isDrag: boolean }) => React.ReactNode;
  isMoved?: boolean;
  isSelected?: boolean;
  dragAction?: DragEventHandler;
  dragEndAction?: DragEventHandler;
  etcStyles?: CSSObject;
}

const MultiDraggableComponent = (
  {
    children,
    isMoved = false,
    isSelected = false,
    dragAction = () => {},
    dragEndAction = () => {},
    etcStyles = {},
  }: IMultiDraggableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { mousePosition } = useDnDContext();

  const isMultiDrag = !!mousePosition && isSelected;

  return (
    <SingleDraggable
      isMoved={isMoved}
      dragAction={dragAction}
      dragEndAction={dragEndAction}
      etcStyles={etcStyles}
      ref={ref}
    >
      {({ isDrag: isSingleDrag }) =>
        children({ isDrag: isSingleDrag || isMultiDrag })
      }
    </SingleDraggable>
  );
};

export type MultiDraggableFC = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    IMultiDraggableProps & React.RefAttributes<HTMLDivElement>
  >
>;

const MultiDraggable: MultiDraggableFC = memo(
  forwardRef(MultiDraggableComponent),
);

export default MultiDraggable;
