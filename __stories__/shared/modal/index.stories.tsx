import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';
import SidebarWidget from '@/widget/sidebar';
import ModalWidget from '@/widget/modal';
import Button from '@/shared/ui/button';
import { css } from '@emotion/react';
import Flex from '@/shared/ui/flex';
import Spacer from '@/shared/ui/spacer';
import { spacer } from '@/shared/config/styles';

const meta: Meta<typeof ModalLayer> = {
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div
        css={css({
          width: '100%',
          height: '500px',
        })}
      >
        <Story />
        <div id="screen"></div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ModalLayer>;

export const Story: Story = {
  render: () => {
    return (
      <Flex>
        <ModalLayer.Provider>
          <ModalLayer.Opener
            modalType="sidebar"
            modalContent={
              <SidebarWidget.Wrapper>
                <SidebarWidget.Header />
                사이드바 내용입니다.
              </SidebarWidget.Wrapper>
            }
          >
            <Button
              kind="default"
              etcStyles={{
                width: '100px',
                height: '50px',
              }}
            >
              사이드바 열기
            </Button>
          </ModalLayer.Opener>
          <ModalLayer.Wrapper />
        </ModalLayer.Provider>
        <Spacer direction="horizontal" space={spacer['spacing2.5']} />
        <ModalLayer.Provider>
          <ModalLayer.Opener
            modalType="modal"
            modalContent={
              <ModalWidget.Wrapper>모달 내용입니다.</ModalWidget.Wrapper>
            }
          >
            <Button
              kind="default"
              etcStyles={{
                width: '100px',
                height: '50px',
              }}
            >
              모달 열기
            </Button>
          </ModalLayer.Opener>
          <ModalLayer.Wrapper />
        </ModalLayer.Provider>
      </Flex>
    );
  },
};
