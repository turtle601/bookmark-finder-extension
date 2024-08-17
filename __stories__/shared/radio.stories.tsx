import Radio from '@/shared/ui/radio';

import type { Meta, StoryObj } from '@storybook/react';
import Flex from '@/shared/ui/flex';

const meta: Meta<typeof Radio> = {
  title: 'shared/Radio',

  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    return (
      <Flex direction={'column'} gap={'12px'}>
        <Radio id="huey" name="drone" value="huey" />
        <Radio id="dewey" name="drone" value="dewey" />
        <Radio id="louie" name="drone" value="louie" />
      </Flex>
    );
  },
};
