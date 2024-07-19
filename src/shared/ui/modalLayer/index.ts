import Closer from '@/shared/ui/modalLayer/part/closer';
import Opener from '@/shared/ui/modalLayer/part/opener';
import Provider from '@/shared/ui/modalLayer/part/provider/provider.ui';
import Wrapper from '@/shared/ui/modalLayer/part/wrapper';

import type { ICloserProps } from '@/shared/ui/modalLayer/part/closer/closer.ui';
import type { IOpenerProps } from '@/shared/ui/modalLayer/part/opener/opener.ui';
import type { IProviderProps } from '@/shared/ui/modalLayer/part/provider/provider.ui';

interface IModalLayer {
  Closer: React.FC<ICloserProps>;
  Opener: React.FC<IOpenerProps>;
  Wrapper: React.FC;
  Provider: React.FC<IProviderProps>;
}

const ModalLayer: IModalLayer = Object.assign(
  {},
  {
    Closer,
    Opener,
    Wrapper,
    Provider,
  },
);

export default ModalLayer;
