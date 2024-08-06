import ModalLayer from '@/shared/ui/modalLayer';
import DnD from '@/shared/ui/dnd';
import OpenBookmarkButton from '@/features/sidebar/openBookmarkButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OpenBookmarkButton> = {
  title: 'features/OpenBookmarkButton',
  component: OpenBookmarkButton,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <ModalLayer.Provider>
        <DnD.Provider>
          <DnD.Boundary width={'360px'} height={'100vh'}>
            <DnD.PointerContent />
            <Story />
          </DnD.Boundary>
        </DnD.Provider>
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OpenBookmarkButton>;

export const Default: Story = {};
