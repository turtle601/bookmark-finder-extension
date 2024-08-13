import React from 'react';

import Button from '@/shared/ui/button';
import ModalLayer from '@/shared/ui/modalLayer';

import { spacer } from '@/shared/config/styles';

export const OpenCategoryForm: React.FC = () => {
  return (
    <ModalLayer.Opener
      modalType="sidebar-form"
      modalContent={<></>}
      etcStyles={{
        width: '100%',
      }}
    >
      <Button
        kind="default"
        etcStyles={{
          width: '100%',
          padding: spacer.spacing3,
        }}
      >
        AI로 북마크 자동 분류
      </Button>
    </ModalLayer.Opener>
  );
};
