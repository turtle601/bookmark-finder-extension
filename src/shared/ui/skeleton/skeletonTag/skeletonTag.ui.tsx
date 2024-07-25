import { getSkeletonTagStyle } from '@/shared/ui/skeleton/skeletonTag/skeletonTag.style';
import { css } from '@emotion/react';
import { ComponentPropsWithoutRef } from 'react';

interface ISkeletonTagProps extends ComponentPropsWithoutRef<'li'> {}

const SkeletonTag = ({ ...attribute }: ISkeletonTagProps) => {
  return <li css={css(getSkeletonTagStyle())} {...attribute}></li>;
};

export default SkeletonTag;
