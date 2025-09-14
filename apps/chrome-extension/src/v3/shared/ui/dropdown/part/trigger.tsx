import { css } from '@emotion/react';
import { ComponentPropsWithoutRef, useRef } from 'react';

import { useDropDownContext } from '@/v3/shared/ui/dropdown/model';

interface IDropDownTriggerProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  etcStyles?: React.CSSProperties;
}

function Trigger({
  onClick,
  children,
  etcStyles = {},
  ...attributes
}: IDropDownTriggerProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const { toggle, close } = useDropDownContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    toggle();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      data-testid="dropdown-trigger"
      ref={triggerRef}
      css={css({
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        ...etcStyles,
      })}
      onBlur={close}
      onClick={handleClick}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Trigger;
