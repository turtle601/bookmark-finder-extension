import { css, CSSObject } from '@emotion/react';
import { ComponentPropsWithoutRef } from 'react';

import { useDropDownContext } from '@/v3/shared/ui/dropdown/model';

interface IDropDownOptionProps extends ComponentPropsWithoutRef<'li'> {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
  etcStyles?: CSSObject;
}

function Option({
  children,
  onClick,
  etcStyles = {},
  ...attributes
}: IDropDownOptionProps) {
  const { close } = useDropDownContext();

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    close();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <li
      data-testid="dropdown-option"
      css={css({
        cursor: 'pointer',
        ...etcStyles,
      })}
      onClick={handleClick}
      {...attributes}
    >
      {children}
    </li>
  );
}

export default Option;
