import { useAccordionContext } from '../model';

interface IArrowProps {
  size: number;
  color?: string;
  strokeWidth?: string;
}

function DownArrowIcon({ size, color, strokeWidth }: IArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label="right arrow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="5,8 12,18 19,8" />
    </svg>
  );
}

function RightArrowIcon({ size, color, strokeWidth }: IArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label="down arrow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="8,5 18,12 8,19" />
    </svg>
  );
}

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
    <DownArrowIcon size={size} color={color} strokeWidth={strokeWidth} />
  ) : (
    <RightArrowIcon size={size} color={color} strokeWidth={strokeWidth} />
  );
};

export default Icon;
