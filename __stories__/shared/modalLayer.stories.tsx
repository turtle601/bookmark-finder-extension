import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { borderRadius, color } from '@/shared/config/styles';

import ModalLayer from '@/shared/ui/modalLayer';

import type { Meta, StoryObj } from '@storybook/react';
import { THIRD_LAYER_ZIDENX } from '@/shared/config/constant';

const meta: Meta<typeof ModalLayer> = {
  title: 'shared/ModalLayer',
};

export default meta;

type Story = StoryObj<typeof ModalLayer>;

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

export const Sidebar: Story = {
  render: () => {
    return (
      <ModalLayer.Provider>
        <ModalLayer.Opener
          modalType="sidebar"
          modalContent={
            <div
              css={css({
                position: 'absolute',
                height: '100%',
                top: '0',
                left: '0',
                zIndex: `${THIRD_LAYER_ZIDENX}`,
              })}
            >
              <SidebarContentWrapper>
                사이드바 내용입니다.
              </SidebarContentWrapper>
            </div>
          }
        >
          열기
        </ModalLayer.Opener>
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    );
  },
};

export const Modal: Story = {
  render: () => {
    return (
      <ModalLayer.Provider>
        <ModalLayer.Opener
          modalType="modal"
          modalContent={
            <div
              css={css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: `${THIRD_LAYER_ZIDENX}`,
                padding: '20px',
              })}
            >
              <ModalContentWrapper>모달 내용입니다.</ModalContentWrapper>
            </div>
          }
        >
          열기
        </ModalLayer.Opener>
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    );
  },
};

export const SidbarInBox: Story = {
  render: () => {
    return (
      <ModalLayer.Provider>
        <ModalLayer.Opener
          modalType="modal"
          modalContent={
            <div
              css={css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: `${THIRD_LAYER_ZIDENX}`,
                padding: '20px',
              })}
            >
              <ModalContentWrapper>
                <div>모달 내용입니다.</div>
                <ModalLayer.Opener
                  modalType="modal"
                  modalContent={
                    <div
                      css={css({
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: `${THIRD_LAYER_ZIDENX}`,
                        padding: '20px',
                      })}
                    >
                      <ModalContentWrapper>
                        모달 내용입니다.
                      </ModalContentWrapper>
                    </div>
                  }
                >
                  열기
                </ModalLayer.Opener>
              </ModalContentWrapper>
            </div>
          }
        >
          열기
        </ModalLayer.Opener>
        <ModalLayer.Wrapper />
      </ModalLayer.Provider>
    );
  },
};
