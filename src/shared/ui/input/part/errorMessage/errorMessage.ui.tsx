import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { color } from '@/shared/config/styles';

import WarningIcon from '@/shared/config/assets/warning.svg';

import { useInputContext } from '@/shared/ui/input/model/context';

export interface IErrorMessageProps extends ComponentPropsWithoutRef<'span'> {
  message: string;
  etcStyles?: CSSObject;
}

const ErrorMessage: FC<IErrorMessageProps> = ({ message, etcStyles = {} }) => {
  const { isError, touched } = useInputContext();

  if (!isError)
    return (
      <span
        css={css({
          display: 'block',
          width: 'auto',
          height: '36px',
        })}
      >
        {' '}
      </span>
    );

  if (!touched)
    return (
      <span
        css={css({
          display: 'block',
          width: 'auto',
          height: '36px',
        })}
      >
        {' '}
      </span>
    );

  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        height: '36px',
        marginLeft: '12px',
        color: color.red,
        ...etcStyles,
      })}
    >
      <div>
        <WarningIcon />
      </div>
      <span
        css={css({
          marginLeft: '6px',
        })}
      >
        {message}
      </span>
    </div>
  );
};

export default ErrorMessage;
