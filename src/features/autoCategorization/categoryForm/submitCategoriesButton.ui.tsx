import React from 'react';

import Button from '@/shared/ui/button';
import ModalLayer from '@/shared/ui/modalLayer';

import { spacer } from '@/shared/config/styles';

import { useCreateAIBookmarkTypes } from '@/entities/classify';
import { getCheckedCategory } from '@/features/autoCategorization/categoryForm/categoryForm.lib';

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
  const { isSuccess, mutate: createClassifedBookmark } =
    useCreateAIBookmarkTypes();

  const handleSubmitClassifyFolder = () => {
    const checkedCategory = getCheckedCategory(
      Object.values(categoriesRef.current),
    );

    createClassifedBookmark({
      categories: checkedCategory,
    });
  };

  return (
    <ModalLayer.Opener
      disabled={isDisabled}
      isActionable={isSuccess}
      modalType="sidebar"
      modalContent={<></>}
      externalAction={handleSubmitClassifyFolder}
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
    </ModalLayer.Opener>
  );
};

export default SubmitCategoriesButton;
