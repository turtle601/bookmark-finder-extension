import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC, ReactElement } from 'react';

import TabPanel from '@/shared/ui/tabs/part/tabPanel/tabPanel.ui';

import { allocateIdxForChildren } from '@/shared/ui/tabs/lib';

export interface ITabPanelsProps extends ComponentPropsWithoutRef<'div'> {
  etcStyles?: CSSObject;
  children: ReactElement<typeof TabPanel>[];
}

const TabPanels: FC<ITabPanelsProps> = ({ etcStyles = {}, children }) => {
  return (
    <div
      css={css({
        ...etcStyles,
      })}
    >
      {allocateIdxForChildren(children, 'tabPanel')}
    </div>
  );
};

export default TabPanels;
