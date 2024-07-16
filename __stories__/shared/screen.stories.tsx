import { css } from '@emotion/react';

import { THIRD_LAYER_ZIDENX } from '@/shared/config/constant';
import { borderRadius, color } from '@/shared/config/styles';
import Button from '@/shared/ui/button';
import Flex from '@/shared/ui/flex';
import Screen from '@/shared/ui/screen';

import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

const meta: Meta<typeof Screen> = {
  title: 'shared/Screen',
};

export default meta;

type Story = StoryObj<typeof Screen>;

function ModalContentWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      css={css({
        width: '600px',
        height: '300px',
        backgroundColor: color.white,
        border: `2px solid ${color.gray300}`,
        borderRadius: borderRadius.small,
      })}
    >
      {children}
    </div>
  );
}

function SidebarContentWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      css={css({
        width: '360px',
        height: '100%',
        backgroundColor: color.white,
        border: `2px solid ${color.gray300}`,
        borderRadius: `0 ${borderRadius.large} ${borderRadius.large} 0`,
      })}
    >
      {children}
    </div>
  );
}

export const Modal: Story = {
  render: () => {
    return (
      <Screen.Provider>
        <Screen.Overlay />
        <Flex
          etcStyles={{
            width: '100%',
            zIndex: THIRD_LAYER_ZIDENX,
          }}
          gap="12px"
          justify={'flex-end'}
        >
          <Screen.Opener
            kind="sidebar"
            screenContent={
              <SidebarContentWrapper>
                <div>사이드바 컨텐츠 내용입니다</div>
                <Screen.Opener
                  kind="modal"
                  screenContent={
                    <ModalContentWrapper>
                      모달 컨텐츠 내용입니다
                    </ModalContentWrapper>
                  }
                >
                  <Button
                    kind="default"
                    etcStyles={{
                      padding: '12px',
                    }}
                  >
                    모달 열기
                  </Button>
                </Screen.Opener>
              </SidebarContentWrapper>
            }
          >
            <Button
              kind="default"
              etcStyles={{
                padding: '12px',
              }}
            >
              사이드바 열기
            </Button>
          </Screen.Opener>
        </Flex>
      </Screen.Provider>
    );
  },
};

export const Sidebar: Story = {
  render: () => {
    return (
      <Screen.Provider>
        <Screen.Opener kind="sidebar" screenContent={<div></div>}>
          <Button
            kind="default"
            etcStyles={{
              padding: '12px',
            }}
          >
            사이드바 열기
          </Button>
        </Screen.Opener>
        <Screen.Overlay />
      </Screen.Provider>
    );
  },
};
