import Icon from '@/shared/ui/accordion/part/icon';
import Item from '@/shared/ui/accordion/part/item/item.ui';
import Panel from '@/shared/ui/accordion/part/panel';
import Button from '@/shared/ui/accordion/part/button';
import Provider from '@/shared/ui/accordion/part/provider/provider.ui';

import type { IIconProps } from '@/shared/ui/accordion/part/icon/icon.ui';
import type { IItemProps } from '@/shared/ui/accordion/part/item/item.ui';
import type { IPanelProps } from '@/shared/ui/accordion/part/panel/panel.ui';
import type { IButtonProps } from '@/shared/ui/accordion/part/button/button.ui';
import type { IProviderProps } from '@/shared/ui/accordion/part/provider/provider.ui';

export interface IAccordion {
  Icon: React.FC<IIconProps>;
  Panel: React.FC<IPanelProps>;
  Button: React.FC<IButtonProps>;
  Item: React.FC<IItemProps>;
  Provider: React.FC<IProviderProps>;
}

const Accordion: IAccordion = Object.assign(
  {},
  {
    Provider,
    Item,
    Panel,
    Icon,
    Button,
  },
);

export default Accordion;
