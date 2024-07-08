import type { IDragStartParameter } from '@/shared/ui/dnd/hooks/useDragStart';
export type IDragEnterParamter = IDragStartParameter;

interface IUseDragEnd {
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDragEnd = ({ setIsDrag }: IUseDragEnd) => {
  const dragEnd: React.DragEventHandler = () => {
    setIsDrag(false);
  };

  return {
    dragEnd,
  };
};
