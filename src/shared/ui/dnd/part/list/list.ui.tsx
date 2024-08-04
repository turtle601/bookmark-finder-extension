import React, { useLayoutEffect, useRef } from 'react';

interface IListProps {
  children: (props: {
    refs: React.MutableRefObject<HTMLDivElement[]>;
  }) => React.ReactNode;

  gap?: number;
  location?: {
    top: number;
    left: number;
  };
}

export type VerticalListFC = React.FC<IListProps>;

const VerticalList: VerticalListFC = ({ gap = 0, children, location }) => {
  const refs = useRef<HTMLDivElement[]>([]);

  const defaultTop = location?.top || 0;
  const defaultLeft = location?.left || 0;

  useLayoutEffect(() => {
    refs.current.reduce<{ top: number; left: number }[]>(
      (acc, element, index) => {
        if (index === 0) {
          element.style.top = `${defaultTop}px`;
          element.style.left = `${defaultLeft}px`;

          acc.push({ top: defaultTop, left: defaultLeft });
        } else {
          const calculatedTop =
            acc[index - 1].top +
            refs.current[index - 1].getBoundingClientRect().height +
            gap;

          element.style.top = `${calculatedTop}px`;
          element.style.left = `${defaultLeft}px`;

          acc.push({ top: calculatedTop, left: defaultLeft });
        }

        return acc;
      },
      [],
    );
  }, [defaultLeft, defaultTop, gap]);

  return <>{children({ refs })}</>;
};

export default VerticalList;
