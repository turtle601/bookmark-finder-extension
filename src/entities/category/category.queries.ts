import { queryClient } from '@/shared/lib/react-query';
import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';

import type { ICategory } from '@/entities/category/category.type';
import { categoryAIQuery } from '@/entities/category/category.api';

export const keys = {
  root: () => ['category'],
} as const;

export const categoryService = {
  queryKey: () => keys.root(),
  getCache: () =>
    queryClient.getQueryData<ICategory[]>(categoryService.queryKey()),
  setCache: (categorys: ICategory[]) =>
    queryClient.setQueryData<ICategory[]>(
      categoryService.queryKey(),
      categorys,
    ),
  removeCache: () =>
    queryClient.removeQueries({ queryKey: categoryService.queryKey() }),
  invalidateCache: async () =>
    await queryClient.invalidateQueries({
      queryKey: categoryService.queryKey(),
    }),
  cancelCache: async () =>
    await queryClient.cancelQueries({ queryKey: categoryService.queryKey() }),
  queryOptions: () => {
    return tsqQueryOptions({
      queryKey: categoryService.queryKey(),
      queryFn: categoryAIQuery,
    });
  },
} as const;
