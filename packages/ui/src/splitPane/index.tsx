import React, { useMemo } from 'react';
import { css, CSSObject } from '@emotion/react';

import { getPercentNumber } from './lib';
import { useSplitPaneDrag } from './hooks';

interface ISplitPaneProps {
  width: CSSObject['width'];
  height: CSSObject['height'];
  split: 'horizontal' | 'vertical';
  initialResizerPosition?: `${number}%`; // 이때 number는 0% ~ 100%;
  resizer: React.ReactNode;
  pane1: React.ReactNode;
  pane2: React.ReactNode;
}

function SplitPane({
  width,
  height,
  split,
  pane1,
  pane2,
  resizer,
  initialResizerPosition = '50%',
}: ISplitPaneProps) {
  const isVertical = useMemo(() => split === 'vertical', [split]);

  const { containerRef, position, onMouseDown } = useSplitPaneDrag(
    getPercentNumber(initialResizerPosition),
    isVertical,
  );

  return (
    <div
      ref={containerRef}
      css={css({
        width: width,
        height: height,
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
      })}
    >
      <div
        css={css({
          width: isVertical ? '100%' : `${position.toFixed(2)}%`,
          height: isVertical ? `${position.toFixed(2)}%` : '100%',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          overflow: 'auto',
        })}
      >
        {pane1}
      </div>
      <div onMouseDown={onMouseDown}>{resizer}</div>
      <div
        css={css({
          width: isVertical ? '100%' : `${(100 - position).toFixed(2)}%`,
          height: isVertical ? `${(100 - position).toFixed(2)}%` : '100%',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          overflow: 'auto',
        })}
      >
        {pane2}
      </div>
    </div>
  );
}

export default SplitPane;
