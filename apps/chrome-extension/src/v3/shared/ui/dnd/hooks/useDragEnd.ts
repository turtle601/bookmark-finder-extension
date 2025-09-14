import { useDnDActionContext } from '@/v3/shared/ui/dnd/model';

interface IUseMousePositionParameter {
  x: number;
  y: number;
}

export const useDragEnd = () => {
  const { setMousePosition, setDragStartContent } = useDnDActionContext();

  const dragEnd = (mousePosition: IUseMousePositionParameter | null) => {
    setDragStartContent(null);
    setMousePosition(mousePosition);
  };

  return {
    dragEnd,
  };
};
