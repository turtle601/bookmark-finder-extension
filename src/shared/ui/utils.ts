import { cloneElement, isValidElement, ReactElement } from 'react';

interface IInjectPropsForChildParameter {
  props: Record<string, unknown>;
  child: ReactElement;
}

export const injectPropsForChild = ({
  props,
  child,
}: IInjectPropsForChildParameter) => {
  if (!isValidElement(child))
    throw new Error('오직 하나의 컴포넌트만 children에 들어갈 수 있습니다');

  return cloneElement(child, {
    ...props,
  });
};
