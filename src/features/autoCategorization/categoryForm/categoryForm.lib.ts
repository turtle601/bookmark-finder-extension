import { ICategory } from '@/entities/category/category.type';

export const getCheckedCategory = (
  categoriesElement: (HTMLInputElement | null)[],
) => {
  return categoriesElement
    .map((element) => {
      return element?.value;
    })
    .filter((v) => v !== undefined);
};

export const validateInputCategories = (queryCategories?: ICategory[]) => {
  const responseCategories = queryCategories || [];

  return (customCategories: ICategory[]) => {
    return (inputText: string) => {
      if (inputText.length === 0) return true;

      const totalCategories = [...responseCategories, ...customCategories];

      return totalCategories.some((category) => {
        return category.text === inputText;
      });
    };
  };
};
