import { useQuery } from '@tanstack/react-query';
import { KeyboardEventHandler, useEffect, useRef } from 'react';

import { useArray } from '@/shared/hooks/useArray';
import { useBoolean } from '@/shared/hooks/useBoolean';

import { categoryService } from '@/entities/category';
import { getCheckedCategory } from '@/features/autoCategorization/categoryForm/categoryForm.lib';

import type { ICategory } from '@/entities/category/category.type';

const useAddNewCategory = () => {
  const { value: customCategories, push: addCustomCategory } =
    useArray<ICategory>([]);

  const handleInputEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      console.log(e.target);
      const newCategory = {
        id: e.currentTarget.value,
        text: e.currentTarget.value,
      };

      addCustomCategory(newCategory);
    }
  };

  return {
    customCategories,
    handleInputEnter,
  };
};

export const useCategoryForm = () => {
  const categoriesRef = useRef<Record<string, HTMLInputElement | null>>({});

  const { value: isDisabled, setValue: setIsDisabled } = useBoolean(false);

  const { customCategories, handleInputEnter } = useAddNewCategory();
  const { isLoading: isLoadingCategories, data: categories } = useQuery(
    categoryService.queryOptions(),
  );

  const { value: isAI, toggle: toggleAI } = useBoolean(true);

  useEffect(() => {
    const isEmptyCategories =
      getCheckedCategory(Object.values(categoriesRef.current)).length === 0;

    setIsDisabled(isEmptyCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAI]);

  return {
    categoriesRef,
    isDisabled,
    customCategories,
    handleInputEnter,
    isLoadingCategories,
    categories,
    isAI,
    toggleAI,
  };
};
