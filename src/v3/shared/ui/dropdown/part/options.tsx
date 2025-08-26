import { ComponentPropsWithoutRef, useRef } from 'react';

import { css, CSSObject } from '@emotion/react';
import { useDropDownContext } from '@/v3/shared/ui/dropdown/model';

interface IDropDownOptionsProps extends ComponentPropsWithoutRef<'ul'> {
  children: React.ReactNode;
  etcStyles?: CSSObject;
}

function Options({
  children,
  etcStyles = {},
  ...attributes
}: IDropDownOptionsProps) {
  const optionsRef = useRef<HTMLUListElement | null>(null);

  const { isOpen } = useDropDownContext();

  return (
    isOpen && (
      <ul
        data-testid="dropdown-options"
        css={css({ ...etcStyles })}
        ref={optionsRef}
        {...attributes}
      >
        {children}
      </ul>
    )
  );
}

export default Options;
