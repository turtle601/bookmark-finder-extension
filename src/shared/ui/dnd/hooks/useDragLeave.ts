import { useDnDActionContext } from '@/shared/ui/dnd/model';

export const useDragLeave = () => {
  const { setDragEnterItem } = useDnDActionContext();

  const dragLeave = () => {
    setDragEnterItem(null);
  };

  return {
    dragLeave,
  };
};
