import React from 'react';

import { css } from '@emotion/react';
import { slate } from '@/shared/config/styles';

import ActiveTabs from './tabs';

import Spacer from '@/shared/ui/spacer';

import SearchSection from '@contentScript/search';

function SearchPanel() {
  return (
    <>
      <Spacer space={'12px'} direction="vertical" />
      <ActiveTabs />
      <Spacer space={'12px'} direction="vertical" />
      <div
        css={css({
          height: '1px',
          backgroundColor: slate['200'],
        })}
      />
      <Spacer space={'12px'} direction="vertical" />
      <div
        css={css({
          color: slate['900'],
        })}
      >
        <SearchSection />
      </div>
    </>
  );
}

export default SearchPanel;
