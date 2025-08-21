import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/v3/shared/lib/tanstack/queryClient';

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
