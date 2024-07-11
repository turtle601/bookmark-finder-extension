import { CSSObject, css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC, useMemo } from 'react';

import { useTabsContext } from '@/shared/ui/tabs/model';

export interface ITabPanelProps extends ComponentPropsWithoutRef<'div'> {
  etcStyles?: CSSObject;
}

const TabPanel: FC<ITabPanelProps> = ({ id, etcStyles = {}, children }) => {
  const { selectedId } = useTabsContext();

  const isSelected = useMemo(() => id === selectedId, [selectedId]);

  return (
    isSelected && (
      <div
        css={css({
          ...etcStyles,
        })}
      >
        {children}
      </div>
    )
  );
};

export default TabPanel;
