import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC, ReactElement } from 'react';

import Tab from '@/shared/ui/tabs/part/tab/tab.ui';
import Flex from '@/shared/ui/flex';

import { allocateIdxForChildren } from '@/shared/ui/tabs/lib';

export interface ITabListProps extends ComponentPropsWithoutRef<'ul'> {
  etcStyles?: CSSObject;
  children: ReactElement<typeof Tab>[];
}

const TabList: FC<ITabListProps> = ({ etcStyles = {}, children }) => {
  return (
    <Flex
      as="ul"
      css={css({
        ...etcStyles,
      })}
    >
      {allocateIdxForChildren(children, 'tab')}
    </Flex>
  );
};

export default TabList;
