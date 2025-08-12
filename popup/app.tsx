import GlobalProvider from '@/app/provider/globalProvider';

import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Popup = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['isVisible'],
    queryFn: async () => {
      return await ContentScriptToggleSingleton.sendMessage({
        action: 'showContentScript',
      });
    },
  });

  const { mutate: toggle } = useMutation({
    mutationFn: async () => {
      await ContentScriptToggleSingleton.sendMessage({
        action: 'toggleShowContentScript',
      });

      queryClient.invalidateQueries({ queryKey: ['isVisible'] });
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <button onClick={() => toggle()}>Toggle</button>
      <div>{data.isVisible ? 'Visible' : 'Hidden'}</div>
    </div>
  );
};

function App() {
  return (
    <GlobalProvider>
      <Popup />
    </GlobalProvider>
  );
}

export default App;
