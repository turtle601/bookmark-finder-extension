import { useQuery } from '@tanstack/react-query';
import { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';

import { useArray } from '@/shared/hooks/useArray';
import { useBoolean } from '@/shared/hooks/useBoolean';

import { categoryService } from '@/entities/category';

import {
  getCheckedCategory,
  validateInputCategories,
} from '@/features/autoCategorization/categoryForm/categoryForm.lib';

import type { ICategory } from '@/entities/category/category.type';

const useCategory = (
  validateCategories: (
    categories: ICategory[],
  ) => (inputText: string) => boolean,
) => {
  const {
    value: customCategories,
    unshift: addCustomCategory,
    remove: removeCustomCategory,
  } = useArray<ICategory>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateInput = validateCategories(customCategories);

  const handleInputEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const inputValue = inputRef.current?.value || '';

      if (e.key === 'Enter') {
        e.preventDefault();

        const newCategory = {
          id: inputValue,
          text: inputValue,
        };
        if (!validateInput(inputValue)) {
          addCustomCategory(newCategory);
        }
      }
    },
    [addCustomCategory, validateInput],
  );

  const handleRemoveCustomCategory = (id: string) => () => {
    removeCustomCategory(id);
  };

  return {
    inputRef,
    customCategories,
    validateInput,
    handleInputEnter,
    handleRemoveCustomCategory,
  };
};

export const useCategoryForm = () => {
  const categoriesRef = useRef<Record<string, HTMLInputElement | null>>({});

  const { value: isDisabled, setValue: setIsDisabled } = useBoolean(false);

  const { isLoading: isLoadingCategories, data: categories } = useQuery(
    categoryService.queryOptions(),
  );

  const {
    inputRef,
    customCategories,
    handleInputEnter,
    handleRemoveCustomCategory,
    validateInput,
  } = useCategory(validateInputCategories(categories));

  const { value: isAI, toggle: toggleAI } = useBoolean(true);

  useEffect(() => {
    const isEmptyCategories =
      getCheckedCategory(Object.values(categoriesRef.current)).length === 0;

    setIsDisabled(isEmptyCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAI, categories, customCategories]);

  return {
    inputRef,
    categoriesRef,
    isDisabled,
    customCategories,
    isLoadingCategories,
    categories,
    isAI,
    validateInput,
    handleRemoveCustomCategory,
    handleInputEnter,
    toggleAI,
  };
};
