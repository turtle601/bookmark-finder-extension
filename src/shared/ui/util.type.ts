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

export type PolymorpicPropsExcludeChildren<T extends ElementType, P> = {
  as?: T;
} & P &
  ComponentPropsWithoutRef<T>;

export type AsyncVoidFunction = () => Promise<void>;
