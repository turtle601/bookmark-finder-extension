import Input from '@/shared/ui/input';

import { ILeftElementAttribute } from '@/shared/ui/input/part/leftElement';
import {
  Children,
  MutableRefObject,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';

const cloneDivElementWithRef = (
  element: ReactElement,
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<ILeftElementAttribute>,
    ILeftElementAttribute
  >,
) => {
  return cloneElement(element, props);
};

const giveRefForLeftElement = (
  children: ReactNode | ReactElement[] | ReactNode[],
  ref: MutableRefObject<ILeftElementAttribute | null>,
): ReactNode | ReactElement[] | ReactNode[] => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === Input.LeftElement) {
      return cloneDivElementWithRef(child, {
        ref: (el) => {
          ref.current = el;
        },
      });
    }
    return child;
  });
};

const giveFieldStyleWithLeftElement = (
  children: ReactNode | ReactElement[] | ReactNode[],
  ref: MutableRefObject<ILeftElementAttribute | null>,
): ReactNode | ReactElement[] | ReactNode[] => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === Input.Field) {
      const childProps = ref.current
        ? {
            ...child.props,
            paddingLeft: ref.current?.width,
          }
        : { ...child.props };

      return cloneElement(child, childProps);
    }

    return child;
  });
};

export const processFieldStyleWithLeftElement = (
  children: ReactNode | ReactElement[] | ReactNode[],
  ref: MutableRefObject<ILeftElementAttribute | null>,
) => {
  return giveFieldStyleWithLeftElement(
    giveRefForLeftElement(children, ref),
    ref,
  );
};
