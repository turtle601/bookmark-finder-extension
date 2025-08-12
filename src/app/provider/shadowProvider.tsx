import { ReactNode, useEffect, useRef, useState } from 'react';

import root from 'react-shadow/emotion';
import { CacheProvider, EmotionCache, Global } from '@emotion/react';

import createCache from '@emotion/cache';

import { globalStyle } from '@/shared/config/styles/global';

interface IShadowProviderProps {
  children: ReactNode;
}

const ShadowProvider: React.FC<IShadowProviderProps> = ({ children }) => {
  const shadowRootRef = useRef<HTMLDivElement>(null);
  const [emotionCache, setEmotionCache] = useState<EmotionCache>();

  useEffect(() => {
    if (!shadowRootRef.current?.shadowRoot) {
      return;
    }

    if (shadowRootRef.current && !emotionCache) {
      const cache = createCache({
        key: 'bookmark-ai-finder',
        container: shadowRootRef.current.shadowRoot,
      });

      setEmotionCache(cache);
    }
  }, [emotionCache]);

  return (
    <root.div ref={shadowRootRef}>
      {emotionCache && (
        <CacheProvider value={emotionCache}>
          <Global styles={globalStyle} />
          {children}
        </CacheProvider>
      )}
    </root.div>
  );
};

export default ShadowProvider;
