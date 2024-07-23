import { css, CSSObject } from '@emotion/react';

import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useState,
} from 'react';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import XIcon from '@/shared/config/assets/x.svg';

import { color } from '@/shared/config/styles';
import { getTagStyle } from '@/shared/ui/tag/tag.style';

interface ITagProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  children?: ReactNode;
  etcStyles?: CSSObject;
}

const TagComponent = (
  { label, children, etcStyles = {}, ...attribute }: ITagProps,
  ref: Ref<HTMLInputElement>,
) => {
  const [isShow, setIsShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const toggleTag = useCallback(() => {
    const isSelected = !isChecked;
    setIsChecked(isSelected);
  }, [isChecked]);

  const closeTag = useCallback(() => {
    setIsShow(false);
  }, []);

  return (
    isShow && (
      <>
        <input
          id={label}
          ref={ref}
          value={label}
          checked={isChecked}
          type="checkbox"
          css={css({
            display: 'none',
          })}
        />
        <Flex
          as="button"
          justify="space-between"
          align="center"
          gap="12px"
          etcStyles={{
            ...getTagStyle(isChecked),
            ...etcStyles,
          }}
          onClick={toggleTag}
          {...attribute}
        >
          <label htmlFor={label}>
            <Text
              label={label}
              type="sm"
              fontWeightType="semibold"
              textColor={color.white}
              etcStyles={{
                fontSize: '12px',
                lineHeight: 0,
              }}
            />
          </label>
          <button type="button" onClick={closeTag}>
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
