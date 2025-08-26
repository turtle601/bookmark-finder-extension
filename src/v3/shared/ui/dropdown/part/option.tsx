import { css, CSSObject } from '@emotion/react';
import { ComponentPropsWithoutRef } from 'react';

interface IDropDownOptionProps extends ComponentPropsWithoutRef<'li'> {
  children: React.ReactNode;
  etcStyles?: CSSObject;
}

function Option({
  children,
  onClick,
  etcStyles = {},
  ...attributes
}: IDropDownOptionProps) {
  return (
    <li
      data-testid="dropdown-option"
      css={css({
        cursor: 'pointer',
        ...etcStyles,
      })}
      onMouseDown={onClick}
      {...attributes}
    >
      {children}
    </li>
  );
}

export default Option;
