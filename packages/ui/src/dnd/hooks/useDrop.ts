import { DragEventHandler } from 'react';

import { useDnDActionContext } from '@/dnd/model';

interface IUseDropParameter {
  action: DragEventHandler;
}

export const useDrop = ({ action }: IUseDropParameter) => {
  const { setMousePosition, setDragStartContent } = useDnDActionContext();

  const drop: DragEventHandler = async (e) => {
    setMousePosition(null);
    setDragStartContent(null);
    action(e);
  };

  return {
    drop,
  };
};
