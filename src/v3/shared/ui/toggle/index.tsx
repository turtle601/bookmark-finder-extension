import React from 'react';

import { css } from '@emotion/react';

import { Input } from '@/shared/ui/input';

import { color } from '@/shared/config/styles';

interface IToggleProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  isChecked: boolean;
  onClick: React.MouseEventHandler;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: {
    width: '32px',
    height: '16px',
    thumbSize: '12px',
    thumbOffset: '2px',
  },
  md: {
    width: '40px',
    height: '20px',
    thumbSize: '16px',
    thumbOffset: '2px',
  },
  lg: {
    width: '48px',
    height: '24px',
    thumbSize: '20px',
    thumbOffset: '2px',
  },
} as const;

const Toggle = ({
  isChecked,
  onClick,
  size = 'md',
  ref,
  ...attribute
}: IToggleProps) => {
  const config = sizeConfig[size];

  return (
    <>
      <Input
        readOnly
        ref={ref}
        checked={isChecked}
        type="checkbox"
        {...attribute}
        css={css({
          display: 'none',
        })}
      />
      <button aria-label="toggle" onClick={onClick}>
        <label
          css={css({
            display: 'block',
            position: 'relative',
            width: config.width,
            height: config.height,
            borderRadius: '30px',
            backgroundColor: isChecked ? color.green : color.white,
            boxShadow: '0 0 16px 4px rgba(0 0 0 / 10%)',
            cursor: 'pointer',
            transition: 'all 0.1s ease-in',
          })}
        >
          <span
            css={css({
              width: config.thumbSize,
              height: config.thumbSize,
              position: 'absolute',
              top: '50%',
              left: isChecked
                ? `calc(100% - ${config.thumbSize} - ${config.thumbOffset})`
                : config.thumbOffset,
              transform: 'translateY(-50%)',
              borderRadius: '50%',
              background: isChecked ? color.gray100 : color.green,
              transition: 'all 0.1s ease-in',
            })}
          ></span>
        </label>
      </button>
    </>
  );
};

export default Toggle;
