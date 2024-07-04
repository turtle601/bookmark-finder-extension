import {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react';

export type PolymorpicProps<T extends ElementType, P> = PropsWithChildren<
  {
    as?: T;
  } & P &
    ComponentPropsWithoutRef<T>
>;
