import { CSSObject } from '@emotion/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { useInputContext } from '@/shared/ui/input/model/context';

export interface ILabelProps extends ComponentPropsWithoutRef<'label'> {
  text: string;
  etcStyles?: CSSObject;
}

const Label: FC<ILabelProps> = ({ text, etcStyles = {}, ...attribute }) => {
  const { name } = useInputContext();

  return (
    <label htmlFor={name} css={{ ...etcStyles }} {...attribute}>
      {text}
    </label>
  );
};

export default Label;
