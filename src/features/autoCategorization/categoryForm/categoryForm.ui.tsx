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
    categoriesRef,
    isDisabled,
    customCategories,
    handleInputEnter,
    isLoadingCategories,
    categories,
    isAI,
    toggleAI,
  } = useCategoryForm();

  return (
    <Flex as="article" direction="column" gap={spacer.spacing3}>
      <div>
        <Flex align={'center'}>
          <Input inputValue="" inputName="category-input">
            <Input.Field
              onKeyDown={handleInputEnter}
              kind="outline"
              placeholder="카테고리를 입력하세요"
              paddingLeft={spacer['spacing2.5']}
              etcStyles={{
                padding: spacer['spacing2.5'],
              }}
            />
          </Input>
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
          isLoadingCategories={isLoadingCategories}
          categoriesRef={categoriesRef}
          isAI={isAI}
          customTags={customCategories}
        />
      </div>
      <SubmitCategoriesButton
        isDisabled={isDisabled}
        categoriesRef={categoriesRef}
      />
    </Flex>
  );
};

export default CategoryForm;
