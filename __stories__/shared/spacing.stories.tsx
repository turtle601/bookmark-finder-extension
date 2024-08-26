import { css } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'shared/spacing',
  tags: ['autodocs'],
} as const;

export default meta;

type Story = StoryObj;

export const SpacingTable: Story = {
  render: () => {
    return (
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: `repeat(2, 200px)`,
          gap: '12px',
        })}
      >
        <div>0 (0px)</div>
        <div
          css={css({
            width: spacer.spacing0,
            height: spacer.spacing0,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>1 (4px)</div>
        <div
          css={css({
            width: spacer.spacing1,
            height: spacer.spacing1,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>2 (8px)</div>
        <div
          css={css({
            width: spacer.spacing2,
            height: spacer.spacing2,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>3 (16px)</div>
        <div
          css={css({
            width: spacer.spacing3,
            height: spacer.spacing3,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>4 (24px)</div>
        <div
          css={css({
            width: spacer.spacing4,
            height: spacer.spacing4,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>5 (32px)</div>
        <div
          css={css({
            width: spacer.spacing5,
            height: spacer.spacing5,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>6 (48px)</div>
        <div
          css={css({
            width: spacer.spacing6,
            height: spacer.spacing6,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>7 (64px)</div>
        <div
          css={css({
            width: spacer.spacing7,
            height: spacer.spacing7,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>8 (96px)</div>
        <div
          css={css({
            width: spacer.spacing8,
            height: spacer.spacing8,
            backgroundColor: color.red300,
          })}
        ></div>

        <div>9 (128px)</div>
        <div
          css={css({
            width: spacer.spacing9,
            height: spacer.spacing9,
            backgroundColor: color.red300,
          })}
        ></div>
      </div>
    );
  },
};
