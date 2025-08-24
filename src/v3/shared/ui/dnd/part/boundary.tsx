import React from 'react';
import { css, CSSObject } from '@emotion/react';

import { useDnDContext } from '@/v3/shared/ui/dnd/model';

interface IBoundaryProps {
  children: React.ReactNode;
  width: CSSObject['width'];
  height: CSSObject['height'];
}

export type BoundaryFC = React.FC<IBoundaryProps>;

const Boundary: BoundaryFC = ({ children, width, height }) => {
  const { boundaryRef } = useDnDContext();

  return (
    <div
      ref={boundaryRef}
      css={css({
        position: 'relative',
        width,
        height,
      })}
    >
      {children}
    </div>
  );
};

export default Boundary;
