import Input from '@/shared/ui/input';
import React, {
  ReactNode,
  ReactElement,
  Children,
  isValidElement,
  MutableRefObject,
  cloneElement,
} from 'react';

const cloneElementWithRef = (
  element: ReactElement,
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return cloneElement(element, props);
};

const processChildren = (
  children: ReactNode | ReactElement[] | ReactNode[],
  refs: MutableRefObject<(HTMLInputElement | null)[]>,
  refIdx = 0,
): ReactNode | ReactElement[] | ReactNode[] => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === Input.Field) {
      return cloneElementWithRef(child, {
        ref: (el) => {
          refs.current[refIdx] = el;
          refIdx++;
        },
      });
    }

    if (child.props && child.props.children) {
      return cloneElement(
        child,
        {},
        processChildren(child.props.children, refs, refIdx),
      );
    }

    return child;
  });
};

export const getChildrenForInputRef = (
  children: ReactNode | ReactElement[],
  refs: MutableRefObject<(HTMLInputElement | null)[]>,
) => {
  return processChildren(children, refs);
};
