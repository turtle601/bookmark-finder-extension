import DownArrowIcon from '@/shared/config/assets/downarrow.svg';
import RightArrowIcon from '@/shared/config/assets/rightarrow.svg';

import { useAccordionContext } from '../model';

export interface IIconProps {
  id: string;
  size: number;
  color?: string;
  strokeWidth?: string;
}

const Icon: React.FC<IIconProps> = ({
  id,
  size,
  color = '#424242',
  strokeWidth = '2',
}) => {
  const buttonId = Number(id);
  const { selectedIdSet } = useAccordionContext();

  const isSelected = selectedIdSet.has(buttonId);

  return isSelected ? (
    <DownArrowIcon
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  ) : (
    <RightArrowIcon
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
};

export default Icon;
