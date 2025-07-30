import React, { forwardRef, useCallback, useState } from 'react';

import { css } from '@emotion/react';

import XIcon from '@/shared/config/assets/x.svg';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Spacer from '@/shared/ui/spacer';

import { Input } from '@/shared/ui/input';

import { color, spacer } from '@/shared/config/styles';

import { getTagStyle } from './tag.style';

import type { CSSObject } from '@emotion/react';

interface ITagProps extends React.ComponentPropsWithoutRef<'input'> {
  text: string;
  etcStyles?: CSSObject;
  externalAction?: () => void;
}

const TagComponent = (
  { text, externalAction, etcStyles = {}, ...attribute }: ITagProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [isShow, setIsShow] = useState(true);

  const closeTag = useCallback(() => {
    setIsShow(false);

    if (externalAction) externalAction();
  }, [externalAction]);

  return (
    isShow && (
      <>
        <Input
          ref={ref}
          value={text}
          checked
          type="checkbox"
          {...attribute}
          css={css({ display: 'none' })}
          readOnly
        />
        <Flex
          align="center"
          etcStyles={{
            ...getTagStyle(),
            ...etcStyles,
          }}
        >
          <Text
            label={text}
            fontWeightType="regular"
            textColor={color.white}
            etcStyles={{
              fontSize: '12px',
              maxWidth: '92px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          />
          <Spacer direction="horizontal" space={spacer['spacing2.5']} />
          <button
            css={css({ width: 'min-content' })}
            type="button"
            onClick={closeTag}
          >
            <XIcon />
          </button>
        </Flex>
      </>
    )
  );
};

export type ITag = React.ForwardRefExoticComponent<
  ITagProps & React.RefAttributes<HTMLInputElement>
>;

const Tag: ITag = forwardRef(TagComponent);

export default Tag;
