import { useCallback, useState } from 'react';
import { css, CSSObject } from '@emotion/react';

import { color } from '@/v3/shared/styles';

import {
  Center,
  DropDown,
  useDropDownContext,
} from 'bookmark-finder-extension-ui';

interface IBookmarkEditButtonProps {
  options: {
    label: string;
    action: React.MouseEventHandler;
  }[];
}

function BookmarkEditTrigger({ options }: IBookmarkEditButtonProps) {
  const { isOpen } = useDropDownContext();

  const [optionsPosition, setOptionsPosition] = useState({
    x: 0,
    y: 0,
  });

  const triggerRef = useCallback(
    (el: HTMLDivElement) => {
      if (el && isOpen) {
        setTimeout(() => {
          setOptionsPosition({
            x: el.getBoundingClientRect().left,
            y: el.getBoundingClientRect().bottom,
          });
        }, 0);
      }
    },
    [isOpen],
  );

  return (
    <div
      css={css({
        position: 'relative',
      })}
    >
      <DropDown.Trigger>
        <div ref={triggerRef}>
          <Center
            as="button"
            data-bookmark-edit-button
            etcStyles={getEditButtonWrapperStyles()}
          >
            ⋮
          </Center>
        </div>
      </DropDown.Trigger>
      <DropDown.Options etcStyles={getEditOptionsStyles(optionsPosition)}>
        {options.map((option) => {
          return (
            <DropDown.Option
              key={option.label}
              onClick={option.action}
              etcStyles={getEditOptionStyles()}
            >
              <p>{option.label}</p>
            </DropDown.Option>
          );
        })}
      </DropDown.Options>
    </div>
  );
}

function BookmarkEditButtonUI({ options }: IBookmarkEditButtonProps) {
  return (
    <DropDown.Provider>
      <BookmarkEditTrigger options={options} />
    </DropDown.Provider>
  );
}

export default BookmarkEditButtonUI;

function getEditButtonWrapperStyles() {
  return css({
    width: '12px',
    height: '100%',
    opacity: 0,
    borderRadius: '2px',
    transition: 'opacity 0.2s ease',
    background: 'transparent',
    cursor: 'pointer',
  });
}

function getEditOptionsStyles(optionsPosition: {
  x: number;
  y: number;
}): CSSObject {
  return {
    position: 'fixed',
    top: `${optionsPosition.y}px`,
    left: `${optionsPosition.x - 148}px`,
    width: '160px',
    zIndex: 99999999,
    background: color.white,
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: `1px solid ${color.slate['200']}`,
    padding: '4px 8px',
    'li + li': {
      borderTop: `1px solid ${color.slate['200']}`,
    },
  };
}

function getEditOptionStyles(): CSSObject {
  return {
    padding: '4px 0',
  };
}
