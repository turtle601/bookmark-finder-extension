import { FC, ReactNode, useCallback, useState } from 'react';
import { CSSObject } from '@emotion/react';

import Flex from '@/shared/ui/flex';
import XIcon from '@/shared/config/assets/x.svg';

import { getTagStyle } from '@/shared/ui/tag/tag.style';

interface ITagProps {
  children: ReactNode;
  isSelected?: boolean;
  etcStyles?: CSSObject;
}

const Tag: FC<ITagProps> = ({
  children,
  isSelected = false,
  etcStyles = {},
}) => {
  const [isShow, setIsShow] = useState(true);

  const closeTag = useCallback(() => {
    setIsShow(false);
  }, [isShow]);

  return (
    isShow && (
      <Flex
        justify="space-between"
        align="center"
        gap="12px"
        etcStyles={{
          ...getTagStyle(isSelected),
          ...etcStyles,
        }}
      >
        <div>{children}</div>
        <button type="button" onClick={closeTag}>
          <XIcon />
        </button>
      </Flex>
    )
  );
};

export default Tag;
