import Opener from '@/shared/ui/screen/part/opener';
import Closer from '@/shared/ui/screen/part/closer';
import Provider from '@/shared/ui/screen/part/provider';
import Overlay from '@/shared/ui/screen/part/overlay';

import type { ICloserProps } from '@/shared/ui/screen/part/closer/closer.ui';
import type { IOpenerProps } from '@/shared/ui/screen/part/opener/opener.ui';
import type { IOverlayProps } from '@/shared/ui/screen/part/overlay/overlay.ui';

import type { IScreenProviderProps } from '@/shared/ui/screen/part/provider/provider.ui';

interface IScreen {
  Overlay: React.FC<IOverlayProps>;
  Opener: React.FC<IOpenerProps>;
  Closer: React.FC<ICloserProps>;
  Provider: React.FC<IScreenProviderProps>;
}

const Screen: IScreen = Object.assign(
  {},
  {
    Provider,
    Overlay,
    Closer,
    Opener,
  },
);

export default Screen;
