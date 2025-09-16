export * from './model';

import { Options, Provider, Trigger, Option } from './part';

export const DropDown = {
  Provider: Provider,
  Trigger: Trigger,
  Options: Options,
  Option: Option,
} as const;
