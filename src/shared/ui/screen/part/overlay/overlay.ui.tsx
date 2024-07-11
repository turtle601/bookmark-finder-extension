import { css } from '@emotion/react';
import { createPortal } from 'react-dom';
import React, { ComponentPropsWithoutRef } from 'react';

import { useCommand } from '@/shared/hooks';

import {
  useScreenActionContext,
  useScreenContext,
} from '@/shared/ui/screen/model';

import {
  getModalWrapperStyle,
  getScreenOverlayStyle,
  getScreenWrapperStyle,
  getSidebarWrapperStyle,
} from '@/shared/ui/screen/part/overlay/style';

export interface IOverlayProps extends ComponentPropsWithoutRef<'div'> {}

const Overlay: React.FC<IOverlayProps> = ({ ...attribute }) => {
  const { sidebar, modal } = useScreenContext();
  const { clickOverlay, pressESC } = useScreenActionContext();

  useCommand({ cmdKeys: ['esc'], action: pressESC });

  return (
    sidebar.isOpen &&
    createPortal(
      <main css={css({ ...getScreenWrapperStyle() })} {...attribute}>
        <div
          css={css({ ...getScreenOverlayStyle() })}
          onClick={clickOverlay}
        ></div>
        <section css={css({ ...getSidebarWrapperStyle() })}>
          {sidebar.content}
        </section>
        {modal.isOpen && (
          <section css={css({ ...getModalWrapperStyle() })}>
            {modal.content}
          </section>
        )}
      </main>,
      document.getElementById('screen') as HTMLElement,
    )
  );
};

export default Overlay;
