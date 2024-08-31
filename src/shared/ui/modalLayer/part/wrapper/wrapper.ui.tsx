import React from 'react';

import { css } from '@emotion/react';

import { createPortal } from 'react-dom';

import { useCommand } from '@/shared/hooks';

import {
  useModalLayerActionContext,
  useModalLayerContext,
} from '@/shared/ui/modalLayer/model';

import {
  getScreenOverlayStyle,
  getScreenWrapperStyle,
} from '@/shared/ui/modalLayer/part/wrapper/style';
import { ShadowProvider } from '@/app/provider/shadowProvider';

const Wrapper: React.FC = () => {
  const modalLayerStateList = useModalLayerContext();
  const { popModal } = useModalLayerActionContext();

  useCommand({ cmdKeys: ['esc'], action: popModal });

  return (
    modalLayerStateList.length > 0 &&
    createPortal(
      <ShadowProvider>
        <main css={css({ ...getScreenWrapperStyle() })}>
          <div
            css={css({ ...getScreenOverlayStyle() })}
            onClick={popModal}
          ></div>
          {modalLayerStateList.map((modalState) => {
            return modalState.content;
          })}
        </main>
      </ShadowProvider>,
      document.getElementById('screen') as HTMLElement,
    )
  );
};

export default Wrapper;
