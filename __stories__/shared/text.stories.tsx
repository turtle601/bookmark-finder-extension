import { spacer } from '@/shared/config/styles';
import Spacer from '@/shared/ui/spacer';
import Text from '@/shared/ui/text';
import { css } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  component: Text,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Text>;

const message = 'The quick brown fox jumps over the lazy dog' as const;

export const Default: Story = {
  render: () => {
    return (
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: `repeat(2, 1fr)`,
          gap: spacer.spacing6,
        })}
      >
        <div>
          <Text label="lg" fontWeightType="bold" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label="size: 24px, font-family: Inter" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label={message} type="lg" />
        </div>
        <div>
          <Text label="md" fontWeightType="bold" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label="size: 16px, font-family: Inter" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label={message} type="md" />
        </div>
        <div>
          <Text label="sm" fontWeightType="bold" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label="size: 14px, font-family: Inter" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label={message} type="sm" />
        </div>
        <div>
          <Text label="xs" fontWeightType="bold" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label="size: 12px, font-family: Inter" />
          <Spacer direction="vertical" space={spacer['spacing2.5']} />
          <Text label={message} type="xs" />
        </div>
      </div>
    );
  },
};
