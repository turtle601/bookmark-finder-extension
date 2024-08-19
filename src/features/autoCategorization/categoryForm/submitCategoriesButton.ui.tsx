import React from 'react';

import Button from '@/shared/ui/button';
import ModalLayer from '@/shared/ui/modalLayer';
import OpenClassifyBookmarkForm from '@/app/modal-router/openClassifyBookmarkForm.ui';

import { spacer } from '@/shared/config/styles';

import { getCheckedCategory } from '@/features/autoCategorization/categoryForm/categoryForm.lib';
import { useClassifyAIBookmarks } from '@/entities/classify';

interface ISubmitCategoriesButtonProps {
  isDisabled: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  categoriesRef: React.MutableRefObject<
    Record<string, HTMLInputElement | null>
  >;
}

const SubmitCategoriesButton: React.FC<ISubmitCategoriesButtonProps> = ({
  isDisabled,
  categoriesRef,
}) => {
  const { mutate: classifyAIBookmarks } = useClassifyAIBookmarks();

  const handleSubmitClassifyFolder = () => {
    const checkedCategory = getCheckedCategory(
      Object.values(categoriesRef.current),
    );

    classifyAIBookmarks({
      categories: checkedCategory,
    });
  };

  return (
    <OpenClassifyBookmarkForm
      disabled={isDisabled}
      externalAction={handleSubmitClassifyFolder}
      etcStyles={{
        width: '100%',
      }}
    >
      <ModalLayer.Closer
        modalType="sidebar-panel"
        disabled={isDisabled}
        etcStyles={{
          width: '100%',
        }}
      >
        <Button
          disabled={isDisabled}
          kind={'default'}
          etcStyles={{
            width: '100%',
            padding: spacer.spacing3,
          }}
        >
          폴더 분류하기
        </Button>
      </ModalLayer.Closer>
    </OpenClassifyBookmarkForm>
  );
};

export default SubmitCategoriesButton;
