import { useDnDActionContext } from '@/shared/ui/dnd/model';

import { DragEventHandler } from 'react';

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
