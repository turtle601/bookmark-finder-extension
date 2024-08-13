import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC, ReactNode, useMemo } from 'react';

import { getTabStyle } from '@/shared/ui/tabs/part/tab/style';
import { useTabsActionContext, useTabsContext } from '@/shared/ui/tabs/model';

export interface ITabProps extends ComponentPropsWithoutRef<'li'> {
  etcStyles?: CSSObject;
  children: ReactNode;
}

const Tab: FC<ITabProps> = ({ id, children, etcStyles = {} }) => {
  const { selectedId } = useTabsContext();
  const { selectTab } = useTabsActionContext();

  const isSelected = useMemo(() => selectedId === id, [id, selectedId]);

  const handleSelectTab = () => {
    if (id) {
      selectTab(id);
      return;
    }
  };

  return (
    <li
      onClick={handleSelectTab}
      css={css({
        ...getTabStyle(isSelected),
        ...etcStyles,
      })}
    >
      {children}
    </li>
  );
};

export default Tab;
