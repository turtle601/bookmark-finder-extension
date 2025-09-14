import type { QueryClientConfig } from '@tanstack/react-query';

import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = (config?: QueryClientConfig) => {
  return new QueryClient(config);
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = (config?: QueryClientConfig) => {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(config);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(config);
    return browserQueryClient;
  }
};
