import { useDnDActionContext } from '@/shared/ui/dnd/model';
import type { AsyncVoidFunction } from '@/shared/ui/util.type';

interface IUseDropParameter {
  action: VoidFunction | AsyncVoidFunction;
}

export const useDrop = ({ action }: IUseDropParameter) => {
  const { setMousePosition, setDragStartContent } = useDnDActionContext();

  const drop = async () => {
    await action();

    setMousePosition(null);
    setDragStartContent(null);
  };

  return {
    drop,
  };
};
