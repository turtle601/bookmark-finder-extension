import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

import GlobalProvider from '@/app/provider/globalProvider';
import { useEffect } from 'react';

function ContentScript() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['isVisible'],
    queryFn: async () => {
      return await ContentScriptToggleSingleton.sendMessage({
        action: 'showContentScript',
      });
    },
  });

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ['isVisible'] });
    };

    chrome.storage.onChanged.addListener(handler);

    return () => {
      chrome.storage.onChanged.removeListener(handler);
    };
  }, [queryClient]);

  if (!data) {
    return null;
  }

  console.log(data, 'Data');

  return <div>{data.isVisible ? 'Visible' : 'Hidden'}</div>;
}

function App() {
  return (
    <GlobalProvider>
      <ContentScript />
    </GlobalProvider>
  );
}

export default App;
