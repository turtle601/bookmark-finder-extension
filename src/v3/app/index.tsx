import React from 'react';

import { css, Global } from '@emotion/react';

import { color, globalStyle, slate } from '@/v3/shared/styles';
import Header from '@/v3/widgets/header';

import QueryProvider from './provider/queryProvider';
interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div
      css={css({
        padding: '20px',
        backgroundColor: color.slate['50'],
        width: '100vw',
        height: '100vh',
      })}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <Global styles={globalStyle} />
      <Layout>
        <section
          css={css({
            background: `linear-gradient(135deg, ${slate['50']} 0%, ${slate['100']} 100%)`,
            padding: '12px',
            height: '300px',
            borderBottom: `1px solid ${slate['200']}`,
          })}
        >
          <Header />
        </section>
      </Layout>
    </QueryProvider>
  );
}

export default App;
