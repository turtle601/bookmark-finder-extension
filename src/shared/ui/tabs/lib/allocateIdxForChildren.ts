import TabPanel, {
  ITabPanelProps,
} from '@/shared/ui/tabs/part/tabPanel/tabPanel.ui';
import {
  Children,
  FC,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

import { Tab } from '@/shared/ui/tabs/part/tab';

export const allocateIdxForChildren = (
  children: ReactElement<typeof Tab | typeof TabPanel>[],
  type: 'tab' | 'tabPanel',
) => {
  return Children.map(children, (child, idx) => {
    if (child.type !== (type === 'tab' ? Tab : TabPanel)) {
      throw new Error(`자식 요소에는 ${type} 컴포넌트만 올 수 있습니다.`);
    }
    if (!isValidElement<{ id: string }>(child)) return child;

    return cloneElement(child, {
      key: `${idx}`,
      id: `${idx}`,
    });
  });
};
