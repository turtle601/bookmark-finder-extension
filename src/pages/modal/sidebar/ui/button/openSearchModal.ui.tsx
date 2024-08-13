import React from 'react';

import SearchButtonIcon from '@/shared/config/assets/search-button.svg';

import ModalLayer from '@/shared/ui/modalLayer';

import ModalWidget from '@/widget/modal';
import AutoSearch from '@/features/search/autoSearch';

export const OpenSearchModal: React.FC = () => {
  return (
    <ModalLayer.Opener
      modalType="modal"
      modalContent={
        <ModalWidget.Wrapper>
          <AutoSearch />
        </ModalWidget.Wrapper>
      }
    >
      <SearchButtonIcon />
    </ModalLayer.Opener>
  );
};
