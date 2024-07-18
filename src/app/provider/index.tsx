import { Global } from '@emotion/react';
import { globalStyle } from '@/shared/config/styles/global';
import { QueryClientProvider } from '@/app/provider/queryClientProvider';

import AutoSearch from '@/features/search/autoSearch/autoSearch.ui';

const Provider = () => {
  return (
    <QueryClientProvider>
      <Global styles={globalStyle} />
      <AutoSearch />
    </QueryClientProvider>
  );
};

export default Provider;
