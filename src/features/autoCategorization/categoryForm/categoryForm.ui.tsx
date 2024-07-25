import React from 'react';

import { spacer } from '@/shared/config/styles';

import Input from '@/shared/ui/input';
import Flex from '@/shared/ui/flex';
import Toggle from '@/shared/ui/toggle';
import AIIcon from '@/shared/config/assets/ai.svg';

import CategoryList from '@/features/autoCategorization/categoryForm/categoryList.ui';
import SubmitCategoriesButton from '@/features/autoCategorization/categoryForm/submitCategoriesButton.ui';

import { useCategoryForm } from '@/features/autoCategorization/categoryForm/hooks';

const CategoryForm: React.FC = () => {
  const {
    inputRef,
    categoriesRef,
    isDisabled,
    customCategories,
    isLoadingCategories,
    categories,
    isAI,
    validateInput,
    handleInputEnter,
    handleRemoveCustomCategory,
    toggleAI,
  } = useCategoryForm();

  return (
    <Input inputValue="" inputName="category-input" validate={validateInput}>
      <Flex as="article" direction="column">
        <Flex align={'center'} justify={'space-between'}>
          <Input.Field
            ref={inputRef}
            kind="outline"
            placeholder="카테고리를 입력하세요"
            paddingLeft={spacer['spacing2.5']}
            externalonKeyUpAction={handleInputEnter}
            etcStyles={{
              padding: spacer['spacing2.5'],
            }}
          />

          <Flex align={'center'} gap={spacer.spacing2}>
            <AIIcon />
            <Toggle
              onClick={toggleAI}
              isChecked={isAI}
              data-testid={'toggle'}
            />
          </Flex>
        </Flex>

        <CategoryList
          categories={categories}
          removeCategory={handleRemoveCustomCategory}
          isLoadingCategories={isLoadingCategories}
          categoriesRef={categoriesRef}
          isAI={isAI}
          customTags={customCategories}
        />

        <Input.ErrorMessage
          message={
            '중복되지 않고 최소 한 글자 이상의 카테고리만 만들 수 있습니다'
          }
          etcStyles={{
            fontSize: '12px',
          }}
        />

        <SubmitCategoriesButton
          inputRef={inputRef}
          isDisabled={isDisabled}
          categoriesRef={categoriesRef}
        />
      </Flex>
    </Input>
  );
};

export default CategoryForm;
