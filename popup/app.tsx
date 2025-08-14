import GlobalProvider from '@/app/provider/globalProvider';
import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Toggle from '@/shared/ui/toggle';

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
    <Flex
      justify="space-between"
      etcStyles={{
        width: '200px',
        height: '100px',
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        etcStyles={{
          width: '100%',
          height: '50px',
        }}
      >
        <Text label="북마크 AI 파인더 켜기/끄기" />
        <Toggle onClick={() => toggle()} isChecked={data.isVisible} size="sm" />
      </Flex>
    </Flex>
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
