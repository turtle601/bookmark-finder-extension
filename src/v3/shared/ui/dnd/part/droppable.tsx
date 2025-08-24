import { css } from '@emotion/react';
import { forwardRef, memo, ReactNode, Ref } from 'react';
import { useDroppable } from '@/v3/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';

interface IDropableProps {
  children: (props: { isDragEnter: boolean }) => ReactNode;
  dropAction: React.DragEventHandler;
  etcStyles?: CSSObject;
}

const DroppableComponent = (
  { dropAction, children, etcStyles = {}, ...attribute }: IDropableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { isDragEnter, handleDragEnter, handleDragLeave, handleDrop } =
    useDroppable({ action: dropAction });

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    >
      {children({ isDragEnter })}
    </div>
  );
};

export type DroppableFC = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    IDropableProps & React.RefAttributes<HTMLDivElement>
  >
>;

const Droppable: DroppableFC = memo(forwardRef(DroppableComponent));

export default Droppable;
