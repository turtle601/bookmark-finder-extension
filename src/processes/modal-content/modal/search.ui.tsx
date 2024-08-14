import React from 'react';
import AutoSearch from '@/features/search/autoSearch';

import ModalWidget from '@/widget/modal';

export type SearchFC = React.FC;

const Search: SearchFC = () => {
  return (
    <ModalWidget.Wrapper>
      <AutoSearch />
    </ModalWidget.Wrapper>
  );
};

export default Search;
